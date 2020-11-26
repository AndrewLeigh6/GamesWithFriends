import React from "react";
import GamesSelected from "./components/GamesSelected/GamesSelected";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <GamesSelected gamesSelected={0} />
      </Layout>
    </div>
  );
}

export default App;
