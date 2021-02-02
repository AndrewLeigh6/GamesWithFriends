import axios, { AxiosResponse } from "axios";
import { Friend } from "../App";

export class Session {
  public static getRandomId = (): number => {
    const number = Math.floor(Math.random() * 100);
    return number;
  };

  private static buildQueryString = (
    hostUrl: string,
    friends: Friend[]
  ): string => {
    const initialString = "users=" + hostUrl;

    const queryString = friends.reduce((prev, curr): string => {
      return prev + "&users=" + curr.url;
    }, initialString);

    return queryString;
  };

  public static create = async (
    hostUrl: string,
    friends: Friend[]
  ): Promise<void> => {
    const queryString = Session.buildQueryString(hostUrl, friends);
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
