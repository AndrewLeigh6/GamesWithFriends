import React from "react";
import Layout from "./components/Layout/Layout";
import GeneratedLinks from "./containers/GeneratedLinks/GeneratedLinks";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";

function App() {
  return (
    <div className="App">
      <Layout>
        <GeneratedLinks />
      </Layout>
    </div>
  );
}

export default App;
