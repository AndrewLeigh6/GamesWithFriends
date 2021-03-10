import React from "react";
import Button from "../Button/Button";
import GamesSelectedText from "../GamesSelectedText/GamesSelectedText";
import classes from "./GamesSelected.module.scss";

interface AppProps {
  gamesSelected: number;
}

const GamesSelected = (props: AppProps) => {
  return (
    <div className={classes.GamesSelected}>
      <GamesSelectedText gamesSelected={props.gamesSelected} />
      <Button color="Primary">Done</Button>
    </div>
  );
};

export default GamesSelected;
