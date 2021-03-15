import React from "react";
import classes from "./Feature.module.scss";
import { ReactComponent as Controller } from "../../../icons/gamepad-solid.svg";
import { ReactComponent as Coop } from "../../../icons/user-friends-solid.svg";
import { ReactComponent as Pvp } from "../../../icons/users-solid.svg";

export enum Icon {
  Coop = "coop",
  PvP = "pvp",
  Controller = "controller",
}

interface FeatureProps {
  feature: string;
  icon: Icon;
}

const Feature = (props: FeatureProps) => {
  return (
    <li className={classes.Feature}>
      {renderIcon(props.icon)}
      <span className={classes.Text}>{props.feature}</span>
    </li>
  );
};

const renderIcon = (icon: Icon): JSX.Element => {
  const IconType = getIcon(icon);
  return <IconType className={classes.Icon} name={icon + " icon"} />;
};

const getIcon = (
  icon: Icon
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
  switch (icon) {
    case Icon.Controller:
      return Controller;
    case Icon.Coop:
      return Coop;
    case Icon.PvP:
      return Pvp;
    default:
      throw new Error("No icon found");
  }
};

export default Feature;
