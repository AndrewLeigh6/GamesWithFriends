import axios, { AxiosResponse } from "axios";
import React, { useReducer, useState } from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";
import Waiting from "./containers/Waiting/Waiting";
import { getRandomId } from "./helpers/helpers";

const MIN_FRIENDS = 1;
const MAX_FRIENDS = 7;

export interface Friend {
  id: number;
  url: string;
}

type State = Friend[];

type Actions =
  | { type: "add"; url: string }
  | { type: "remove"; index: number }
  | { type: "change"; url: string; index: number };

function friendsReducer(state: State, action: Actions) {
  switch (action.type) {
    case "add":
      if (state.length < MAX_FRIENDS) {
        const id = getRandomId();
        return [...state, { id: id, url: action.url }];
      } else {
        return state;
      }
    case "remove":
      if (state.length > MIN_FRIENDS) {
        return state.filter((_, index) => index !== action.index);
      } else {
        return state;
      }
    case "change":
      const copy = [...state];
      copy[action.index].url = action.url;
      return copy;
    default:
      return state;
  }
}

const initalState = [{ id: getRandomId(), url: "" }];

function App() {
  const [hostUrl, setHostUrl] = useState("");
  const [friends, dispatch] = useReducer(friendsReducer, initalState);

  const onAddFriend = (url: string): void => {
    dispatch({ type: "add", url: url });
  };

  const onRemoveFriend = (index: number): void => {
    dispatch({ type: "remove", index: index });
  };

  const onFriendUrlChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ): void => {
    if (typeof index === "number") {
      dispatch({ type: "change", url: event.target.value, index: index });
    }
  };

  const onHostUrlChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHostUrl(event.target.value);
  };

  const onCreateSession = async (): Promise<void> => {
    let result: AxiosResponse;

    const initialString = "users=" + hostUrl;

    // build query string
    let queryString = friends.reduce((prev, curr): string => {
      return prev + "&users=" + curr.url;
    }, initialString);

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

  return (
    <div className="App">
      <Layout>
        <GenerateLinks
          friends={friends}
          onAddFriend={onAddFriend}
          onRemoveFriend={onRemoveFriend}
          onFriendUrlChanged={onFriendUrlChanged}
          onHostUrlChanged={onHostUrlChanged}
          onCreateSession={onCreateSession}
        />
      </Layout>
    </div>
  );
}

export default App;
