import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        token: null
    });
}   

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null,
        loading: false,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        token: "notready"
    });
}

const authLoguot = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const authReady = (state, action) => {
    return updateObject(state, {
        token: "ready"
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_READY: return authReady(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLoguot(state, action);
        default:
            return state;
    }
}

export default reducer;