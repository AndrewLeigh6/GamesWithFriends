import React from "react";
import { Icon } from "../../components/FoundGame/Feature/Feature";
import FoundGame from "../../components/FoundGame/FoundGame";
import GamesSelected from "../../components/GamesSelected/GamesSelected";
import classes from "./GamesList.module.scss";

const GamesList = () => {
  return (
    <React.Fragment>
      <div className={classes.GamesList}>
        <FoundGame
          title="Fall Guys: Ultimate Knockout"
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/library_600x900.jpg?t=1595511208"
          feature="feature"
          icon={Icon.Controller}
          buttonText="Selected"
        />
        <FoundGame
          title="Terraria"
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg?t=1568056870"
          feature="feature"
          icon={Icon.Controller}
          buttonText="Select"
        />
      </div>
      <GamesSelected gamesSelected={0} />
    </React.Fragment>
  );
};

export default GamesList;
