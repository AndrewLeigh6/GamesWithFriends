import React from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GenerateLinks.module.scss";
import { Friend } from "../../App";

interface AppProps {
  friends: Friend[];
  onAddFriend: (name: string) => void;
  onRemoveFriend: (index: number) => void;
  onFriendUrlChanged: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
  onHostUrlChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateSession: () => Promise<void>;
}

const GenerateLinks = (props: AppProps) => {
  const buildFriendInputs = (): JSX.Element[] => {
    const friendInputs = props.friends.map((friend, index) => {
      return (
        <Input
          label="Friend's Steam URL"
          leftIcon={LeftIcon.Friend}
          name={"friend" + index}
          placeholder="Enter your friend's Steam URL"
          rightIcon={RightIcon.Times}
          iconClicked={() => props.onRemoveFriend(index)}
          key={friend.id}
          index={index}
          changed={props.onFriendUrlChanged}
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
        changed={props.onHostUrlChanged}
      />
      {buildFriendInputs()}
      <div className={classes.Buttons}>
        <Button color="SecondaryDark" clicked={() => props.onAddFriend("")}>
          Add Friend
        </Button>
        <Button color="Primary" clicked={props.onCreateSession}>
          Generate Links
        </Button>
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
