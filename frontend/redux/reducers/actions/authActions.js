import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN/REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS/RESPONSE");
export const loginFailed = createAction("LOGIN_FAILED/RESPONSE");
