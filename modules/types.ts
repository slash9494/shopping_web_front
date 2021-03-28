import { AsyncState } from "./utils/reducerUtil";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;

// User Types //
export interface LoginInfo {
  loginSuccess: boolean | null;
  userId: string | null;
  message: null | string;
}

export interface SignUpInfo {
  signUpSuccess: boolean | null;
  message: string | null;
}

export interface LogOutInfo {
  logOutSuccess: boolean | null;
}

export interface CartProductInfo {
  title: string;
  price: number;
  color: string;
  size: Array<number>;
  _id: string;
  description: string;
  descriptionTitle: string;
  images: Array<string>;
  section: string;
}

export interface CartInfo {
  addToCartSuccess: boolean | null;
  id: number;
  quantity: number;
  date: Date;
  productInfo: CartProductInfo;
}

export interface UserInfo {
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  role: null | number;
  cart: null | Array<CartInfo>;
  history: null | Array<any>;
}

export interface UserState {
  loginInfo?: AsyncState<LoginInfo, Error>;
  signUpInfo?: AsyncState<SignUpInfo, Error>;
  logOutInfo?: AsyncState<LogOutInfo, Error>;
  userInfo?: AsyncState<UserInfo, Error>;
}

// Product Types //

export interface FileUploadInfo {
  fileUploadSuccess: boolean | null;
  filePath: string[] | null;
  fillName: string[] | null;
}

export interface UploadProductInfo {
  upLoadProductSuccess: boolean;
}

export interface ProductsInfo {
  id: number;
  writer: String;
  title: String;
  price: Number;
  images: ImageData[];
  category: Number;
  size: Number[];
  sold: Number;
}

export interface LoadProductsInfo {
  productsInfo: ProductsInfo;
  getProductsSuccess: boolean;
  postSize: number;
}

export interface ProductByIdInfo {
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
  category: Number;
  sold: Number;
  views: Number;
  _id: string;
}

export interface LoadProductByIdInfo {
  productByIdInfo: ProductByIdInfo;
}

export interface ProductState {
  fileUploadInfo?: AsyncState<FileUploadInfo, Error>;
  uploadProductInfo?: AsyncState<UploadProductInfo, Error>;
  loadProductsInfo?: AsyncState<LoadProductsInfo, Error>;
  loadProductByIdInfo?: AsyncState<LoadProductByIdInfo, Error>;
}
