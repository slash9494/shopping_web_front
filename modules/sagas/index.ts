import user from "./user";
import product from "./product";
import { all, fork } from "redux-saga/effects";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "server.lyhshop.cf";
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(user)]);
  yield all([fork(product)]);
}
