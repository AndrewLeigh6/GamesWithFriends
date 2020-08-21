import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <div className={classes.Button} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
};

export default Button;
