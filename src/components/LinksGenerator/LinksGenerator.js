import React from "react";
import PropTypes from "prop-types";
import classes from "./LinksGenerator.module.scss";
import LinkInput from "../LinkInput/LinkInput";
import SVGIcon from "../SVGIcon/SVGIcon";
import Button from "../Button/Button";

const LinksGenerator = (props) => {
  return (
    <div className={classes.LinksGenerator}>
      <form onSubmit={props.generateLinks}>
        {renderInputLinks()}
        <div className={classes.SetFriends}>
          {renderAddFriend()}
          {renderRemoveFriend()}
        </div>
        {renderButton()}
      </form>
    </div>
  );

  function renderInputLinks() {
    let linkInputs = [];
    linkInputs = props.users.map((user, i) => {
      return (
        <LinkInput
          label={user.label}
          name={user.name}
          placeholder={user.placeholder}
          value={user.value}
          key={user.name}
          changed={props.handleChange}
        />
      );
    });
    return linkInputs;
  }

  function renderAddFriend() {
    return (
      <div className={classes.AddFriend} onClick={props.handleAddFriend}>
        <SVGIcon icon="plus-circle" /> Add friend
      </div>
    );
  }

  function renderRemoveFriend() {
    return (
      <div className={classes.RemoveFriend} onClick={props.handleRemoveFriend}>
        <SVGIcon icon="minus-circle" /> Remove friend
      </div>
    );
  }

  function renderButton() {
    return <Button form>Generate Links</Button>;
  }
};

LinksGenerator.propTypes = {
  users: PropTypes.array,
  setUsers: PropTypes.func,
  handleAddFriend: PropTypes.func,
  handleRemoveFriend: PropTypes.func,
  setLinksGenerated: PropTypes.func,
  handleChange: PropTypes.func,
};

export default LinksGenerator;
