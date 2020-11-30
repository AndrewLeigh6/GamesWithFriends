import React from "react";
import Button from "../../components/Button/Button";
import InfoText from "../../components/InfoText/InfoText";
import Input, { LeftIcon, RightIcon } from "../../components/Input/Input";
import classes from "./GeneratedLinks.module.scss";

const GeneratedLinks = () => {
  return (
    <div className={classes.GeneratedLinks}>
      <Input
        label="Loke1104"
        leftIcon={LeftIcon.Friend}
        rightIcon={RightIcon.Copy}
        name="user"
        value="www.gameswithfriends.com/SadGreenPanda"
        readonly
      />
      <Input
        label="Blanket"
        leftIcon={LeftIcon.Friend}
        rightIcon={RightIcon.Copy}
        name="user"
        value="www.gameswithfriends.com/AngryRedTurtle"
        readonly
      />
      <Input
        label="Alex"
        leftIcon={LeftIcon.Friend}
        rightIcon={RightIcon.Copy}
        name="user"
        value="www.gameswithfriends.com/CheerfulPurpleFish"
        readonly
      />
      <div className={classes.Buttons}>
        <Button color="SecondaryDark">Go back</Button>
        <Button color="Primary">View games</Button>
      </div>
      <div className={classes.Info}>
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
      </div>
    </div>
  );
};

export default GeneratedLinks;
