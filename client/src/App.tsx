import React from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";

function App() {
  return (
    <div className="App">
      <Layout>
        <GamesList />
      </Layout>
    </div>
  );
}

export default App;
