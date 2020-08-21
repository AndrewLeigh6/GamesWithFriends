import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./LinksGenerator.module.scss";
import LinkInput from "./LinkInput/LinkInput";
import SVGIcon from "../SVGIcon/SVGIcon";
import Button from "../Button/Button";

const LinksGenerator = (props) => {
  const [friends, setFriends] = useState(2);

  return (
    <div className={classes.LinksGenerator}>
      <form>
        {renderUser()}
        {renderFriends()}
        <div className={classes.SetFriends}>
          {renderAddFriend()}
          {renderRemoveFriend()}
        </div>
        {renderButton()}
      </form>
    </div>
  );

  function generateLinks() {
    alert("lol");
  }

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
          key={`Player ${i + 2}`}
        />
      );
    }
    return linkInputs;
  }

  function renderAddFriend() {
    return (
      <div
        className={classes.AddFriend}
        onClick={() => setFriends((prev) => prev + 1)}
      >
        <SVGIcon icon="plus-circle" /> Add friend
      </div>
    );
  }

  function renderRemoveFriend() {
    return (
      <div
        className={classes.RemoveFriend}
        onClick={() => setFriends((prev) => prev - 1)}
      >
        <SVGIcon icon="minus-circle" /> Remove friend
      </div>
    );
  }

  function renderButton() {
    return <Button clicked={generateLinks}>Generate Links</Button>;
  }
};

LinksGenerator.propTypes = {};

export default LinksGenerator;
