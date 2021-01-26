import React, { useState } from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GenerateLinks.module.scss";

const GenerateLinks = () => {
  const MAX_FRIENDS = 7;
  const MIN_FRIENDS = 1;

  const [friends, setFriends] = useState<number>(1);

  const handleAddFriend = () => {
    if (friends < MAX_FRIENDS) {
      setFriends(friends + 1);
    }
  };

  const handleRemoveFriend = () => {
    if (friends > MIN_FRIENDS) {
      setFriends(friends - 1);
    }
  };

  const buildFriendInputs = (): JSX.Element[] => {
    const friendInputs = Array.from(Array(friends)).map((friend) => {
      return (
        <Input
          label="Friend's Steam URL"
          leftIcon={LeftIcon.Friend}
          name="friend"
          placeholder="Enter your friend's Steam URL"
          rightIcon={RightIcon.Times}
          key={friend}
          iconClicked={handleRemoveFriend}
        />
      );
    });

    return friendInputs;
  };

  return (
    <div className={classes.GenerateLinks}>
      <Input
        label="Your Steam URL"
        leftIcon={LeftIcon.User}
        name="user"
        placeholder="Enter your Steam URL"
      />
      {buildFriendInputs()}
      <div className={classes.Buttons}>
        <Button color="SecondaryDark" clicked={handleAddFriend}>
          Add Friend
        </Button>
        <Button color="Primary">Generate Links</Button>
      </div>
      <div className={classes.Info}>
        <InfoText title="How does it work?">
          Enter your Steam URL, and the URL of at least one friend. You’ll each
          be shown a list of the games that you have in common, which you can
          then vote on to decide which game you should play together.
        </InfoText>
        <InfoText title="How do I get my Steam URL?">
          <p>
            Click on your username in the top right corner of the Steam
            interface, and then select ‘View my profile’.
          </p>
          <p>
            Next, right click anywhere on the page, and choose ‘Copy Page URL’.
            Paste it into the first text box at the top of this page.
          </p>
        </InfoText>
      </div>
    </div>
  );
};

export default GenerateLinks;
