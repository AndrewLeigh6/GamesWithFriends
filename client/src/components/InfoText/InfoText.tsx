import classes from "./InfoText.module.scss";
import React from "react";

interface InfoTextProps {
  children: React.ReactNode;
  title: string;
}

const InfoText = (props: InfoTextProps) => {
  return (
    <div className={classes.InfoText}>
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Body}>{props.children}</div>
    </div>
  );
};

export default InfoText;
