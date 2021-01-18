import { User } from "./../db/models/User";
import axios from "axios";
import { Game, getOwnedGames, resolveVanityUrl } from "../services/steamapi";

interface UserRecord extends Partial<User> {}

export class UserModule {
  rowId: number | null = null;
  steamId: string = "";
  username: string = "";
  isHost: boolean = false;
  games: Game[] = [];

  private setUsername = (url: string): void => {
    const username = url.split("/")[4];
    this.username = username;
  };

  private getSteamId = async (username: string): Promise<string> => {
    const steamId = await resolveVanityUrl(username);
    return steamId;
  };

  private getOwnedGames = async (steamId: string): Promise<Game[]> => {
    const userGames = await getOwnedGames(steamId);
    return userGames;
  };

  private recordExists = async (steamId: string): Promise<User | undefined> => {
    const user: User | undefined = await User.query()
      .where("steam_id", "=", steamId)
      .first();

    return user;
  };

  private save = async (user: this): Promise<number | null> => {
    const insertData: UserRecord = {
      steam_id: user.steamId,
      steam_username: user.username,
    };

    const userRow: User = await User.query().insert(insertData).returning("*");

    if (typeof userRow.id === "number") {
      return userRow.id;
    }

    return null;
  };

  public init = async (url: string, isHost: boolean = false): Promise<this> => {
    this.setUsername(url);
    this.isHost = isHost;
    this.steamId = await this.getSteamId(this.username);

    /* If the user exists, we grab their row ID from the DB and save it
    as an attribute. Otherwise, save the new user and grab the new ID. */
    const user = await this.recordExists(this.steamId);

    if (user !== undefined && typeof user.id === "number") {
      this.rowId = user.id;
    } else {
      this.games = await this.getOwnedGames(this.steamId);
      this.rowId = await this.save(this);
    }

    return this;
  };
}
