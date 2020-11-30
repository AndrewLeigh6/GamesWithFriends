import React from "react";
import Layout from "./components/Layout/Layout";
import GenerateLinks from "./containers/GenerateLinks/GenerateLinks";

function App() {
  return (
    <div className="App">
      <Layout>
        <GenerateLinks />
      </Layout>
    </div>
  );
}

export default App;
