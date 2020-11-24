import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import InfoText from "./components/InfoText/InfoText";

function App() {
  return (
    <div className="App">
      <Layout>
        <InfoText title="How does it work?">
          Enter your Steam URL, and the URL of at least one friend. You’ll each
          be shown a list of the games that you have in common, which you can
          then vote on to decide which game you should play together.{" "}
        </InfoText>
      </Layout>
    </div>
  );
}

export default App;
