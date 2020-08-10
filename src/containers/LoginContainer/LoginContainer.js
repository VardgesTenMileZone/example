import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/AuthActions';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import LoginComponent from '../../components/LoginComponent/LoginComponent';

const LoginContainer = ({ loginAction, login }) => {
    useEffect(() => {
        if(localStorage.getItem('id_token')){
            window.location.href = "/tickets";
        }
    }, [])

    useEffect(() => {
        if(login.loginStatus === 'error'){
            toast.error(login.loginError.description)
        }
    }, [login])

    return (
        <>
            { login.loginStatus === 'success' && <Redirect to="/tickets" /> }
            { login.loginStatus === 'pending' &&  <Spinner />}
            <LoginComponent loginAction={loginAction} />
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    loginAction: body => dispatch(login(body))
});

const mapStateToProps = state => ({
    login: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);