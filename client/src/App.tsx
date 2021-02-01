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

type Actions =
  | { type: "add"; name: string }
  | { type: "remove"; index: number };

export interface Friend {
  id: number;
  name: string;
}

type State = Friend[];

function friendsReducer(state: State, action: Actions) {
  switch (action.type) {
    case "add":
      if (state.length < MAX_FRIENDS) {
        const id = getRandomId();
        return [...state, { id: id, name: action.name }];
      } else {
        return state;
      }
    case "remove":
      if (state.length > MIN_FRIENDS) {
        return state.filter((_, index) => index !== action.index);
      } else {
        return state;
      }
    default:
      return state;
  }
}

const initalState = [{ id: getRandomId(), name: "" }];

function App() {
  const [friends, dispatch] = useReducer(friendsReducer, initalState);

  const onAddFriend = (name: string): void => {
    dispatch({ type: "add", name: name });
  };

  const onRemoveFriend = (index: number): void => {
    dispatch({ type: "remove", index: index });
  };

  return (
    <div className="App">
      <Layout>
        <GenerateLinks
          friends={friends}
          onAddFriend={onAddFriend}
          onRemoveFriend={onRemoveFriend}
        />
      </Layout>
    </div>
  );
}

export default App;
