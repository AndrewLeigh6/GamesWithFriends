import React from "react";
import PropTypes from "prop-types";
import classes from "./LinkInput.module.scss";

const LinkInput = (props) => {
  return (
    <div className={classes.LinkInput}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};

LinkInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default LinkInput;
