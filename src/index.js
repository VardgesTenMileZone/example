import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import logger from "redux-logger";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import rootReducer from "./store/reducers";
// import AuthDataProvider from "./hooks/useAuthorization";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    {/* <AuthDataProvider> */}
      <App />
    {/* </AuthDataProvider> */}
  </Provider>,
  document.getElementById("root")
);
