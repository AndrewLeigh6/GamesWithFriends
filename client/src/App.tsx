import React from "react";
import Button from "./components/Button/Button";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Button color="Primary">Select</Button>
        <Button color="SecondaryLight">Select 2</Button>
        <Button color="SecondaryDark">Select 3</Button>
      </Layout>
    </div>
  );
}

export default App;
