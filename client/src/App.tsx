import React from "react";
import Layout from "./components/Layout/Layout";
import GamesList from "./containers/GamesList/GamesList";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";
import Results from "./containers/Results/Results";
import Waiting from "./containers/Waiting/Waiting";

function App() {
  return (
    <div className="App">
      <Layout>
        <Waiting />
      </Layout>
    </div>
  );
}

export default App;
