import React from "react";
import "./Jumbotron.css";

export const Jumbotron = props => (
  <div>
    <br />
    <div style={{ height: 300, clear: "both" }} className="jumbotron">
      {props.children}
    </div>
  </div>
);
