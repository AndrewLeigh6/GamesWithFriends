import React from "react";
import classes from "./InputError.module.scss";

interface InputErrorProps {
  message: string;
}

const InputError = (props: InputErrorProps) => {
  return <div className={classes.InputError}>{props.message}</div>;
};

export default InputError;
