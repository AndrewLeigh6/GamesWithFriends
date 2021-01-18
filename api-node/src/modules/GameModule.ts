import { Game } from "./../db/models/Game";
import { GameDetails, getGameDetails } from "./../services/steamapi";

interface GameRecord extends Partial<Game> {}

export class GameModule {
  rowId: number | null = null;
  appId: string = "";
  name: string = "";
  imageVerticalUrl: string = "";
  imageHorizontalUrl: string = "";

  private getGameDetails = async (appId: string): Promise<GameDetails> => {
    const gameDetails = await getGameDetails(appId);
    return gameDetails;
  };

  private setGameDetails = (gameDetails: GameDetails): void => {
    const data = gameDetails[this.appId].data;

    this.name = data.name;
    this.imageVerticalUrl = this.getVerticalImageUrl(this.appId);
    this.imageHorizontalUrl = this.getHorizontalImageUrl(this.appId);
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

  private save = async (game: this): Promise<number | null> => {
    const insertData: GameRecord = {
      app_id: game.appId,
      name: game.name,
      image_vertical_url: game.imageVerticalUrl,
      image_horizontal_url: game.imageHorizontalUrl,
    };

    const gameRow: Game = await Game.query().insert(insertData).returning("*");

    if (typeof gameRow.id === "number") {
      return gameRow.id;
    }

    return null;
  };

  public init = async (appId: string): Promise<void> => {
    this.appId = appId;

    /* If the game exists, we grab it's row ID from the DB and save it
    as an attribute. Otherwise, save the new game and grab the new ID. */
    const game = await this.recordExists(appId);

    /* Sorry, I know this is horrible. Here's a promise to research
    nice and clean type guards at some point, and fix this mess. */
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
    } else {
      const gameDetails: GameDetails = await this.getGameDetails(appId);
      if (gameDetails[appId].success === true) {
        this.setGameDetails(gameDetails);
        this.rowId = await this.save(this);
      }
    }
    console.log(this);
  };
}
