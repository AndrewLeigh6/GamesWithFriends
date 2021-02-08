import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { iUserContext, UsersContext } from "../../App";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GeneratedLinks.module.scss";

const GeneratedLinks = () => {
  const { users } = useContext<iUserContext>(UsersContext);
  const BASE_URL = "http://localhost:3000/session?q=";
  let hostUrl = "";

  const copyUrl = async (url: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error: unknown) {
      throw new Error(`Failed to copy URL text:${error}`);
    }
  };

  const buildUsers = (): JSX.Element[] => {
    const userInputs = users.map((user, index) => {
      const finalUrl = `${BASE_URL}${user.randomUrl}`;
      if (index === 0) {
        hostUrl = "/session?q=" + user.randomUrl;
      }
      return (
        <Input
          label={user.username}
          leftIcon={LeftIcon.Friend}
          rightIcon={RightIcon.Copy}
          iconClicked={() => copyUrl(finalUrl)}
          name={user.username}
          value={finalUrl}
          readonly
          key={user.username}
        />
      );
    });

    return userInputs;
  };

  const buildInfoText = (): JSX.Element => {
    const infoText = (
      <React.Fragment>
        <InfoText title="How does it work?">
          <p>
            Send each of your friends their respective link. You can quickly
            copy the link by clicking the button on the right side of the text
            box.
          </p>
          <p>
            When everyone has their link and has pasted it into their browser,
            click the View Games button above. You will all see a list of all
            the games that you have in common. You will be able to vote for up
            to three games you’d like to play.
          </p>
        </InfoText>
      </React.Fragment>
    );

    return infoText;
  };
  return (
    <div className={classes.GeneratedLinks}>
      {buildUsers()}
      <div className={classes.Buttons}>
        <Link to="/">
          <Button color="SecondaryDark">Go back</Button>
        </Link>

        <Link to={hostUrl}>
          <Button color="Primary">View games</Button>
        </Link>
      </div>
      <div className={classes.Info}>{buildInfoText()}</div>
    </div>
  );
};

export default GeneratedLinks;
