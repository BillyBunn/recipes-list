import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import App from "./components/App";
import Root from "./components/Root";
import configureStore from "./store";

const store = configureStore();

render(
  // <Provider store={store}>
  <Root store={store} />,
  // </Provider>
  document.getElementById("root")
);
