import { asyncState } from "../utils/reducerUtil";
import { UserState, Action } from "../types";
import { createReducer } from "typesafe-actions";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  BUY_PRODUCTS_REQUEST,
  BUY_PRODUCTS_SUCCESS,
  BUY_PRODUCTS_FAILURE,
} from "../actions";

export const initialState: UserState = {
  loginInfo: asyncState.initial(),
  logOutInfo: asyncState.initial(),
  signUpInfo: asyncState.initial(),
  userInfo: asyncState.initial(),
};

const userReducer = createReducer<UserState, Action>(initialState, {
  [LOG_IN_REQUEST]: (state) => ({
    ...state,
    loginInfo: asyncState.load(),
  }),
  [LOG_IN_SUCCESS]: (state, action) => ({
    ...state,
    loginInfo: asyncState.success(action.payload),
  }),
  [LOG_IN_FAILURE]: (state, action) => ({
    ...state,
    loginInfo: asyncState.error(action.payload),
  }),
  [LOG_OUT_REQUEST]: (state) => ({
    ...state,
    logOutInfo: asyncState.load(),
  }),
  [LOG_OUT_SUCCESS]: (state, action) => ({
    ...state,
    logOutInfo: asyncState.success(action.payload),
    loginInfo: asyncState.initial(),
    userInfo: asyncState.initial(),
  }),
  [LOG_OUT_FAILURE]: (state, action) => ({
    ...state,
    logOutInfo: asyncState.error(action.payload),
  }),
  [AUTH_CHECK_REQUEST]: (state) => ({
    ...state,
    userInfo: asyncState.load(state.userInfo?.data),
  }),
  [AUTH_CHECK_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: asyncState.success(action.payload),
  }),
  [AUTH_CHECK_FAILURE]: (state, action) => ({
    ...state,
    userInfo: asyncState.error(action.payload),
  }),
  [SIGN_UP_REQUEST]: (state) => ({
    ...state,
    signUpInfo: asyncState.load(),
  }),
  [SIGN_UP_SUCCESS]: (state, action) => ({
    ...state,
    signUpInfo: asyncState.success(action.payload),
  }),
  [SIGN_UP_FAILURE]: (state, action) => ({
    ...state,
    signUpInfo: asyncState.error(action.payload),
  }),
  [ADD_TO_CART_REQUEST]: (state) => ({
    ...state,
    userInfo: asyncState.load({ ...state.userInfo?.data }),
  }),
  [ADD_TO_CART_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: asyncState.success({
      ...state.userInfo?.data,
      cart: action.payload,
    }),
  }),
  [ADD_TO_CART_FAILURE]: (state, action) => ({
    ...state,
    userInfo: asyncState.error(action.payload),
  }),
  [REMOVE_CART_ITEM_REQUEST]: (state) => ({
    ...state,
    userInfo: asyncState.load({ ...state.userInfo?.data }),
  }),
  [REMOVE_CART_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: asyncState.success({
      ...state.userInfo?.data,
      cart: action.payload,
    }),
  }),
  [REMOVE_CART_ITEM_FAILURE]: (state, action) => ({
    ...state,
    userInfo: asyncState.error(action.payload),
  }),
  [BUY_PRODUCTS_REQUEST]: (state) => ({
    ...state,
    userInfo: asyncState.load({ ...state.userInfo?.data }),
  }),
  [BUY_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: asyncState.success({
      ...state.userInfo?.data,
      cart: action.payload,
    }),
  }),
  [BUY_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    userInfo: asyncState.error(action.payload),
  }),
});

export default userReducer;
