import axios, { AxiosResponse } from "axios";
import { FriendInput } from "../containers/GenerateLinks/GenerateLinks";

export interface User {
  rowId: number;
  randomUrl: string;
  steamId: string;
  username: string;
  isHost: boolean;
  ownedGameAppIds: {
    appId: number;
  }[];
}

export class Session {
  public users: User[] | null = null;

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
    let result: AxiosResponse;

    try {
      result = await axios.post(`/api/sessions?${queryString}`);
      this.users = result.data.users;
    } catch (error: unknown) {
      if (typeof error === "string") {
        throw new Error(error);
      } else {
        throw new Error("Failed to create new session");
      }
    }
  };
}
