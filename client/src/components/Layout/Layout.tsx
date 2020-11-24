import classes from "./Layout.module.scss";
import React from "react";

interface AppProps {
  children: React.ReactNode;
}

const Layout = (props: AppProps) => {
  return (
    <div className={classes.Layout}>
      <h1 className={classes.Title}> Games With Friends </h1>
      {props.children}
    </div>
  );
};

export default Layout;
