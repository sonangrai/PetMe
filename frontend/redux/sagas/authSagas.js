import { all, put, takeLatest } from "redux-saga/effects";
import { login } from "../reducers/actions/authActions";

/**
 * Login Saga
 */
function* loginSaga() {
  try {
  } catch (error) {}
}

export default function* authSagas() {
  yield all([takeLatest(login, loginSaga)]);
}
