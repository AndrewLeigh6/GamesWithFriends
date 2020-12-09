import React from "react";
import GamesSelectedText from "../GamesSelectedText/GamesSelectedText";
import classes from "./WaitingBubble.module.scss";

interface AppProps {
  name: string;
  selected: number;
}

const WaitingBubble = (props: AppProps) => {
  return (
    <div className={classes.WaitingBubble}>
      <span>{props.name}</span>
      <GamesSelectedText gamesSelected={props.selected} />
    </div>
  );
};

export default WaitingBubble;
