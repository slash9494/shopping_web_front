import React, { useEffect } from "react";
import { authCheckActionAsync } from "../modules";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducers/index";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { createSelector } from "reselect";
import SignUpForm from "../components/SignUpForm";
import Head from "next/head";

function SignUp() {
  const { signUpInfo } = useSelector((state: RootState) => state.userReducer);
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);
  const router = useRouter();
  useEffect(() => {
    if (signUpInfo?.data?.signUpSuccess === true) {
      Swal.fire("회원가입을 완료했습니다.", "", "success");
      router.replace("/");
    }
    if (signUpInfo?.data?.signUpSuccess === false) {
      Swal.fire(
        "회원가입하는데 실패했습니다.",
        signUpInfo?.data?.message,
        "error"
      );
    }
  }, [signUpInfo?.data?.signUpSuccess]);
  useEffect(() => {
    if (userInfo?.data?.isAuth) {
      Swal.fire("이미 로그인이 되어있습니다.", "", "info");
      router.replace("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>LYHShop | 회원가입</title>
      </Head>
      <SignUpForm />
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

export default SignUp;
