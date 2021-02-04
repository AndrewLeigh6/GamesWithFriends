import React from "react";
import classes from "./Button.module.scss";

type Color = "Primary" | "SecondaryLight" | "SecondaryDark";

interface AppProps {
  children: string | JSX.Element;
  color: Color;
  clicked?: () => void;
}

const Button = (props: AppProps) => {
  return (
    <button className={getClasses(props.color)} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

const getClasses = (color: Color) => {
  return [classes.Button, classes[color]].join(" ");
};

export default Button;
