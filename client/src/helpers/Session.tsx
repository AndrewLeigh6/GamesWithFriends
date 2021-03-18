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

export interface UserGame {
  appId: number;
  categories: {
    id: number;
    name: string;
  }[];
}

export interface User {
  id?: number;
  username: string;
  randomUrl: string;
  url?: string;
  steamId?: string;
  isHost?: boolean;
  ownedGameAppIds?: {
    appId: number;
  }[];
  games?: UserGame[];
}

export interface SharedGame {
  id: number;
  app_id: string;
  name: string;
  image_vertical_url: string;
  image_horizontal_url: string;
  categories: {
    id: number;
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

  public createFromUrl = async (url: string): Promise<void> => {
    let result: AxiosResponse;

    try {
      result = await axios.get(`/api/sessions/url/${url}`);
      console.log(result);
      this.sessionId = result.data.sessionId;
      this.users = result.data.sessionData.users;
    } catch (error: unknown) {
      throw new Error("Failed to initialise existing session: " + error);
    }
  };

  public getSharedGames = async (): Promise<SharedGame[] | null> => {
    let result: AxiosResponse;
    try {
      result = await axios.get(`/api/sessions/${this.sessionId}/games`);
      console.log("Logging results", result);

      if (result.data && this.users && this.users[0].games) {
        this.games = addGameCategories(result.data, this.users[0].games);
        return this.games;
      }
      return null;
    } catch (error: unknown) {
      throw new Error("Failed to create new session: " + error);
    }

    function addGameCategories(
      gameData: SharedGame[],
      userGames: UserGame[] | SharedGame[]
    ): SharedGame[] {
      gameData.forEach((game, index) => {
        if (isUserGame(userGames)) {
          const foundGame = userGames.findIndex(
            (userGame) => userGame.appId.toString() === game.app_id
          );
          gameData[index].categories = userGames[foundGame].categories;
        } else {
          const foundGame = userGames.findIndex(
            (userGame) => userGame.app_id === game.app_id
          );
          gameData[index].categories = userGames[foundGame].categories;
        }
      });
      return gameData;
    }

    function isUserGame(games: UserGame[] | SharedGame[]): games is UserGame[] {
      return (games as UserGame[])[0].appId !== undefined;
    }
  };

  public deleteUserVotesForSession = async (
    sessionId: number,
    userId: number
  ) => {
    try {
      await axios.delete(`/api/votes/session/${sessionId}/user/${userId}`);
    } catch (error: unknown) {
      throw new Error("Failed to delete votes for user:" + error);
    }
  };
}
