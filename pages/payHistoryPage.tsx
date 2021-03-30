import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Head from "next/head";

const AppContainer = styled.div`
  width: 100vw;
  padding: 4% 10%;
  display: flex;
  justify-content: center;
  height: calc(100vh - 120px);
`;

const columns: GridColDef[] = [
  { field: "상품이름", headerName: "상품이름", width: 200 },
  { field: "가격", headerName: "가격", width: 100 },
  {
    field: "수량",
    headerName: "수량",
    width: 90,
  },
  {
    field: "사이즈",
    headerName: "사이즈",
    width: 90,
  },
  {
    field: "날짜",
    headerName: "날짜",
    width: 200,
  },
];

function payHistoryPage() {
  const router = useRouter();
  const checkUserInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserInfo);

  useEffect(() => {
    if (userInfo.data?.isAuth === false) {
      Swal.fire("로그인을 해주세요", "", "info");
      router.push("/signIn");
    }
  }, []);

  return (
    <>
      <Head>
        <title>LYHShop | 결제내역</title>
      </Head>
      <AppContainer>
        <DataGrid
          rows={userInfo.data?.history.map((items: any, index: number) => {
            return {
              id: index,
              상품이름: items.name,
              가격: items.price,
              수량: items.quantity,
              사이즈: items.size === 1 ? "S" : items.size === 2 ? "M" : "L",
              날짜: items.dateOfPurchase,
            };
          })}
          columns={columns}
          pageSize={10}
        />
      </AppContainer>
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

export default payHistoryPage;
