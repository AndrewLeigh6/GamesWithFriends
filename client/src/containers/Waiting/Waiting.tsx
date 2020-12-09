import React from "react";
import WaitingBubble from "../../components/WaitingBubble/WaitingBubble";
import classes from "./Waiting.module.scss";

const Waiting = () => {
  return (
    <div className={classes.Waiting}>
      <p>Still waiting for the following players:</p>

      <div className={classes.WaitingBubbles}>
        <WaitingBubble name="Loke1104" selected={0} />
        <WaitingBubble name="Blanket" selected={2} />
      </div>
    </div>
  );
};

export default Waiting;
