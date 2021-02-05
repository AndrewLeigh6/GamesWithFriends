import { getPlayerSummary } from "./../services/steamapi";
import { GameModule } from "./GameModule";
import { User } from "./../db/models/User";
import {
  OwnedGame,
  getOwnedGames,
  resolveVanityUrl,
} from "../services/steamapi";

interface UserRecord extends Partial<User> {}

export class UserModule {
  rowId: number | null = null;
  steamId: string = "";
  username: string = "";
  isHost: boolean = false;
  randomUrl: string | null = null;
  ownedGameAppIds: OwnedGame[] = [];
  games: GameModule[] = [];

  public setRandomUrl = (url: string): void => {
    this.randomUrl = url;
  };

  private setUsername = (url: string): void => {
    const username = url.split("/")[4];
    this.username = username;
  };

  private getSteamIdFromUsername = async (
    username: string
  ): Promise<string> => {
    console.log("steam id is", username);

    const steamId = await resolveVanityUrl(username);
    return steamId;
  };

  private isVanityUrl = (url: string): boolean => {
    const result = url.includes("/id/");
    return result;
  };

  private getSteamUsernameFromId = async (id: string): Promise<string> => {
    const playerSummary = await getPlayerSummary(id);
    const username = playerSummary.personaname;
    return username;
  };

  private setId = (url: string): void => {
    const id = url.split("/")[4];
    this.steamId = id;
  };

  private getOwnedGames = async (steamId: string): Promise<OwnedGame[]> => {
    const userGames = await getOwnedGames(steamId);
    return userGames;
  };

  private recordExists = async (steamId: string): Promise<User | undefined> => {
    const user: User | undefined = await User.query()
      .where("steam_id", "=", steamId)
      .first();

    return user;
  };

  private save = async (
    user: this,
    games: GameModule[]
  ): Promise<number | null> => {
    const insertData: UserRecord = {
      steam_id: user.steamId,
      steam_username: user.username,
    };

    const userRow: User = await User.query().insert(insertData).returning("*");

    const gameIds = games.flatMap((game) => {
      if (typeof game.rowId === "number") {
        return [game.rowId];
      } else {
        return [];
      }
    });

    if (typeof userRow.id === "number") {
      const usersGames = await User.relatedQuery("games")
        .for(userRow.id)
        .relate(gameIds);
      return userRow.id;
    }

    return null;
  };

  private createGames = async (ownedGames: OwnedGame[]): Promise<void> => {
    const createGame = async (appId: string): Promise<GameModule> => {
      const game = new GameModule();
      await game.init(appId);

      return game;
    };

    await Promise.all(
      ownedGames.map(
        async (ownedGame: OwnedGame): Promise<void> => {
          let game: GameModule;
          game = await createGame(ownedGame.appid);

          this.games.push(game);
        }
      )
    );
  };

  public init = async (url: string, isHost: boolean = false): Promise<this> => {
    /* My profile looks like this:
    https://steamcommunity.com/id/silverstone1294/
    and so we need to get the ID from the vanity url.
    However, your profile could also look like this: 
    https://steamcommunity.com/profiles/76561197975556468/
    In this case, we can just grab the ID directly. */
    this.isHost = isHost;

    if (this.isVanityUrl(url)) {
      this.setUsername(url);
      this.steamId = await this.getSteamIdFromUsername(this.username);
    } else {
      this.setId(url);
      this.username = await this.getSteamUsernameFromId(this.steamId);
    }

    /* If the user exists, we grab their row ID from the DB and save it
    as an attribute. Otherwise, save the new user and grab the new ID. */
    const user = await this.recordExists(this.steamId);

    if (user !== undefined && typeof user.id === "number") {
      this.ownedGameAppIds = await this.getOwnedGames(this.steamId);
      await this.createGames(this.ownedGameAppIds);
      this.rowId = user.id;
      // dont forget to get owned game app ids for existing users too
    } else {
      this.ownedGameAppIds = await this.getOwnedGames(this.steamId);
      await this.createGames(this.ownedGameAppIds);
      this.rowId = await this.save(this, this.games);
    }

    console.log(`List of games for ${this.username}: `, this.games);

    return this;
  };
}
