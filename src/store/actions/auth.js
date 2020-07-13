import * as actionTypes from './actionTypes';
import Axios from 'axios';
import { message } from 'antd';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('expirationDate'); 
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

export const authLogin = (phone_number, password, otp) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post('http://127.0.0.1:8000/api/v1/account/login/', {
            phone_number: phone_number,
            password: password,
            otp: otp
        })  
        .then(res => {
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            window.location.assign('/profile')
            .then(()=> message.success("به بیلیگ پست خوش آمدید",2));
        })
        .catch(error => {
            dispatch(authFail(error));
            // message.error(
            //     {
            //         content:error.response.data.detail,
            //         duration:'4'
            //     }
            // )
        }
        )
    }
} 

export const authSignup = (phone_number, password) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post('http://127.0.0.1:8000/api/v1/account/signup/', {
            phone_number: phone_number,
            password: password
        })
        .then(res => {
            // const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            // localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            // dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(error => {
            dispatch(authFail(error));
            message.loading("... صبر کنید",0.5)
            .then(() => message.error(
                {
                    content:error.response.data.detail,
                    duration:'4'
                }
              ))
        })
    }
}   

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}