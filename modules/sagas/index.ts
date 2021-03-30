import user from "./user";
import product from "./product";
import { all, fork } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://shopping-m.herokuapp.com"
    : "http://localhost:5000";
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(user)]);
  yield all([fork(product)]);
}
