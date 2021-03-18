import React from "react";
import classes from "./WinningGame.module.scss";
import { ReactComponent as Crown } from "../../icons/crown-solid.svg";
import placeholder from "./placeholder.png";

interface WinningGameProps {
  title: string;
  image: string;
  votes: number;
  position: number;
}

const crowns = {
  gold: {
    title: "Gold crown icon for the most popular game",
    classes: [classes.Crown, classes.Gold].join(" "),
  },
  silver: {
    title: "Silver crown icon for the second most popular game",
    classes: [classes.Crown, classes.Silver].join(" "),
  },
  bronze: {
    title: "Bronze crown icon for the third most popular game",
    classes: [classes.Crown, classes.Bronze].join(" "),
  },
};

const getCrown = (position: number) => {
  switch (position) {
    case 0:
      return crowns.gold;
    case 1:
      return crowns.silver;
    case 2:
      return crowns.bronze;
    default:
      return crowns.bronze;
  }
};

const WinningGame = (props: WinningGameProps) => {
  const crown = getCrown(props.position);

  return (
    <div className={classes.WinningGame}>
      <div className={classes.Title}>{props.title}</div>
      <img
        className={classes.Image}
        src={props.image}
        alt={props.title}
        onError={handleError}
      />
      <div className={classes.Votes}>
        <Crown className={crown.classes} title={crown.title} />
        {props.votes} <span>votes</span>
      </div>
    </div>
  );
};

const handleError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
): void => {
  event.currentTarget.src = placeholder;
};

export default WinningGame;
