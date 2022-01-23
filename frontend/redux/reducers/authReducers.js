import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authReducers = createReducer(initialState, {});

export default authReducers;
