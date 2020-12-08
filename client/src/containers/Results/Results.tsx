import React from "react";
import WinningGame from "../../components/WinningGame/WinningGame";
import classes from "./Results.module.scss";

const Results = () => {
  return (
    <div className={classes.Results}>
      <WinningGame
        image="https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_467x181.jpg?t=1592241545"
        title="Fall Guys: Ultimate Knockout"
        votes={4}
      />
      <WinningGame
        image="https://cdn.cloudflare.steamstatic.com/steam/apps/548430/capsule_467x181.jpg?t=1572877557"
        title="Deep Rock Galactic"
        votes={3}
      />
      <WinningGame
        image="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_467x181.jpg?t=1435630291"
        title="Terraria"
        votes={2}
      />
    </div>
  );
};

export default Results;
