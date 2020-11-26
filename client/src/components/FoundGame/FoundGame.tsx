import React from "react";
import Feature, { Icon } from "./Feature/Feature";
import classes from "./FoundGame.module.scss";

interface AppProps {
  title: string;
  image: string;
  icon: Icon;
  feature: string;
}

const FoundGame = (props: AppProps) => {
  return (
    <div className={classes.FoundGame}>
      <img src={props.image} className={classes.Image} alt={props.title} />
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Features}>
        <ul>
          <Feature feature="Online Co-op" icon={Icon.Coop} />
          <Feature feature="Online PvP" icon={Icon.PvP} />
          <Feature feature="Controller support" icon={Icon.Controller} />
        </ul>
      </div>
    </div>
  );
};

export default FoundGame;
