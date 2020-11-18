import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { message, notification } from "antd";
import { config } from "../../Constant";

var url = config.url.API_URL;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    token: null
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    signup: "notready"
  };
};

export const authReady = () => {
  return {
    type: actionTypes.AUTH_READY,
    signup: "ready"
  };
};

export const logout = () => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };

};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (phone_number, password, otp, name) => {
  return (dispatch) => {
    dispatch(authStart());
    localStorage.setItem("token", null);
    Axios.post(`${url}api/v1/account/login/`, {
      phone_number: phone_number,
      password: password,
      otp: otp,
      name: name,
    })
      .then((res) => {
        const token = res.data.token;
        const user = res.data.user;
        const first_time = res.data.first_time;
        const expirationDate = new Date(new Date().getTime() + 36000 * 1000);
        localStorage.setItem("user", user);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, user));
        dispatch(checkAuthTimeout(36000));
        {
          first_time
            ? (window.location = "/signup/complete/")
            : (window.location = "/");
        }
      })
      .catch((error) => {
        notification['error']({
          message: error.response.data.detail,
          style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", fontSizeAdjust:"0.5"},
          duration:3,
        });
        dispatch(authFail(error));
      });
  };
};

export const authSignup = (phone_number, password, name) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post(`${url}api/v1/account/signup/`, {
      phone_number: phone_number,
    })
      .then((res) => {
        const expirationDate = new Date(new Date().getTime() + 36000 * 1000);
        dispatch(authReady())
        localStorage.setItem("signup", "ready");
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error));
        localStorage.setItem("signup", "notready");
        notification['error']({
          message: error.response.data.detail,
          style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", fontSizeAdjust:"0.5"},
          duration:3,
        });
      });
  };
};

export const authSignup1 = (phone_number, password, otp, name) => {
  return (dispatch) => {
    dispatch(authStart());
    Axios.post(`${url}api/v1/account/signup/complete/`, {
      phone_number: phone_number,
      password: password,
      otp: otp,
      name: name,
    })
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          const first_time = res.data.first_time;
          const expirationDate = new Date(new Date().getTime() + 36000 * 1000);
          localStorage.setItem("user", user);
          localStorage.setItem("token", token);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(token, user));
          dispatch(checkAuthTimeout(36000));
          {
            first_time
              ? (window.location = "/signup/complete/")
              : (window.location = "/");
          }
        })
        .catch((error) => {
          message.error(error.response.data.detail);
          dispatch(authFail(error));
        })
      };
  };


export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
