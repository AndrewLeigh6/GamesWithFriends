import React from "react";
import classes from "./WinningGame.module.scss";
import { ReactComponent as Crown } from "../../icons/crown-solid.svg";

interface AppProps {
  title: string;
  image: string;
  votes: number;
}

const crowns = {
  gold: {
    title: "Gold crown icon for the most popular game",
    classes: [classes.Crown, classes.Gold].join(" "),
  },
};

const WinningGame = (props: AppProps) => {
  return (
    <div className={classes.WinningGame}>
      <div className={classes.Title}>{props.title}</div>
      <img className={classes.Image} src={props.image} alt={props.title} />
      <div className={classes.Votes}>
        <Crown className={crowns.gold.classes} title={crowns.gold.title} />
        {props.votes} <span>votes</span>
      </div>
    </div>
  );
};

export default WinningGame;
