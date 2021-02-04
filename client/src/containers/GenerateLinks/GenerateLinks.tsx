import React, { useReducer, useState } from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GenerateLinks.module.scss";
import { Link } from "react-router-dom";
import { Session } from "../../helpers/Session";

const MIN_FRIENDS = 1;
const MAX_FRIENDS = 7;

export interface FriendInput {
  id: number;
  url: string;
}

type State = FriendInput[];

type Actions =
  | { type: "add"; url: string }
  | { type: "remove"; index: number }
  | { type: "change"; url: string; index: number };

function friendsFormReducer(state: State, action: Actions) {
  switch (action.type) {
    case "add":
      if (state.length < MAX_FRIENDS) {
        const id = Session.getRandomId();
        return [...state, { id: id, url: action.url }];
      } else {
        return state;
      }
    case "remove":
      if (state.length > MIN_FRIENDS) {
        return state.filter((_, index) => index !== action.index);
      } else {
        return state;
      }
    case "change":
      const copy = [...state];
      copy[action.index].url = action.url;
      return copy;
    default:
      return state;
  }
}

const initalState = [
  {
    id: Session.getRandomId(),
    url: "https://steamcommunity.com/id/lawadaisy/",
  },
];
const GenerateLinks = () => {
  const [hostUrl, setHostUrl] = useState(
    "https://steamcommunity.com/id/felineyx/"
  );
  const [friends, dispatch] = useReducer(friendsFormReducer, initalState);

  const onAddFriend = (url: string): void => {
    dispatch({ type: "add", url: url });
  };

  const onRemoveFriend = (index: number): void => {
    dispatch({ type: "remove", index: index });
  };

  const onFriendUrlChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ): void => {
    if (typeof index === "number") {
      dispatch({ type: "change", url: event.target.value, index: index });
    }
  };

  const onHostUrlChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHostUrl(event.target.value);
  };

  const onCreateSession = async (): Promise<void> => {
    const session = new Session();
    session.create(hostUrl, friends);
  };

  const buildFriendInputs = (): JSX.Element[] => {
    const friendInputs = friends.map((friend, index) => {
      return (
        <Input
          label="Friend's Steam URL"
          leftIcon={LeftIcon.Friend}
          name={"friend" + index}
          placeholder="Enter your friend's Steam URL"
          rightIcon={RightIcon.Times}
          iconClicked={() => onRemoveFriend(index)}
          key={friend.id}
          index={index}
          changed={onFriendUrlChanged}
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
        changed={onHostUrlChanged}
      />
      {buildFriendInputs()}
      <div className={classes.Buttons}>
        <Button color="SecondaryDark" clicked={() => onAddFriend("")}>
          Add Friend
        </Button>
        <Link to="/generated-links">
          <Button color="Primary" clicked={onCreateSession}>
            Generate Links
          </Button>
        </Link>
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
