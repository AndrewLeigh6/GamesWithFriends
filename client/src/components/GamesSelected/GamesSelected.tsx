import React from "react";
import Button from "../Button/Button";
import classes from "./GamesSelected.module.scss";

interface AppProps {
  gamesSelected: number;
}

const GamesSelected = (props: AppProps) => {
  return (
    <div className={classes.GamesSelected}>
      <div className={classes.Numbers}>
        {props.gamesSelected}/3 <span className={classes.Text}>selected</span>
      </div>
      <Button color="Primary">Done</Button>
    </div>
  );
};

export default GamesSelected;
