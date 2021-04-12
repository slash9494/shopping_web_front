import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducers";
import { authCheckActionAsync } from "../modules";
import { createSelector } from "reselect";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import UploadProductForm from "../components/productUpload/UploadProductForm";
import Head from "next/head";
function UploadForm() {
  const router = useRouter();
  const checkAuthInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkAuthInfo);
  useEffect(() => {
    if (!userInfo?.data?.isAuth) {
      Swal.fire(
        "로그인이 필요합니다.",
        "로그인 또는 회원가입을 해주세요",
        "info"
      );
      router.replace("/signIn");
    }
  }, [userInfo?.data]);
  return (
    <>
      <Head>
        <title>LYHShop | 상품등록</title>
      </Head>
      {userInfo.data ? <UploadProductForm writer={userInfo.data._id} /> : null}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);
export default UploadForm;
