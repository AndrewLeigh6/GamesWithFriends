import React from "react";

const SVGIcon = (props) => {
  let path = "";

  switch (props.icon) {
    case "plus-circle":
      path =
        "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z";
      break;
    case "minus-circle":
      path =
        "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z";
      break;
    default:
      break;
  }

  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d={path} clipRule="evenodd"></path>
    </svg>
  );
};

export default SVGIcon;
