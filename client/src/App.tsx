import React, { createContext, useState } from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";
import Waiting from "./containers/Waiting/Waiting";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Session, SharedGame, User } from "./helpers/Session";

// export interface UserInput {
//   username: string;
//   randomUrl: string;
// }

export interface iUserContext {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

// set defaults
export const UsersContext = createContext<iUserContext>({
  users: [],
  setUsers: () => {},
});

function App() {
  const [session, setSession] = useState<Session | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<SharedGame[] | undefined>();
  const usersState = { users, setUsers };

  return (
    <div className="App">
      <Router>
        <UsersContext.Provider value={usersState}>
          <Layout>
            <Switch>
              <Route path="/generated-links">
                <GeneratedLinks />
              </Route>
              <Route path="/session">
                <GamesList
                  session={session}
                  setSession={setSession}
                  games={games}
                  setGames={setGames}
                />
              </Route>
              <Route path="/">
                <GenerateLinks setSession={setSession} />
              </Route>
            </Switch>
          </Layout>
        </UsersContext.Provider>
      </Router>
    </div>
  );
}

export default App;
