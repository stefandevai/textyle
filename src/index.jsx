import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "ui/App";
import store from "redux/store";
import ReactModal from "react-modal";
import "index.css";

// Set app element in order to hide it
// when a modal is open.
ReactModal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
