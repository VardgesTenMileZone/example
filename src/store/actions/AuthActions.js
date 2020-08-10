import { createAuth0Authentication, auth0Management } from '../../utils/auth';
import { LOGIN, LOGOUT, ISLOGIN, GET_USER } from '../constants'

const login = ({ username, password, client }) => async dispatch => {
    dispatch({ type: LOGIN.PENDING })

    const auth0 = createAuth0Authentication();
    auth0.client.login(
        {
            realm: 'Username-Password-Authentication',
            username,
            password,
            audience: `https://${process.env.REACT_APP_AUTH0_AUDIENCE}/api/v2/`,
            scope: 'openid read:current_user update:current_user_metadata',
        },
        (err, authResult) => {
            if (err) {
                dispatch({ type: LOGIN.ERROR, error: err })
            }else{
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('access_token', authResult.accessToken);
                dispatch({ type: LOGIN.SUCCESS })
            }
        }
    );
};

const isLogin = () => async dispatch => {
    dispatch({ type: ISLOGIN.PENDING })

    if(localStorage.getItem('id_token')){
        return dispatch({ type: ISLOGIN.SUCCESS })
    }

    dispatch({ type: ISLOGIN.ERROR })
};
const reset = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
}

const logout = () => async dispatch => {
    dispatch({ type: LOGOUT.PENDING })

    reset();

    dispatch({ type: LOGOUT.SUCCESS })

    window.location.href = '/';
};

export {
    login,
    logout
}