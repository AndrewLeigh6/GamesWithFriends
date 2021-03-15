import React from "react";
import GamesSelectedText from "../GamesSelectedText/GamesSelectedText";
import classes from "./WaitingBubble.module.scss";

interface WaitingBubbleProps {
  name: string;
  selected: number;
}

const WaitingBubble = (props: WaitingBubbleProps) => {
  return (
    <div className={classes.WaitingBubble}>
      <span>{props.name}</span>
      <GamesSelectedText gamesSelected={props.selected} />
    </div>
  );
};

export default WaitingBubble;
