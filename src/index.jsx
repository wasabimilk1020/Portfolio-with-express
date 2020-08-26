import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

const { hot } = require("react-hot-loader/root");

const Hot = hot(App);
ReactDOM.render(<Hot />, document.getElementById("root"));