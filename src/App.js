import React  from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Routes } from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./assets/style/style.scss";

const PrivateRoute = ({ component, ...options }) => {
  return localStorage.getItem('id_token') ? (
    <Route path={options.path} exact={options.exact} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        type="success"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <Router>
        <Switch>
          {Routes.map(route => {
            const _private = route.isPrivate;
            return _private ? (
              <PrivateRoute
                component={route.component}
                key={route.name}
                path={route.path}
                exact={route.isExact}
              />
            ) : (
              <Route
                key={route.name}
                path={route.path}
                component={route.component}
                exact={route.isExact}
              />
            );
          })}
        </Switch>
      </Router>
    </>
  );
};

export default App;
