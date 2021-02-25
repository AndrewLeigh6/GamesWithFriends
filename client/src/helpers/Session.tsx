import axios, { AxiosResponse } from "axios";
import { FriendInput } from "../containers/GenerateLinks/GenerateLinks";

interface CreateSessionResponse extends AxiosResponse {
  data: {
    sessionId: number;
    sessionModule: {
      users: User[];
    };
  };
}

export interface User {
  rowId?: number;
  username: string;
  randomUrl: string;
  steamId?: string;
  isHost?: boolean;
  ownedGameAppIds?: {
    appId: number;
  }[];
  games?: {
    appId: number;
    categories: {
      rowId: number;
      name: string;
    }[];
  }[];
}

export interface SharedGame {
  id: number;
  app_id: string;
  name: string;
  image_vertical_url: string;
  image_horizontal_url: string;
  categories: {
    rowId: number;
    name: string;
  }[];
}

export class Session {
  public sessionId: number | null = null;
  public users: User[] | null = null;
  public games: SharedGame[] | null = null;

  public static getRandomId = (): number => {
    const number = Math.floor(Math.random() * 100);
    return number;
  };

  private buildQueryString = (
    hostUrl: string,
    friends: FriendInput[]
  ): string => {
    const initialString = "users=" + hostUrl;

    const queryString = friends.reduce((prev, curr): string => {
      return prev + "&users=" + curr.url;
    }, initialString);

    return queryString;
  };

  public create = async (
    hostUrl: string,
    friends: FriendInput[]
  ): Promise<void> => {
    const queryString = this.buildQueryString(hostUrl, friends);
    let result: CreateSessionResponse;

    try {
      result = await axios.post(`/api/sessions?${queryString}`);
      this.sessionId = result.data.sessionId;
      this.users = result.data.sessionModule.users;
    } catch (error: unknown) {
      if (typeof error === "string") {
        throw new Error(error);
      } else {
        throw new Error("Failed to create new session");
      }
    }
  };

  public getSharedGames = async (): Promise<SharedGame[] | null> => {
    let result: AxiosResponse;
    try {
      result = await axios.get(`/api/sessions/${this.sessionId}/games`);
      if (result.data && this.users) {
        this.games = addGameCategories(result.data, this.users);
        return this.games;
      }
      return null;
    } catch (error: unknown) {
      if (typeof error === "string") {
        throw new Error(error);
      } else {
        throw new Error("Failed to create new session");
      }
    }

    function addGameCategories(
      gameData: SharedGame[],
      users: User[]
    ): SharedGame[] {
      const host = users[0];
      gameData.forEach((game, index) => {
        if (host.games) {
          const foundGame = host.games.findIndex(
            (hostGame) => game.app_id === hostGame.appId.toString()
          );
          gameData[index].categories = host.games[foundGame].categories;
        }
      });
      return gameData;
    }
  };
}
