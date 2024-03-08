import { http } from "../../api/server"

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const loginSuccess = ({ token, role }) => ({
  type: LOGIN_SUCCESS,
  payload: { token, role }
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
})

export const login = (username, password) => {
  return (dispatch) => {
    http.post('/login', { username, password })
      .then((response) => {
        console.log(response.data.data)
        dispatch(loginSuccess({
            token: response.data.data.token,
            role: response.data.data.user.role
        }))
      })
      .catch((error) => {
        dispatch(loginFailure(error.message))
      })
  }
}
