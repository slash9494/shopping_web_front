import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import {
  LoginInfo,
  LogOutInfo,
  UserInfo,
  SignUpInfo,
  FileUploadInfo,
  UploadProductInfo,
  LoadProductsInfo,
  LoadProductByIdInfo,
} from "./types";

// User Action //
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const AUTH_CHECK_REQUEST = "AUTH_CHECK_REQUEST";
export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
export const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const REMOVE_CART_ITEM_REQUEST = "REMOVE_CART_ITEM_REQUEST";
export const REMOVE_CART_ITEM_SUCCESS = "REMOVE_CART_ITEM_SUCCESS";
export const REMOVE_CART_ITEM_FAILURE = "REMOVE_CART_ITEM_FAILURE";
export const BUY_PRODUCTS_REQUEST = "BUY_PRODUCTS_REQUEST";
export const BUY_PRODUCTS_SUCCESS = "BUY_PRODUCTS_SUCCESS";
export const BUY_PRODUCTS_FAILURE = "BUY_PRODUCTS_FAILURE";

// Upload Action //
export const FILE_UPLOAD_REQUEST = "FILE_UPLOAD_REQUEST";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_FAILURE = "FILE_UPLOAD_FAILURE";
export const UPLOAD_MAN_PRODUCT_REQUEST = "UPLOAD_MAN_PRODUCT_REQUEST";
export const UPLOAD_MAN_PRODUCT_SUCCESS = "UPLOAD_MAN_PRODUCT_SUCCESS";
export const UPLOAD_MAN_PRODUCT_FAILURE = "UPLOAD_MAN_PRODUCT_FAILURE";
export const UPLOAD_WOMAN_PRODUCT_REQUEST = "UPLOAD_WOMAN_PRODUCT_REQUEST";
export const UPLOAD_WOMAN_PRODUCT_SUCCESS = "UPLOAD_WOMAN_PRODUCT_SUCCESS";
export const UPLOAD_WOMAN_PRODUCT_FAILURE = "UPLOAD_WOMAN_PRODUCT_FAILURE";
export const UPLOAD_KID_PRODUCT_REQUEST = "UPLOAD_KID_PRODUCT_REQUEST";
export const UPLOAD_KID_PRODUCT_SUCCESS = "UPLOAD_KID_PRODUCT_SUCCESS";
export const UPLOAD_KID_PRODUCT_FAILURE = "UPLOAD_KID_PRODUCT_FAILURE";

// Load Product Action //
export const LOAD_MAN_PRODUCTS_REQUEST = "LOAD_MAN_PRODUCTS_REQUEST";
export const LOAD_MAN_PRODUCTS_SUCCESS = "LOAD_MAN_PRODUCTS_SUCCESS";
export const LOAD_MAN_PRODUCTS_FAILURE = "LOAD_MAN_PRODUCTS_FAILURE";
export const LOAD_WOMAN_PRODUCTS_REQUEST = "LOAD_WOMAN_PRODUCTS_REQUEST";
export const LOAD_WOMAN_PRODUCTS_SUCCESS = "LOAD_WOMAN_PRODUCTS_SUCCESS";
export const LOAD_WOMAN_PRODUCTS_FAILURE = "LOAD_WOMAN_PRODUCTS_FAILURE";
export const LOAD_KID_PRODUCTS_REQUEST = "LOAD_KID_PRODUCTS_REQUEST";
export const LOAD_KID_PRODUCTS_SUCCESS = "LOAD_KID_PRODUCTS_SUCCESS";
export const LOAD_KID_PRODUCTS_FAILURE = "LOAD_KID_PRODUCTS_FAILURE";
export const LOAD_MAN_PRODUCT_BY_ID_REQUEST = "LOAD_MAN_PRODUCT_BY_ID_REQUEST";
export const LOAD_MAN_PRODUCT_BY_ID_SUCCESS = "LOAD_MAN_PRODUCT_BY_ID_SUCCESS";
export const LOAD_MAN_PRODUCT_BY_ID_FAILURE = "LOAD_MAN_PRODUCT_BY_ID_FAILURE";
export const LOAD_WOMAN_PRODUCT_BY_ID_REQUEST =
  "LOAD_WOMAN_PRODUCT_BY_ID_REQUEST";
export const LOAD_WOMAN_PRODUCT_BY_ID_SUCCESS =
  "LOAD_WOMAN_PRODUCT_BY_ID_SUCCESS";
export const LOAD_WOMAN_PRODUCT_BY_ID_FAILURE =
  "LOAD_WOMAN_PRODUCT_BY_ID_FAILURE";
export const LOAD_KID_PRODUCT_BY_ID_REQUEST = "LOAD_KID_PRODUCT_BY_ID_REQUEST";
export const LOAD_KID_PRODUCT_BY_ID_SUCCESS = "LOAD_KID_PRODUCT_BY_ID_SUCCESS";
export const LOAD_KID_PRODUCT_BY_ID_FAILURE = "LOAD_KID_PRODUCT_BY_ID_FAILURE";
export const LOAD_CART_PRODUCTS_REQUEST = "LOAD_CART_PRODUCTS_REQUEST";
export const LOAD_CART_PRODUCTS_SUCCESS = "LOAD_CART_PRODUCTS_SUCCESS";
export const LOAD_CART_PRODUCTS_FAILURE = "LOAD_CART_PRODUCTS_FAILURE";

// User ActionCreator //

export const loginActionAsync = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
)<any, LoginInfo, AxiosError>();

export const logOutActionAsync = createAsyncAction(
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
)<void, LogOutInfo, AxiosError>();

export const authCheckActionAsync = createAsyncAction(
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE
)<void, UserInfo, AxiosError>();

export const signUpActionAsync = createAsyncAction(
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
)<any, SignUpInfo, AxiosError>();

export const addToCartActionAsync = createAsyncAction(
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
)<any, UserInfo, AxiosError>();

export const removeCartActionAsync = createAsyncAction(
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE
)<any, UserInfo, AxiosError>();

export const buyProductsActionAsync = createAsyncAction(
  BUY_PRODUCTS_REQUEST,
  BUY_PRODUCTS_SUCCESS,
  BUY_PRODUCTS_FAILURE
)<any, UserInfo, AxiosError>();

// Upload ActionCreator //

export const fileUploadActionAsync = createAsyncAction(
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE
)<any, FileUploadInfo, AxiosError>();

export const uploadManProductActionAsync = createAsyncAction(
  UPLOAD_MAN_PRODUCT_REQUEST,
  UPLOAD_MAN_PRODUCT_SUCCESS,
  UPLOAD_MAN_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

export const uploadWomanProductActionAsync = createAsyncAction(
  UPLOAD_WOMAN_PRODUCT_REQUEST,
  UPLOAD_WOMAN_PRODUCT_SUCCESS,
  UPLOAD_WOMAN_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

export const uploadKidProductActionAsync = createAsyncAction(
  UPLOAD_KID_PRODUCT_REQUEST,
  UPLOAD_KID_PRODUCT_SUCCESS,
  UPLOAD_KID_PRODUCT_FAILURE
)<any, UploadProductInfo, AxiosError>();

// Load Product ActionCreator //

export const loadManProductsActionAsync = createAsyncAction(
  LOAD_MAN_PRODUCTS_REQUEST,
  LOAD_MAN_PRODUCTS_SUCCESS,
  LOAD_MAN_PRODUCTS_FAILURE
)<any, LoadProductsInfo, AxiosError>();

export const loadWomanProductsActionAsync = createAsyncAction(
  LOAD_WOMAN_PRODUCTS_REQUEST,
  LOAD_WOMAN_PRODUCTS_SUCCESS,
  LOAD_WOMAN_PRODUCTS_FAILURE
)<any, LoadProductsInfo, AxiosError>();

export const loadKidProductsActionAsync = createAsyncAction(
  LOAD_KID_PRODUCTS_REQUEST,
  LOAD_KID_PRODUCTS_SUCCESS,
  LOAD_KID_PRODUCTS_FAILURE
)<any, LoadProductsInfo, AxiosError>();

export const loadManProductByIdActionAsync = createAsyncAction(
  LOAD_MAN_PRODUCT_BY_ID_REQUEST,
  LOAD_MAN_PRODUCT_BY_ID_SUCCESS,
  LOAD_MAN_PRODUCT_BY_ID_FAILURE
)<any, LoadProductByIdInfo, AxiosError>();

export const loadWomanProductByIdActionAsync = createAsyncAction(
  LOAD_WOMAN_PRODUCT_BY_ID_REQUEST,
  LOAD_WOMAN_PRODUCT_BY_ID_SUCCESS,
  LOAD_WOMAN_PRODUCT_BY_ID_FAILURE
)<any, LoadProductByIdInfo, AxiosError>();

export const loadKidProductByIdActionAsync = createAsyncAction(
  LOAD_KID_PRODUCT_BY_ID_REQUEST,
  LOAD_KID_PRODUCT_BY_ID_SUCCESS,
  LOAD_KID_PRODUCT_BY_ID_FAILURE
)<any, LoadProductByIdInfo, AxiosError>();
