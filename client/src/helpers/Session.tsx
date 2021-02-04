import axios, { AxiosResponse } from "axios";
import { FriendInput } from "../containers/GenerateLinks/GenerateLinks";

export class Session {
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
      console.log(result);
    } catch (error: unknown) {
      if (typeof error === "string") {
        throw new Error(error);
      } else {
        throw new Error("Failed to create new session");
      }
    }
  };
}
