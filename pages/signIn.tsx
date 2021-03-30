import React, { useEffect } from "react";
import { authCheckActionAsync } from "../modules/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducers";
import Swal from "sweetalert2";
import { createSelector } from "reselect";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import LoginForm from "../components/LoginForm";
import Head from "next/head";

function SignIn(props: any) {
  const { loginInfo } = useSelector((state: RootState) => state.userReducer);
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);

  const router = useRouter();
  useEffect(() => {
    if (loginInfo?.data?.loginSuccess === true) {
      router.replace("/");
    }
    if (loginInfo?.data?.loginSuccess === false) {
      const message = loginInfo.data.message;
      Swal.fire(`${message}`, "", "error");
    }
  }, [loginInfo?.data?.loginSuccess, loginInfo?.data?.message, props.history]);
  useEffect(() => {
    if (userInfo?.data?.isAuth) {
      Swal.fire("이미 로그인이 되어있습니다.", "", "info");
      router.replace("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>LYHShop | 로그인</title>
      </Head>
      <LoginForm />;
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

export default SignIn;
