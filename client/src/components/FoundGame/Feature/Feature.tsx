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

interface AppProps {
  feature: string;
  icon: Icon;
}

const Feature = (props: AppProps) => {
  return (
    <li className={classes.Feature}>
      {renderIcon(props.icon)}
      {props.feature}
    </li>
  );
};

const renderIcon = (icon: Icon): JSX.Element => {
  const IconType = getIcon(icon);
  return <IconType className={classes.Icon} />;
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
