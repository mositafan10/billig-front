import * as actionTypes from './actionTypes'
import Axios from 'axios'
import { message } from 'antd'
import { config } from '../../Constant'

var url = config.url.API_URL

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token'); 
    localStorage.removeItem('expirationDate'); 
    Axios.get(`${url}api/v1/account/logout/`, 
    { headers: {"Authorization" : `Bearer ${token}`} }) 
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (phone_number, password, otp, name) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post(`${url}api/v1/account/login/`, {
            phone_number: phone_number,
            password: password,
            otp: otp,
            name: name
        })  
        .then(res => {
            const token = res.data.token;
            const user = res.data.user;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('user', user);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token,user));
            dispatch(checkAuthTimeout(3600));
            window.location = '/';
        })
        .catch(error => {
            console.log(error);
            message.error(error.response.data.detail);
            dispatch(authFail(error));
        }
        )
    }
} 

export const authSignup = (phone_number, password, name) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post(`${url}api/v1/account/signup/`, {
            phone_number: phone_number,
            password: password,
            name: name
        })
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(checkAuthTimeout(3600));
        })
        .catch(error => {
            dispatch(authFail(error));
            message.loading("... صبر کنید",0.5)
            .then(() => message.error(
                {
                    content: error.response ? error.response.data.detail : "" ,  
                    duration:'4'
                }
              ))
        })
    }
}   

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token,user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}