import React from "react";
export const SaveButton = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-danger">
    {props.children}
  </button>
);
