import React from "react";
import Button from "../Button/Button";
import Feature, { Icon } from "./Feature/Feature";
import classes from "./FoundGame.module.scss";
import placeholder from "./placeholder.png";

interface FeatureProp {
  name: string;
}

interface FoundGameProps {
  title: string;
  image: string;
  selected: boolean;
  features: FeatureProp[];
  selectedHandler: () => void;
  deselectedHandler: () => void;
}

const FoundGame = (props: FoundGameProps) => {
  const { features } = props;

  const renderButton = (selected: boolean): JSX.Element => {
    switch (selected) {
      case false:
        return (
          <Button color="SecondaryLight" clicked={props.selectedHandler}>
            Select
          </Button>
        );
      case true:
        return (
          <Button color="SecondaryDark" clicked={props.deselectedHandler}>
            Selected
          </Button>
        );
      default:
        throw new Error("Button state not valid");
    }
  };

  let filteredFeatures = features.filter(filterFeatures);

  return (
    <div className={classes.FoundGame}>
      <img
        src={props.image}
        className={classes.Image}
        alt={props.title}
        onError={handleError}
      />
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Features}>
        <ul>{renderFeatures(filteredFeatures)}</ul>
      </div>
      {renderButton(props.selected)}
    </div>
  );
};

const renderFeatures = (features: FeatureProp[]): JSX.Element[] => {
  const result = features.map((feature) => {
    return (
      <Feature
        key={feature.name}
        feature={feature.name}
        icon={selectIcon(feature.name)}
      />
    );
  });
  return result;
};

const selectIcon = (featureName: string): Icon => {
  switch (featureName) {
    case "Full controller support":
      return Icon.Controller;
    case "PvP":
      return Icon.PvP;
    default:
      return Icon.Coop;
  }
};

const handleError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
): void => {
  event.currentTarget.src = placeholder;
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
