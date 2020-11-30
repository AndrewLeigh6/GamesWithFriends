import React from "react";
import InputError from "./components/Input/InputError/InputError";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <InputError message="Error - URL is invalid" />
      </Layout>
    </div>
  );
}

export default App;
