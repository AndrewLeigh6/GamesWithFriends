import classes from "./Layout.module.scss";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className={classes.Layout}>
      <h1 className={classes.Title}> Games With Friends </h1>
      <div className={classes.Content}>{props.children}</div>
    </div>
  );
};

export default Layout;
