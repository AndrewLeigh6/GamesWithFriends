import React from "react";
import classes from "./GamesSelectedText.module.scss";

interface GamesSelectedTextProps {
  gamesSelected: number;
}

const GamesSelectedText = (props: GamesSelectedTextProps) => {
  return (
    <div className={classes.GamesSelectedText}>
      <span className={classes.Numbers}>{props.gamesSelected}/3</span>
      <span className={classes.Text}>selected</span>
    </div>
  );
};

export default GamesSelectedText;
