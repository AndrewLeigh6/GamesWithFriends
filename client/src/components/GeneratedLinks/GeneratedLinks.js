import React from "react";
import classes from "./GeneratedLinks.module.scss";
import LinkInput from "../LinkInput/LinkInput";
import Button from "../Button/Button";

const GeneratedLinks = (props) => {
  return (
    <div className={classes.GeneratedLinks}>
      <form>
        {props.users.map((user) => (
          <LinkInput
            label={user.value}
            name={user.name}
            value=""
            key={user.name}
            readOnly
          />
        ))}
        <Button form>Choose games</Button>
      </form>
    </div>
  );
};

export default GeneratedLinks;
