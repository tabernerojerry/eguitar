import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Router from "./Router";
import store from "./store";

import "./css/styles.css";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
