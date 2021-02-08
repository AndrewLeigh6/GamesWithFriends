import React from "react";
import { Icon } from "../../components/FoundGame/Feature/Feature";
import FoundGame from "../../components/FoundGame/FoundGame";
import GamesSelected from "../../components/GamesSelected/GamesSelected";
import classes from "./GamesList.module.scss";

const GamesList = () => {
  const buildGames = (): JSX.Element[] => {
    // get list of games in common
    return [
      <React.Fragment>
        <FoundGame
          title="Fall Guys: Ultimate Knockout"
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/library_600x900.jpg?t=1595511208"
          feature="feature"
          icon={Icon.Controller}
          buttonText="Selected"
          key={1}
        />
        <FoundGame
          title="Terraria"
          image="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg?t=1568056870"
          feature="feature"
          icon={Icon.Controller}
          buttonText="Select"
          key={2}
        />
      </React.Fragment>,
    ];
  };
  return (
    <React.Fragment>
      <div className={classes.GamesList}>{buildGames()}</div>
      <GamesSelected gamesSelected={0} />
    </React.Fragment>
  );
};

export default GamesList;
