import React, { useReducer, useState } from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";
import Waiting from "./containers/Waiting/Waiting";
import { Session } from "./helpers/Session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        const id = Session.getRandomId();
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

const initalState = [{ id: Session.getRandomId(), url: "" }];

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
    Session.create(hostUrl, friends);
  };

  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/generated-links">
              <GeneratedLinks />
            </Route>
            <Route path="/">
              <GenerateLinks
                friends={friends}
                onAddFriend={onAddFriend}
                onRemoveFriend={onRemoveFriend}
                onFriendUrlChanged={onFriendUrlChanged}
                onHostUrlChanged={onHostUrlChanged}
                onCreateSession={onCreateSession}
              />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
