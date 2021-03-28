import { asyncState } from "./../utils/reducerUtil";
import { ProductState, Action } from "../types";
import { createReducer } from "typesafe-actions";
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  LOAD_MAN_PRODUCTS_REQUEST,
  LOAD_MAN_PRODUCTS_SUCCESS,
  LOAD_MAN_PRODUCTS_FAILURE,
  UPLOAD_MAN_PRODUCT_REQUEST,
  UPLOAD_MAN_PRODUCT_SUCCESS,
  UPLOAD_MAN_PRODUCT_FAILURE,
  UPLOAD_WOMAN_PRODUCT_REQUEST,
  UPLOAD_WOMAN_PRODUCT_SUCCESS,
  UPLOAD_WOMAN_PRODUCT_FAILURE,
  UPLOAD_KID_PRODUCT_REQUEST,
  UPLOAD_KID_PRODUCT_SUCCESS,
  UPLOAD_KID_PRODUCT_FAILURE,
  LOAD_WOMAN_PRODUCTS_REQUEST,
  LOAD_WOMAN_PRODUCTS_SUCCESS,
  LOAD_WOMAN_PRODUCTS_FAILURE,
  LOAD_KID_PRODUCTS_REQUEST,
  LOAD_KID_PRODUCTS_SUCCESS,
  LOAD_KID_PRODUCTS_FAILURE,
  LOAD_MAN_PRODUCT_BY_ID_REQUEST,
  LOAD_MAN_PRODUCT_BY_ID_SUCCESS,
  LOAD_MAN_PRODUCT_BY_ID_FAILURE,
  LOAD_WOMAN_PRODUCT_BY_ID_REQUEST,
  LOAD_WOMAN_PRODUCT_BY_ID_SUCCESS,
  LOAD_WOMAN_PRODUCT_BY_ID_FAILURE,
  LOAD_KID_PRODUCT_BY_ID_REQUEST,
  LOAD_KID_PRODUCT_BY_ID_SUCCESS,
  LOAD_KID_PRODUCT_BY_ID_FAILURE,
} from "../actions";

export const initialState: ProductState = {
  fileUploadInfo: asyncState.initial(),
  uploadProductInfo: asyncState.initial(),
  loadProductsInfo: asyncState.initial(),
  loadProductByIdInfo: asyncState.initial(),
};

const productReducer = createReducer<ProductState, Action>(initialState, {
  [FILE_UPLOAD_REQUEST]: (state) => ({
    ...state,
    fileUploadInfo: asyncState.load(state.fileUploadInfo?.data),
  }),
  [FILE_UPLOAD_SUCCESS]: (state, action) => ({
    ...state,
    fileUploadInfo: asyncState.success(action.payload),
  }),
  [FILE_UPLOAD_FAILURE]: (state, action) => ({
    ...state,
    fileUploadInfo: asyncState.error(action.payload),
  }),
  [UPLOAD_MAN_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.load(action.payload),
  }),
  [UPLOAD_MAN_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.success(action.payload),
  }),
  [UPLOAD_MAN_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.error(action.payload),
  }),
  [UPLOAD_WOMAN_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.load(action.payload),
  }),
  [UPLOAD_WOMAN_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.success(action.payload),
  }),
  [UPLOAD_WOMAN_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.error(action.payload),
  }),
  [UPLOAD_KID_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.load(action.payload),
  }),
  [UPLOAD_KID_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.success(action.payload),
  }),
  [UPLOAD_KID_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    uploadProductInfo: asyncState.error(action.payload),
  }),
  [LOAD_MAN_PRODUCTS_REQUEST]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.load(action.payload),
  }),
  [LOAD_MAN_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.success(action.payload),
  }),
  [LOAD_MAN_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.error(action.payload),
  }),
  [LOAD_WOMAN_PRODUCTS_REQUEST]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.load(action.payload),
  }),
  [LOAD_WOMAN_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.success(action.payload),
  }),
  [LOAD_WOMAN_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.error(action.payload),
  }),
  [LOAD_KID_PRODUCTS_REQUEST]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.load(action.payload),
  }),
  [LOAD_KID_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.success(action.payload),
  }),
  [LOAD_KID_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    loadProductsInfo: asyncState.error(action.payload),
  }),
  [LOAD_MAN_PRODUCT_BY_ID_REQUEST]: (state) => ({
    ...state,
    loadProductByIdInfo: asyncState.load(state.loadProductByIdInfo?.data),
  }),
  [LOAD_MAN_PRODUCT_BY_ID_SUCCESS]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.success(action.payload),
  }),
  [LOAD_MAN_PRODUCT_BY_ID_FAILURE]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.error(action.payload),
  }),
  [LOAD_WOMAN_PRODUCT_BY_ID_REQUEST]: (state) => ({
    ...state,
    loadProductByIdInfo: asyncState.load(state.loadProductByIdInfo?.data),
  }),
  [LOAD_WOMAN_PRODUCT_BY_ID_SUCCESS]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.success(action.payload),
  }),
  [LOAD_WOMAN_PRODUCT_BY_ID_FAILURE]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.error(action.payload),
  }),
  [LOAD_KID_PRODUCT_BY_ID_REQUEST]: (state) => ({
    ...state,
    loadProductByIdInfo: asyncState.load(state.loadProductByIdInfo?.data),
  }),
  [LOAD_KID_PRODUCT_BY_ID_SUCCESS]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.success(action.payload),
  }),
  [LOAD_KID_PRODUCT_BY_ID_FAILURE]: (state, action) => ({
    ...state,
    loadProductByIdInfo: asyncState.error(action.payload),
  }),
});

export default productReducer;
