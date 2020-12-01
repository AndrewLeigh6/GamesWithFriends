import React from "react";
import Button from "../Button/Button";
import Feature, { Icon } from "./Feature/Feature";
import classes from "./FoundGame.module.scss";

type buttonText = "Select" | "Selected";

interface AppProps {
  title: string;
  image: string;
  icon: Icon;
  feature: string;
  buttonText: buttonText;
}

const FoundGame = (props: AppProps) => {
  return (
    <div className={classes.FoundGame}>
      <img src={props.image} className={classes.Image} alt={props.title} />
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Features}>
        <ul>
          <Feature feature="Online Co-op" icon={Icon.Coop} />
          <Feature feature="Online PvP" icon={Icon.PvP} />
          <Feature feature="Controller support" icon={Icon.Controller} />
        </ul>
      </div>
      {renderButton(props.buttonText)}
    </div>
  );
};

const renderButton = (buttonText: buttonText): JSX.Element => {
  switch (buttonText) {
    case "Select":
      return <Button color="SecondaryLight">{buttonText}</Button>;
    case "Selected":
      return <Button color="SecondaryDark">{buttonText}</Button>;
    default:
      throw new Error("Button text not valid");
  }
};

export default FoundGame;
