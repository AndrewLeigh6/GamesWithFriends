import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = (props) => {
  if (props.form) {
    return <button className={classes.Button}>{props.children}</button>;
  }
  return (
    <div className={classes.Button} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

Button.propTypes = {
  form: PropTypes.bool,
  clicked: PropTypes.func,
};

export default Button;
