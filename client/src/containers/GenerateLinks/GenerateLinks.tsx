import React, { useContext, useReducer, useState } from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GenerateLinks.module.scss";
import { useHistory } from "react-router-dom";
import { Session } from "../../helpers/Session";
import { iUserContext, UsersContext } from "../../App";

const MIN_FRIENDS = 1;
const MAX_FRIENDS = 7;

interface AppProps {
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
}

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

const GenerateLinks = (props: AppProps) => {
  const [hostUrl, setHostUrl] = useState(
    "https://steamcommunity.com/id/felineyx/"
  );
  const [friends, dispatch] = useReducer(friendsFormReducer, initalState);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { setUsers } = useContext<iUserContext>(UsersContext);

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
    setIsLoading(true);
    const session = new Session();
    await session.create(hostUrl, friends);

    if (session.users !== null) {
      props.setSession(session);
      setUsers(session.users);
      setIsLoading(false);
      history.push("/generated-links");
    } else {
      setIsLoading(false);
      throw new Error("Failed to retrieve users");
    }
  };

  const buildHostInput = (): JSX.Element => {
    const hostInput = (
      <Input
        label="Your Steam URL"
        leftIcon={LeftIcon.User}
        name="user"
        placeholder="Enter your Steam URL"
        changed={onHostUrlChanged}
      />
    );

    return hostInput;
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

  const buildInfoText = (): JSX.Element => {
    const infoText = (
      <React.Fragment>
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
      </React.Fragment>
    );

    return infoText;
  };

  const buildButtons = (): JSX.Element => {
    let buttons = (
      <React.Fragment>
        <Button color="SecondaryDark" clicked={() => onAddFriend("")}>
          Add Friend
        </Button>
        <Button color="Primary" clicked={onCreateSession}>
          Generate Links
        </Button>
      </React.Fragment>
    );

    if (isLoading) {
      buttons = (
        <React.Fragment>
          <Button color="Primary">Loading users...</Button>
        </React.Fragment>
      );
    }

    return buttons;
  };

  return (
    <div className={classes.GenerateLinks}>
      {buildHostInput()}
      {buildFriendInputs()}
      <div className={isLoading ? classes.ButtonsLoading : classes.Buttons}>
        {buildButtons()}
      </div>
      <div className={classes.Info}>{buildInfoText()}</div>
    </div>
  );
};

export default GenerateLinks;
