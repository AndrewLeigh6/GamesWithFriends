import React from "react";
import Layout from "./components/Layout/Layout";
import InfoText from "./components/InfoText/InfoText";
import WinningGame from "./components/WinningGame/WinningGame";

function App() {
  return (
    <div className="App">
      <Layout>
        <WinningGame
          title="Fall Guys: Ultimate Knockout"
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_616x353.jpg?t=1592241545"
          votes={3}
        />
      </Layout>
    </div>
  );
}

export default App;
