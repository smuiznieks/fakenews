import React from "react";
export const ListItem = props => (
  <div>
    <h4>{props.headline}</h4>
    <p style={{ fontSize: 12 }}>Published: {props.date}</p>
    <p>{props.snippet}</p>
    <a type="btn" className="btn btn-danger" target="_blank" href={props.url} style={{ float: "right", marginBottom: 10, marginLeft: 10 }}>View Article</a>
  </div>
);