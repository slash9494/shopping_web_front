import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_SUCCESS,
  AUTH_CHECK_SUCCESS,
  BUY_PRODUCTS_SUCCESS,
  BUY_PRODUCTS_FAILURE,
  BUY_PRODUCTS_REQUEST,
} from "./../actions";
import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  SIGN_UP_REQUEST,
  AUTH_CHECK_REQUEST,
  loginActionAsync,
  signUpActionAsync,
  logOutActionAsync,
  authCheckActionAsync,
  ADD_TO_CART_REQUEST,
} from "../actions";

import createAsyncSaga from "../utils/createAsyncSaga";
import { ProductByIdInfo, CartInfo } from "../types";

interface LoginAPIProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  password: string;
  name: string;
}

async function loginAPI(loginData: LoginAPIProps) {
  const response = await axios.post("/api/users/login", loginData);
  return response.data;
}

const loginAsyncSaga = createAsyncSaga(loginActionAsync, loginAPI);

function* logInSaga() {
  yield takeLatest(LOG_IN_REQUEST, loginAsyncSaga);
}

async function signUpAPI(signUpData: SignUpProps) {
  const response = await axios.post("/api/users/signUp", signUpData);
  return response.data;
}

const signUpAsyncSaga = createAsyncSaga(signUpActionAsync, signUpAPI);

function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpAsyncSaga);
}

async function logOutAPI() {
  const response = await axios.get("/api/users/logout");
  return response.data;
}

const logOutAsyncSaga = createAsyncSaga(logOutActionAsync, logOutAPI);

function* logOutSaga() {
  yield takeLatest(LOG_OUT_REQUEST, logOutAsyncSaga);
}

async function authCheckAPI() {
  const response = await axios.get("/api/users/auth");
  return response.data;
}

const authCheckAsyncSaga = createAsyncSaga(authCheckActionAsync, authCheckAPI);

function* authCheckSaga() {
  yield takeEvery(AUTH_CHECK_REQUEST, authCheckAsyncSaga);
}

async function addToCartAPI(
  _id: string,
  productInfo: ProductByIdInfo,
  size: number
) {
  const response = await axios.post(`/api/users/addToCart?productId=${_id}`, {
    productInfo,
    size,
  });
  return response.data;
}

function* addToCartAsyncSaga(action: any) {
  try {
    const addToCartResult = yield call(
      addToCartAPI,
      action.id,
      action.cartProductInfo,
      action.size
    );
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: addToCartResult,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_TO_CART_FAILURE,
      payload: error.response.data,
    });
  }
}

function* addToCartSaga() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCartAsyncSaga);
}

async function removeCartItemAPI(id: string, size: number) {
  const response = await axios.post(
    `/api/users/removeFromCart?productId=${id}`,
    { size }
  );
  return response.data;
}

function* removeCartItemAsyncSaga(action: any) {
  try {
    const removeCartItemResult = yield call(
      removeCartItemAPI,
      action.id,
      action.size
    );
    yield put({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: removeCartItemResult,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.response.data,
    });
  }
}

function* removeCartItemSaga() {
  yield takeLatest(REMOVE_CART_ITEM_REQUEST, removeCartItemAsyncSaga);
}

async function buyProductsAPI(cartInfo: Array<CartInfo>, paymentData: any[]) {
  const response = await axios.post("/api/users/successBuy", {
    cartInfo: cartInfo,
    paymentData: paymentData,
  });
  return response.data;
}

function* buyProductsAsyncSaga(action: any) {
  try {
    const buyProductsResult = yield call(
      buyProductsAPI,
      action.cartInfo,
      action.paymentData
    );
    yield put({
      type: BUY_PRODUCTS_SUCCESS,
      payload: buyProductsResult,
    });
    const updateUserInfo = yield call(authCheckAPI);
    yield put({
      type: AUTH_CHECK_SUCCESS,
      payload: updateUserInfo,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: BUY_PRODUCTS_FAILURE,
      payload: error.response.data,
    });
  }
}

function* buyProductsSaga() {
  yield takeLatest(BUY_PRODUCTS_REQUEST, buyProductsAsyncSaga);
}

export default function* userSaga() {
  yield all([
    fork(logInSaga),
    fork(signUpSaga),
    fork(logOutSaga),
    fork(authCheckSaga),
    fork(addToCartSaga),
    fork(removeCartItemSaga),
    fork(buyProductsSaga),
  ]);
}
