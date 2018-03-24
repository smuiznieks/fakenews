import React from "react";
import "./Jumbotron.css";

export const Jumbotron = props => (
  <div>
    <br />
    <div className="jumbotron">
      {props.children}
    </div>
  </div>
);
