import { LOGIN_SUCCESS, LOGIN_FAILURE } from './action';

const initialState = {
    isAuthenticated: false,
    role: '',
    token: null,
    error: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        return { ...state, isAuthenticated: true, token: action.payload.token, role: action.payload.role, error: null }
        case LOGIN_FAILURE:
        return { ...state, error: action.error }
        default:
        return state
    }
}
