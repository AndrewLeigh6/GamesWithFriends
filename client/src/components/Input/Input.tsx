import React from "react";
import classes from "./Input.module.scss";
import { ReactComponent as User } from "../../icons/user-solid.svg";
import { ReactComponent as Friend } from "../../icons/user-friends-solid.svg";
import { ReactComponent as Times } from "../../icons/times-solid.svg";
import { ReactComponent as Copy } from "../../icons/copy-solid.svg";

export enum LeftIcon {
  User = "User",
  Friend = "Friend",
}

export enum RightIcon {
  Times = "Remove",
  Copy = "Copy",
}

interface AppProps {
  label: string;
  placeholder?: string;
  name: string;
  value?: string;
  leftIcon: LeftIcon;
  rightIcon?: RightIcon;
  readonly?: boolean;
}

const Input = (props: AppProps) => {
  const inputContainerClasses = [classes.InputContainer];

  if (props.rightIcon) {
    inputContainerClasses.push(classes.WithRightIcon);
  }

  return (
    <div className={inputContainerClasses.join(" ")}>
      <label htmlFor={props.name} className={classes.Label}>
        {props.label}
      </label>
      {renderLeftIcon(props.leftIcon)}
      <input
        type="text"
        className={classes.Input}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        readOnly={props.readonly}
      />
      {props.rightIcon ? renderRightIcon(props.rightIcon) : null}
    </div>
  );
};

const renderLeftIcon = (icon: LeftIcon): JSX.Element => {
  const IconType = getLeftIcon(icon);
  return <IconType className={classes.LeftIcon} name={icon + " icon"} />;
};

const renderRightIcon = (icon: RightIcon): JSX.Element => {
  const IconType = getRightIcon(icon);
  const iconComponent = (
    <button type="button" className={classes.Button} title={icon + " button"}>
      <IconType className={classes.RightIcon} name={icon + " icon"} />
    </button>
  );
  return iconComponent;
};

const getLeftIcon = (
  icon: LeftIcon
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
  switch (icon) {
    case LeftIcon.User:
      return User;
    case LeftIcon.Friend:
      return Friend;
    default:
      throw new Error("No icon found");
  }
};

const getRightIcon = (
  icon: RightIcon
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
  switch (icon) {
    case RightIcon.Copy:
      return Copy;
    case RightIcon.Times:
      return Times;
    default:
      throw new Error("No icon found");
  }
};

export default Input;
