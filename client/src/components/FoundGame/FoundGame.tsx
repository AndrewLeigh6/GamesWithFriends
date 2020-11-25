import React from "react";
import classes from "./FoundGame.module.scss";

interface AppProps {
  title: string;
  image: string;
  icon: string;
  feature: string;
}

const FoundGame = (props: AppProps) => {
  return (
    <div className={classes.FoundGame}>
      <img src={props.image} className={classes.Image} alt={props.title} />
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Features}>
        <ul>
          <li>Online Co-op</li>
          <li>Online PvP</li>
          <li>Controller support</li>
        </ul>
      </div>
    </div>
  );
};

export default FoundGame;
