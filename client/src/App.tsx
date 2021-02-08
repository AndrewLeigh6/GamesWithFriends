import React, { createContext, useState } from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";
import Waiting from "./containers/Waiting/Waiting";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export interface User {
  username: string;
  randomUrl: string;
}

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
  const [users, setUsers] = useState<User[]>([]);
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
                <GamesList />
              </Route>
              <Route path="/">
                <GenerateLinks />
              </Route>
            </Switch>
          </Layout>
        </UsersContext.Provider>
      </Router>
    </div>
  );
}

export default App;
