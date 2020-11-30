import React from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import InputError from "../../components/Input/InputError/InputError";
import classes from "./GenerateLinks.module.scss";

const GenerateLinks = () => {
  return (
    <div className={classes.GenerateLinks}>
      <Input
        label="Your Steam URL"
        leftIcon={LeftIcon.User}
        name="user"
        placeholder="Enter your Steam URL"
      />
      <Input
        label="Friend's Steam URL"
        leftIcon={LeftIcon.Friend}
        name="friend"
        placeholder="Enter your friend's Steam URL"
        rightIcon={RightIcon.Times}
      />
      <div className={classes.Buttons}>
        <Button color="SecondaryDark">Add Friend</Button>
        <Button color="Primary">Generate Links</Button>
      </div>
      <div className={classes.Info}>
        <InfoText title="How does it work?">
          Enter your Steam URL, and the URL of at least one friend. You’ll each
          be shown a list of the games that you have in common, which you can
          then vote on to decide which game you should play together.
        </InfoText>
        <InfoText title="How do I get my Steam URL?">
          Click on your username in the top right corner of the Steam interface,
          and then select ‘View my profile’. Next, right click anywhere on the
          page, and choose ‘Copy Page URL’. Paste it into the first text box at
          the top of this page.
        </InfoText>
      </div>
    </div>
  );
};

export default GenerateLinks;
