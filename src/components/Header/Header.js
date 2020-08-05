import React from "react";
import PropTypes from "prop-types";
import classes from "./Header.module.scss";

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <p className={classes.Title}> Games with friends </p>
      <p className={classes.Subtitle}> An answer to your endless indecision</p>
    </header>
  );
};

Header.propTypes = {};

export default Header;
