import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Grid,
  Divider,
  Typography,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  authCheckActionAsync,
  REMOVE_CART_ITEM_REQUEST,
  BUY_PRODUCTS_REQUEST,
  CartInfo,
} from "../modules";
import { createSelector } from "reselect";
import { RootState } from "../modules/reducers";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Head from "next/head";
import PayPal from "../components/utils/PayPal";
import Footer from "../components/Footer";
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
      userInfo?.data?.cart.map((item: CartInfo) => {
        priceArray.push(item.productInfo?.price * item.quantity);
      });
    }
    const reducer = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    const priceTotal = priceArray.reduce(reducer, 0);
    setTotal(priceTotal);
  };

  const handleRemoveItem = (id: string, size: number) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST, id: id, size: size });
  };
  const handleImgClick = (section: string, id: number) => {
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
      .then(function (details: { payer: string }) {
        dispatch({
          type: BUY_PRODUCTS_REQUEST,
          cartInfo: userInfo.data?.cart,
          paymentData: details,
        });
      })
      .catch((err: Error) => alert(`??????????????? ??????????????????. : ${err}`));
  };

  useEffect(() => {
    if (!userInfo?.data?.isAuth) {
      Swal.fire("???????????? ????????????", "", "info");
      router.push("/signIn");
    }
  }, [userInfo?.data]);
  useEffect(() => {
    calculateTotal();
  }, [userInfo?.data?.cart]);
  useEffect(() => {
    if (userInfo?.data?.cart?.productBuySuccess === true) {
      Swal.fire({
        title: "????????? ??????????????????.",
        icon: "success",
        html: '<a href="/payHistoryPage"><b>???????????? ????????????</b></a> ',
      });
    }
  }, [userInfo?.data?.cart?.productBuySuccess]);

  return (
    <>
      <Head>
        <title>LYHShop | ????????????</title>
      </Head>
      <AppContainer>
        {userInfo.data?.cart?.length > 0 ? <h2>????????????</h2> : null}
        <Grid container spacing={2} style={{ height: "100%" }}>
          {userInfo.data?.cart?.length > 0 ? (
            userInfo?.data?.cart.map((item: CartInfo) => {
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
                    src={`${item.productInfo?.image}`}
                    onClick={() =>
                      handleImgClick(item.productInfo?.section, item.id)
                    }
                  />
                  <ItemDetailContainer>
                    <div className="section">
                      <Typography variant="h6" className={classes.text}>
                        {item.productInfo?.title}
                      </Typography>
                      <Typography className={classes.text}>
                        {item.productInfo?.color}
                      </Typography>
                    </div>
                    <div className="section">
                      <Divider />
                      <Typography className={classes.text}>
                        {item.productInfo?.price}???
                      </Typography>
                      <Typography className={classes.text}>
                        {item.productInfo?.size === 1
                          ? "S"
                          : item.productInfo?.size === 2
                          ? "M"
                          : "L"}
                      </Typography>
                    </div>
                    <Divider />
                    <Typography className={classes.text}>
                      {item.quantity}???
                    </Typography>
                    <div>
                      <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={() =>
                          handleRemoveItem(
                            item.productInfo?._id,
                            item.productInfo?.size
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
              <Typography variant="h6">- ??????????????? ?????????????????? -</Typography>
            </EmptyContainer>
          )}
          {userInfo.data?.cart?.length > 0 ? (
            <PayContainer>
              <h2>??? {total}???</h2>
              <PayPal total={total} onApporve={onApprove} />
            </PayContainer>
          ) : null}
        </Grid>
        {userInfo.loading === true ? (
          <Backdrop open={true} style={{ backgroundColor: "white", zIndex: 1 }}>
            <CircularProgress style={{ color: "black" }} />
          </Backdrop>
        ) : null}
      </AppContainer>
      <Footer />
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

export default cart;

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
  height: calc(100vh - 130px);
  overflow: scroll;
`;
const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  .section {
    padding-bottom: 3vw;
    height: 40%;
  }
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
