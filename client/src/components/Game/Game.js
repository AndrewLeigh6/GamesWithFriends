import React from "react";
import PropTypes from "prop-types";
import classes from "./Game.module.scss";

const Game = (props) => {
  const style = {
    backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.58) 21.87%, rgba(0, 0, 0, 0) 33.33%), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${props.banner}')`,
  };
  return (
    <div className={classes.Game} style={style}>
      <div className={classes.Logo}>
        <img src={`${props.logo}`} alt={`${props.name} Logo`} />
      </div>
      <ul className={classes.Info}>
        {props.info.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

Game.propTypes = {
  banner: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.array.isRequired,
};

export default Game;
