import React from "react";
import Input, { LeftIcon, RightIcon } from "./components/Input/Input";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Input
          label="Your Steam URL"
          name="user"
          placeholder="Enter your Steam URL"
          leftIcon={LeftIcon.User}
          rightIcon={RightIcon.Times}
        />
      </Layout>
    </div>
  );
}

export default App;
