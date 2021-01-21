const steamApiKey = process.env.STEAM_API_KEY;
import axios, { AxiosResponse } from "axios";
import rateLimit from "axios-rate-limit";

interface VanityUrlData {
  steamid: string;
}

export interface OwnedGame {
  appid: string;
}

export interface GameDetails {
  [appId: string]: {
    success: boolean;
    data: {
      name: string;
      categories: {
        id: number;
        description: string;
      }[];
    };
  };
}

let requests = 0;

// Limit request rate so Steam don't ban me from their API

//TODO: I'm fairly sure this is doing literally nothing
const http = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 1000,
  maxRPS: 2,
});

http.interceptors.request.use(async (request) => {
  //console.log(request);
  requests = requests + 1;
  const time = new Date();
  console.log("Making request at", time.toLocaleTimeString("en-GB"));
  console.log("Requests made:", requests);

  return request;
});

http.interceptors.response.use((response) => {
  // console.log(response);
  if (response.data.statusCode === 429) {
    console.log(response);
    throw new Error("Too many requests");
  }
  return response;
});

export const resolveVanityUrl = async (steamUrl: string): Promise<string> => {
  console.log("Resolving vanity url for", steamUrl);

  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${steamUrl}`;
  const response: AxiosResponse = await http.get(url);
  const { steamid }: VanityUrlData = response.data.response;

  return steamid;
};

export const getOwnedGames = async (steamId: string): Promise<OwnedGame[]> => {
  console.log("Getting owned games list for", steamId);

  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json`;
  const response: AxiosResponse = await http.get(url);
  const ownedGamesData: OwnedGame[] = response.data.response.games;

  return ownedGamesData;
};

export const getGameDetails = async (appId: string): Promise<GameDetails> => {
  console.log("Getting game details for", appId);

  const url = `https://store.steampowered.com/api/appdetails/?appids=${appId}`;
  const response: AxiosResponse = await http.get(url);
  const gameDetails: GameDetails = response.data;

  return gameDetails;
};
