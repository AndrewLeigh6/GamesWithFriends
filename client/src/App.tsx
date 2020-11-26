import React from "react";
import Feature, { Icon } from "./components/FoundGame/Feature/Feature";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Feature feature="Online Co-op" icon={Icon.Coop} />
      </Layout>
    </div>
  );
}

export default App;
