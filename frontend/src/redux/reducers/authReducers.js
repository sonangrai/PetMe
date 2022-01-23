import { createReducer } from "@reduxjs/toolkit";
import { login } from "./actions/authActions";

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: true,
};

const authReducers = createReducer(initialState, {
  [login]: (state) => {
    state.loading = true;
  },
});

export default authReducers;
