import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../store/actions/AuthActions";

export const AuthDataContext = createContext(null);

const AuthDataProvider = ({ children }) => {
  const user = useSelector(store => store.auth.data);
  const logoutReducer = useSelector(store => store.auth.logoutStatus);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState(
    JSON.parse(localStorage.getItem("id_token"))
  );

  useEffect(() => {
    if (user) {
      setAuthData(user);
    }
    if (logoutReducer === 'success') {
      setAuthData(null);
    }
  }, [logoutReducer, user]);

  const onLogout = useCallback(() => {
    dispatch(logout());
    return <Redirect to="/" />;
  }, []);

  const onLogin = newAuthData => setAuthData(newAuthData);
  const authDataValue = useMemo(() => ({ authData, onLogin, onLogout }), [
    authData
  ]);

  return (
    <AuthDataContext.Provider value={authDataValue}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
