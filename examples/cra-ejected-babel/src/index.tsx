import React from "react";
import ReactDOM from "react-dom";
import data from "../data/users-mock.json";

ReactDOM.render(
  <React.StrictMode>{JSON.stringify(data[1])}</React.StrictMode>,
  document.getElementById("root")
);
