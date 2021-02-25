import React from "react";
import Button from "../Button/Button";
import Feature, { Icon } from "./Feature/Feature";
import classes from "./FoundGame.module.scss";

type buttonText = "Select" | "Selected";

interface FeatureProp {
  name: string;
}

interface AppProps {
  title: string;
  image: string;
  buttonText: buttonText;
  features: FeatureProp[];
}

const FoundGame = (props: AppProps) => {
  const { features } = props;

  let filteredFeatures = features.filter(filterFeatures);

  return (
    <div className={classes.FoundGame}>
      <img src={props.image} className={classes.Image} alt={props.title} />
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Features}>
        <ul>{renderFeatures(filteredFeatures)}</ul>
      </div>
      {renderButton(props.buttonText)}
    </div>
  );
};

const renderFeatures = (features: FeatureProp[]): JSX.Element[] => {
  const result = features.map((feature) => {
    return (
      <Feature key={feature.name} feature={feature.name} icon={Icon.Coop} />
    );
  });
  return result;
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

function filterFeatures(feature: FeatureProp): boolean {
  if (
    feature.name === "Full controller support" ||
    feature.name === "Multi-player" ||
    feature.name === "Cross-Platform Multiplayer" ||
    feature.name === "PvP" ||
    feature.name === "Co-op"
  ) {
    return true;
  } else {
    return false;
  }
}

export default FoundGame;
