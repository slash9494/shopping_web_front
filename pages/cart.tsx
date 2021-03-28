import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  authCheckActionAsync,
  REMOVE_CART_ITEM_REQUEST,
  BUY_PRODUCTS_REQUEST,
} from "../modules";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      display: "flex",
      height: "55vw",
      [theme.breakpoints.up("sm")]: {
        height: "33vw",
      },
      [theme.breakpoints.up("md")]: {
        height: "18vw",
      },
    },
    divider: {
      marginTop: "3vw",
    },
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
      [(theme.breakpoints.down("md"), theme.breakpoints.up("sm"))]: {
        fontSize: "2vw",
      },
      [(theme.breakpoints.down("xl"), theme.breakpoints.up("md"))]: {
        fontSize: "1.1vw",
      },
    },
    deleteIcon: {
      fontSize: "1.25vw",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4vw",
      },
      [(theme.breakpoints.down("md"), theme.breakpoints.up("sm"))]: {
        fontSize: "2vw",
      },
      [(theme.breakpoints.down("xl"), theme.breakpoints.up("md"))]: {
        fontSize: "1.2vw",
      },
    },
  })
);

const Img = styled.img`
  width: 50%;
  height: 100%;
  cursor: pointer;
`;

const AppContainer = styled.div`
  width: 100vw;
  padding: 5vw 10vw;
  padding-top: 5vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const PayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1542790292-fdfbc3d343a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
    no-repeat top;
  padding-top: 50px;
`;

export interface UserCartInfo {
  id: string;
  quantity: number;
  date: number;
}

function cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const checkUserInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserInfo);
  const calculateTotal = () => {
    let priceArray: number[] = [];
    if (userInfo.data?.cart?.length > 0) {
      userInfo?.data?.cart.map((items: any) => {
        priceArray.push(items.productInfo.price * items.quantity);
      });
    }
    const reducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue;
    const priceTotal = priceArray.reduce(reducer, 0);
    setTotal(priceTotal);
  };

  const handleRemoveItem = (id: string, size: number) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST, id: id, size: size });
  };
  const handleImgClick = (section: string, id: string) => {
    if (section === "man") {
      return router.push(`/shop/detailview/manProduct/${id}`);
    } else if (section === "woman") {
      return router.push(`/shop/detailview/womanProduct/${id}`);
    } else {
      return router.push(`/shop/detailview/kidProduct/${id}`);
    }
  };
  const onApprove = (
    data: any,
    actions: { order: { capture: () => Promise<any> } }
  ) => {
    return actions.order
      .capture()
      .then(function (details: { payer: any }) {
        dispatch({
          type: BUY_PRODUCTS_REQUEST,
          cartInfo: userInfo.data?.cart,
          paymentData: details,
        });
      })
      .catch((err: any) => alert(`결제하는데 실패했습니다. : ${err}`));
  };
  useEffect(() => {
    if (!userInfo?.data?.isAuth) {
      Swal.fire("로그인을 해주세요", "", "info");
      router.push("/signIn");
    }
  }, [userInfo?.data]);
  useEffect(() => {
    calculateTotal();
  }, [userInfo?.data?.cart]);
  useEffect(() => {
    if (userInfo?.data?.cart?.productBuySuccess === true) {
      Swal.fire({
        title: "결제를 완료했습니다.",
        icon: "success",
        html: '<a href="/payHistoryPage"><b>결제내역 조회하기</b></a> ',
      });
    }
  }, [userInfo?.data?.cart?.productBuySuccess]);

  return (
    <AppContainer>
      {userInfo.data?.cart?.length > 0 ? <h2>장바구니</h2> : null}
      <Grid container spacing={2}>
        {userInfo.data?.cart?.length > 0 ? (
          userInfo?.data?.cart.map((items: any) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                xl={3}
                lg={3}
                className={classes.itemContainer}
              >
                <Img
                  src={`http://localhost:5000/${items.productInfo.image}`}
                  onClick={() =>
                    handleImgClick(items.productInfo.section, items.id)
                  }
                />
                <ItemDetailContainer>
                  <Typography variant="h6" className={classes.text}>
                    {items.productInfo.title}
                  </Typography>
                  <Typography className={classes.text}>
                    {items.productInfo.color}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.text}>
                    {items.productInfo.price}원
                  </Typography>
                  <Typography className={classes.text}>
                    {items.productInfo.size === 1
                      ? "S"
                      : items.productInfo.size === 2
                      ? "M"
                      : "L"}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.text}>
                    {items.quantity}개
                  </Typography>
                  <div>
                    <DeleteIcon
                      className={classes.deleteIcon}
                      onClick={() =>
                        handleRemoveItem(
                          items.productInfo._id,
                          items.productInfo.size
                        )
                      }
                    />
                  </div>
                </ItemDetailContainer>
              </Grid>
            );
          })
        ) : (
          <EmptyContainer>
            <Typography variant="h6">- 장바구니가 비어있습니다 -</Typography>
          </EmptyContainer>
        )}
        {userInfo.data?.cart?.length > 0 ? (
          <PayContainer>
            <h2>총 {total}원</h2>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AQtOFFRJSeihOZQZ4_cJP67f_2b5ZEoDO9B97g3sMjXs_XhgUie3P0vXXn4rDB6zKT3BvOdDatVDjMVY",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "horizontal",
                  color: "black",
                  tagline: false,
                  height: 35,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${total}`,
                        },
                      },
                    ],
                  });
                }}
                onApprove={onApprove}
              />
            </PayPalScriptProvider>
          </PayContainer>
        ) : null}
      </Grid>
    </AppContainer>
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

export default cart;
