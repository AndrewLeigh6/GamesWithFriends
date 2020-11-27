import React from "react";
import classes from "./GamesSelectedText.module.scss";

interface AppProps {
  gamesSelected: number;
}

const GamesSelectedText = (props: AppProps) => {
  return (
    <div className={classes.GamesSelectedText}>
      <span className={classes.Numbers}>{props.gamesSelected}/3</span>
      <span className={classes.Text}>selected</span>
    </div>
  );
};

export default GamesSelectedText;
