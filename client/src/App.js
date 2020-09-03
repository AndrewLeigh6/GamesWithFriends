import React from "react";
import Header from "./components/Header/Header";
import Links from "./containers/Links/Links";
import Game from "./components/Game/Game";

function App() {
  return (
    <div className="App">
      <Header />
      <Game
        name="Rocket League"
        logo="https://cdn.cloudflare.steamstatic.com/steam/apps/252950/logo.png"
        banner="https://cdn.cloudflare.steamstatic.com/steam/apps/252950/library_hero.jpg"
        info={["Online", "Local", "Co-op (4)", "PvP (8)"]}
      />
      <Game
        name="Terraria"
        logo="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/logo.png"
        banner="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_hero.jpg"
        info={["Online", "Local", "Co-op (8)", "PvP (8)"]}
      />
      <Game
        name="Deep Rock Galactic"
        logo="https://cdn.cloudflare.steamstatic.com/steam/apps/548430/logo.png"
        banner="https://cdn.cloudflare.steamstatic.com/steam/apps/548430/library_hero.jpg"
        info={["Online", "Co-op (4)"]}
      />
    </div>
  );
}

export default App;
