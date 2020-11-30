import React from "react";
import classes from "./InputError.module.scss";

interface AppProps {
  message: string;
}

const InputError = (props: AppProps) => {
  return <div className={classes.InputError}>{props.message}</div>;
};

export default InputError;
