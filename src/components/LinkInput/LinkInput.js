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
        value={props.value}
        readOnly={props.readOnly}
        onChange={props.changed}
      />
    </div>
  );
};

LinkInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default LinkInput;
