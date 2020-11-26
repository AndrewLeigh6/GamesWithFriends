import React from "react";
import { Icon } from "./components/FoundGame/Feature/Feature";
import FoundGame from "./components/FoundGame/FoundGame";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <FoundGame
          title="Fall Guys: Ultimate Knockout"
          feature="Online Co-op"
          icon={Icon.Controller}
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/library_600x900.jpg?t=1595511208"
        />
      </Layout>
    </div>
  );
}

export default App;
