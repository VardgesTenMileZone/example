import Auth0 from 'auth0-js';
import decode from 'jwt-decode';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

export const createAuth0Authentication = () =>
  new Auth0.WebAuth({
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    audience: `https://${process.env.REACT_APP_AUTH0_AUDIENCE}/api/v2/`,
    scope: 'read:current_user update:current_user_metadata',
  });

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export const auth0Management = () =>
  new Auth0.Management({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    token: localStorage.getItem('access_token')
  });

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearMountainId() {
  localStorage.removeItem('Selected_Mountain');
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) return null;

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);

  return expirationDate < new Date();
}

export const login = (username, password) =>
  new Promise((resolve, reject) => {
    const auth0 = createAuth0Authentication();
    auth0.client.login(
      {
        realm: 'Username-Password-Authentication',
        username,
        password,
        audience: `https://${process.env.REACT_APP_AUTH0_AUDIENCE}/api/v2/`,
        scope: 'read:current_user update:current_user_metadata',
      },
      (err, authResult) => {
        if (err) reject(err);
        resolve(authResult);
      }
    );
  });

export const signup = user =>
  new Promise((resolve, reject) => {
    const auth0 = createAuth0Authentication();
    auth0.redirect.signupAndLogin(
      {
        connection: 'Username-Password-Authentication',
        email: user.email,
        password: user.password,
        user_metadata: {
          firstName: user.firstName,
          lastName: user.lastName,
          sport: user.sport,
          age: user.age,
          phone: user.phone,
        },
      },
      (err, authResult) => {
        if (err) reject(err);
        resolve(authResult);
      }
    );
  });

export const changePassword = email =>
  new Promise((resolve, reject) => {
    const auth0 = createAuth0Authentication();
    auth0.changePassword(
      {
        connection: 'Username-Password-Authentication',
        email,
      },
      err => {
        if (err) reject(err);
        resolve();
      }
    );
  });

export const getIdToken = data =>
  // eslint-disable-line
  // console.log("getIdToken");
  data.getItem(ID_TOKEN_KEY) === null || data.getItem(ID_TOKEN_KEY) === 'null'
    ? data.removeItem(ID_TOKEN_KEY)
    : data.getItem(ID_TOKEN_KEY);

export const getAccessToken = () =>
  // eslint-disable-line
  localStorage.getItem(ACCESS_TOKEN_KEY) === null
    ? localStorage.clear()
    : localStorage.getItem(ACCESS_TOKEN_KEY);

export const loggedIn = idToken => {
  return !!idToken && !isTokenExpired(idToken);
};

export const loggedInAndExpired = () => {
  // console.log("loggedInAndExpired");
  const idToken = getIdToken();

  return !!idToken && isTokenExpired(idToken);
};

export const refreshToken = () =>
  new Promise((resolve, reject) => {
    // console.log("refreshToken");
    const auth0 = createAuth0Authentication();
    auth0.checkSession({}, (err, session) => {
      if (err) {
        reject();
      } else {
        localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
        localStorage.setItem(ID_TOKEN_KEY, session.idToken);
        resolve();
      }
    });
  });

export const reset = () => {
  clearIdToken();
  clearAccessToken();
  clearMountainId();
};

export const requireAuth = (nextState, replace) => {
  if (!loggedIn()) {
    replace({ pathname: '/' });
  }
};

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  const match = RegExp(`[#&]${name}=([^&]*)`).exec(window.location.hash);

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  const accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  const idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export default {};