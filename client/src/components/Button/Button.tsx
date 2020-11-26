import React from "react";
import classes from "./Button.module.scss";

type Color = "Primary" | "SecondaryLight" | "SecondaryDark";

interface AppProps {
  children: string;
  color: Color;
}

const Button = (props: AppProps) => {
  return <button className={getClasses(props.color)}>{props.children}</button>;
};

const getClasses = (color: Color) => {
  return [classes.Button, classes[color]].join(" ");
};

export default Button;
