import React from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";

function App() {
  return (
    <div className="App">
      <Layout>
        <Results />
      </Layout>
    </div>
  );
}

export default App;
