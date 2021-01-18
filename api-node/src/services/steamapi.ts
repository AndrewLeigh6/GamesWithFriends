const steamApiKey = process.env.STEAM_API_KEY;
import axios, { AxiosResponse } from "axios";

interface VanityUrlData {
  steamid: string;
}

export interface Game {
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

axios.interceptors.request.use((request) => {
  // console.log(request);
  return request;
});

axios.interceptors.response.use((response) => {
  // console.log(response);
  return response;
});

export const resolveVanityUrl = async (steamUrl: string): Promise<string> => {
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${steamUrl}`;
  const response: AxiosResponse = await axios.get(url);
  const { steamid }: VanityUrlData = response.data.response;

  return steamid;
};

export const getOwnedGames = async (steamId: string): Promise<Game[]> => {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json`;
  const response: AxiosResponse = await axios.get(url);
  const ownedGamesData: Game[] = response.data.response.games;

  return ownedGamesData;
};

export const getGameDetails = async (appId: string): Promise<GameDetails> => {
  const url = `https://store.steampowered.com/api/appdetails/?appids=${appId}`;
  const response: AxiosResponse = await axios.get(url);
  const gameDetails: GameDetails = response.data;

  return gameDetails;
};
