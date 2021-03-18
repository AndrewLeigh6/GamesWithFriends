import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import GamesSelectedText from "../GamesSelectedText/GamesSelectedText";
import classes from "./GamesSelected.module.scss";

interface GamesSelectedProps {
  gamesSelected: number;
  maxVotesAllowed: number;
}

const GamesSelected = (props: GamesSelectedProps) => {
  return (
    <div className={classes.GamesSelected}>
      <GamesSelectedText gamesSelected={props.gamesSelected} />
      <Link to="/waiting" className={classes.DoneLink}>
        {props.gamesSelected === props.maxVotesAllowed ? (
          <Button color="Primary">Done</Button>
        ) : null}
      </Link>
    </div>
  );
};

export default GamesSelected;
