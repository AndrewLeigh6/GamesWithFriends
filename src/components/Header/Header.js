import React from "react";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.Header}>
      <p className={classes.Title}> Games with friends </p>
      <p className={classes.Subtitle}> An answer to your endless indecision</p>
    </header>
  );
};

export default Header;
