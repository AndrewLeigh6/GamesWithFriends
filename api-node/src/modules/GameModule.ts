import { CategoryModule } from "./CategoryModule";
import { Game } from "./../db/models/Game";
import { GameDetails, getGameDetails } from "./../services/steamapi";
import { Category } from "../db/models/Category";

interface GameRecord extends Partial<Game> {}

interface CategoryData {
  id: number;
  description: string;
}

export class GameModule {
  rowId: number | null = null;
  appId: string = "";
  name: string = "";
  imageVerticalUrl: string = "";
  imageHorizontalUrl: string = "";
  categories: CategoryModule[] = [];

  private getGameDetails = async (appId: string): Promise<GameDetails> => {
    const gameDetails = await getGameDetails(appId);
    return gameDetails;
  };

  private setGameDetails = (gameDetails: GameDetails): boolean => {
    const data = gameDetails[this.appId].data;

    if (data !== undefined) {
      this.name = data.name;
      this.imageVerticalUrl = this.getVerticalImageUrl(this.appId);
      this.imageHorizontalUrl = this.getHorizontalImageUrl(this.appId);
      return true;
    }

    return false;
  };

  private getVerticalImageUrl = (appId: string): string => {
    const imageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
    return imageUrl;
  };

  private getHorizontalImageUrl = (appId: string): string => {
    const imageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_467x181.jpg`;
    return imageUrl;
  };

  private recordExists = async (appId: string): Promise<Game | undefined> => {
    const game: Game | undefined = await Game.query()
      .where("app_id", "=", appId)
      .first();

    return game;
  };

  private save = async (
    game: this,
    categories: CategoryModule[]
  ): Promise<number | null> => {
    const insertData: GameRecord = {
      app_id: game.appId,
      name: game.name,
      image_vertical_url: game.imageVerticalUrl,
      image_horizontal_url: game.imageHorizontalUrl,
    };

    /* Check that the game hasn't been saved already */
    const existingGame = await this.recordExists(game.appId);
    if (existingGame) {
      console.log("Tried to add existing game (second check)", game.name);
      this.setExistingGameDetails(existingGame);
      if (typeof existingGame.id === "number") {
        return existingGame.id;
      }
      return null;
    }

    const gameRow: Game = await Game.query().insert(insertData).returning("*");

    // Relate categories in db
    const categoryIds = categories.flatMap((category) => {
      if (typeof category.rowId === "number") {
        return [category.rowId];
      } else {
        return [];
      }
    });

    if (typeof gameRow.id === "number") {
      const categoriesGames = await Game.relatedQuery("categories")
        .for(gameRow.id)
        .relate(categoryIds);
      return gameRow.id;
    }

    if (typeof gameRow.id === "number") {
      console.log("Added new game", gameRow.name);

      return gameRow.id;
    }

    return null;
  };

  /* Sorry, I know this is horrible. Here's a promise to research
    nice and clean type guards at some point, and fix this mess. */
  private setExistingGameDetails = (game: GameRecord): void => {
    if (
      game !== undefined &&
      typeof game.id === "number" &&
      typeof game.name === "string" &&
      typeof game.image_vertical_url === "string" &&
      typeof game.image_horizontal_url === "string"
    ) {
      this.rowId = game.id;
      this.name = game.name;
      this.imageVerticalUrl = game.image_vertical_url;
      this.imageHorizontalUrl = game.image_horizontal_url;
    }
  };

  private createCategories = async (
    categories: CategoryData[]
  ): Promise<void> => {
    const createCategory = async (name: string): Promise<CategoryModule> => {
      const category = new CategoryModule();
      await category.init(name);

      return category;
    };

    if (categories) {
      await Promise.all(
        categories.map(
          async (gameCategory: CategoryData): Promise<void> => {
            let category: CategoryModule;
            if (gameCategory.description) {
              category = await createCategory(gameCategory.description);
              this.categories.push(category);
            }
          }
        )
      );
    }
  };

  private getExistingGameCategoryData = async (
    gameRowId: number | null
  ): Promise<CategoryData[] | null> => {
    if (gameRowId) {
      // get all the categories for a game and return an array
      const categoryData = await Game.relatedQuery<Category>("categories").for(
        gameRowId
      );
      let result: CategoryData[] = [];

      await Promise.all(
        categoryData.map((category) => {
          if (category.id && category.name) {
            result.push({
              id: category.id,
              description: category.name,
            });
          }
        })
      );

      return result;
    } else {
      return null;
    }
  };

  public init = async (appId: string): Promise<void> => {
    this.appId = appId;

    /* If the game exists, we grab it's row ID from the DB and save it
    as an attribute. Otherwise, save the new game and grab the new ID. */

    const existingGame = await this.recordExists(appId);
    if (existingGame) {
      console.log("Tried to add existing game (first check)", appId);
      this.setExistingGameDetails(existingGame);
      const categoryData = await this.getExistingGameCategoryData(this.rowId);
      if (categoryData) {
        await this.createCategories(categoryData);
      }
    } else {
      const gameDetails: GameDetails = await this.getGameDetails(appId);
      const detailsSet = this.setGameDetails(gameDetails);
      if (detailsSet) {
        await this.createCategories(gameDetails[appId].data.categories);
        this.rowId = await this.save(this, this.categories);
      }
    }
  };
}
