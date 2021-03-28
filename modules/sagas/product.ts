import {
  FILE_UPLOAD_REQUEST,
  uploadManProductActionAsync,
  UPLOAD_MAN_PRODUCT_REQUEST,
  uploadWomanProductActionAsync,
  UPLOAD_WOMAN_PRODUCT_REQUEST,
  uploadKidProductActionAsync,
  UPLOAD_KID_PRODUCT_REQUEST,
  loadManProductsActionAsync,
  LOAD_MAN_PRODUCTS_REQUEST,
  LOAD_WOMAN_PRODUCTS_REQUEST,
  LOAD_KID_PRODUCTS_REQUEST,
  loadWomanProductsActionAsync,
  loadKidProductsActionAsync,
  loadManProductByIdActionAsync,
  LOAD_MAN_PRODUCT_BY_ID_REQUEST,
  loadWomanProductByIdActionAsync,
  LOAD_WOMAN_PRODUCT_BY_ID_REQUEST,
  loadKidProductByIdActionAsync,
  LOAD_KID_PRODUCT_BY_ID_REQUEST,
} from "./../actions";
import axios from "axios";
import { fileUploadActionAsync } from "../actions";
import createAsyncSaga from "../utils/createAsyncSaga";
import { takeEvery, all, fork, takeLatest } from "redux-saga/effects";
import { Filters } from "../../components/Header/Header";

export type Config = {
  data: {
    header: Object;
  };
};
export type FileUploadAPIProps = {
  formData: FormData;
  config: Config;
};

export type LoadProductsAPIProps = {
  skip: number;
  limit: number;
  loadMore?: boolean;
  filters?: Filters;
  searchTerm?: string;
};

async function fileUploadAPI({ formData, config }: FileUploadAPIProps) {
  const response = await axios.post(
    "/api/product/uploadImage",
    formData,
    config
  );
  console.log(response.data);
  return response.data;
}

const fileUploadAsyncSaga = createAsyncSaga(
  fileUploadActionAsync,
  fileUploadAPI
);

function* fileUploadSaga() {
  yield takeEvery(FILE_UPLOAD_REQUEST, fileUploadAsyncSaga);
}

export type UploadProductAPIProps = {
  body: {
    writer: string;
    title: string;
    descriptionTitle: string;
    description: string;
    size: number[];
    amountOfS: string;
    amountOfM: string;
    amountOfL: string;
    color: string;
    price: string;
    images: Array<any>;
    category: number;
    section: string;
  };
};

async function uploadManProductAPI(body: UploadProductAPIProps) {
  const response = await axios.post("/api/product/uploadProduct/man", body);
  return response.data;
}

const uploadManProductAsyncSaga = createAsyncSaga(
  uploadManProductActionAsync,
  uploadManProductAPI
);

function* uploadManProductSaga() {
  yield takeLatest(UPLOAD_MAN_PRODUCT_REQUEST, uploadManProductAsyncSaga);
}

async function uploadWomanProductAPI(body: UploadProductAPIProps) {
  const response = await axios.post("/api/product/uploadProduct/woman", body);
  return response.data;
}

const uploadWomanProductAsyncSaga = createAsyncSaga(
  uploadWomanProductActionAsync,
  uploadWomanProductAPI
);

function* uploadWomanProductSaga() {
  yield takeLatest(UPLOAD_WOMAN_PRODUCT_REQUEST, uploadWomanProductAsyncSaga);
}

async function uploadKidProductAPI(body: UploadProductAPIProps) {
  const response = await axios.post("/api/product/uploadProduct/kid", body);
  return response.data;
}

const uploadKidProductAsyncSaga = createAsyncSaga(
  uploadKidProductActionAsync,
  uploadKidProductAPI
);

function* uploadKidProductSaga() {
  yield takeLatest(UPLOAD_KID_PRODUCT_REQUEST, uploadKidProductAsyncSaga);
}

async function loadManProductsAPI(body: LoadProductsAPIProps) {
  const response = await axios.post("api/product/getManProducts", body);
  return response.data;
}

const loadManProductAsyncSaga = createAsyncSaga(
  loadManProductsActionAsync,
  loadManProductsAPI
);

function* loadManProductsSaga() {
  yield takeLatest(LOAD_MAN_PRODUCTS_REQUEST, loadManProductAsyncSaga);
}

async function loadWomanProductsAPI(body: LoadProductsAPIProps) {
  const response = await axios.post("api/product/getWomanProducts", body);
  return response.data;
}

const loadWomanProductAsyncSaga = createAsyncSaga(
  loadWomanProductsActionAsync,
  loadWomanProductsAPI
);

function* loadWomanProductsSaga() {
  yield takeLatest(LOAD_WOMAN_PRODUCTS_REQUEST, loadWomanProductAsyncSaga);
}

async function loadKidProductsAPI(body: LoadProductsAPIProps) {
  const response = await axios.post("api/product/getKidProducts", body);
  return response.data;
}

const loadKidProductAsyncSaga = createAsyncSaga(
  loadKidProductsActionAsync,
  loadKidProductsAPI
);

function* loadKidProductsSaga() {
  yield takeLatest(LOAD_KID_PRODUCTS_REQUEST, loadKidProductAsyncSaga);
}

async function loadManProductByIdAPI(productId: string) {
  const response = await axios.get(
    `/api/product/manProductById?id=${productId}&type=single`
  );
  return response.data;
}

const loadManProductByIdAsyncSaga = createAsyncSaga(
  loadManProductByIdActionAsync,
  loadManProductByIdAPI
);

function* loadManProductByIdSaga() {
  yield takeLatest(LOAD_MAN_PRODUCT_BY_ID_REQUEST, loadManProductByIdAsyncSaga);
}

async function loadWomanProductByIdAPI(productId: string) {
  const response = await axios.get(
    `/api/product/womanProductById?id=${productId}&type=single`
  );
  return response.data;
}

const loadWomanProductByIdAsyncSaga = createAsyncSaga(
  loadWomanProductByIdActionAsync,
  loadWomanProductByIdAPI
);

function* loadWomanProductByIdSaga() {
  yield takeLatest(
    LOAD_WOMAN_PRODUCT_BY_ID_REQUEST,
    loadWomanProductByIdAsyncSaga
  );
}

async function loadKidProductByIdAPI(productId: string) {
  const response = await axios.get(
    `/api/product/kidProductById?id=${productId}&type=single`
  );
  return response.data;
}

const loadKidProductByIdAsyncSaga = createAsyncSaga(
  loadKidProductByIdActionAsync,
  loadKidProductByIdAPI
);

function* loadKidProductByIdSaga() {
  yield takeLatest(LOAD_KID_PRODUCT_BY_ID_REQUEST, loadKidProductByIdAsyncSaga);
}

export default function* productSaga() {
  yield all([
    fork(fileUploadSaga),
    fork(uploadManProductSaga),
    fork(uploadWomanProductSaga),
    fork(uploadKidProductSaga),
    fork(loadManProductsSaga),
    fork(loadWomanProductsSaga),
    fork(loadKidProductsSaga),
    fork(loadManProductByIdSaga),
    fork(loadWomanProductByIdSaga),
    fork(loadKidProductByIdSaga),
  ]);
}
