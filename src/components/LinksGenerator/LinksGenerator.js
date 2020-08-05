import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./LinksGenerator.module.scss";
import LinkInput from "./LinkInput/LinkInput";

const LinksGenerator = (props) => {
  const [friends, setFriends] = useState(2);
  return (
    <div className={classes.LinksGenerator}>
      <form>
        {renderUser()}
        {renderFriends()}
      </form>
    </div>
  );

  function renderUser() {
    return (
      <LinkInput
        label="Player 1 (that's you!)"
        name="player-1"
        placeholder="https://steamcommunity.com/id/your-steam-profile/"
      />
    );
  }

  function renderFriends() {
    let linkInputs = [];
    for (let i = 0; i < friends; i++) {
      linkInputs.push(
        <LinkInput
          label={`Player ${i + 2}`}
          name={`player-${i + 2}`}
          placeholder="https://steamcommunity.com/id/friends-steam-profile/"
        />
      );
    }
    return linkInputs;
  }
};

LinksGenerator.propTypes = {};

export default LinksGenerator;
