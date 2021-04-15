import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const Tooltip = () => {
  return (
    <Popup
      trigger={(open) => (
        <button className="button">
          Trigger - {open ? "Opened" : "Closed"}
        </button>
      )}
      position="right center"
      closeOnDocumentClick
    >
      <span> Popup content </span>
    </Popup>
  );
};

export default Tooltip;
