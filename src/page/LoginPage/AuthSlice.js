import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: {
      reducer(state, action) {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.role = action.payload.role
        state.token = action.payload.token
      } 
    },
    logout: {
      reducer(state) {
        state.isAuthenticated = false
        state.user = null
        state.role = null
      }
    },
  }
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer