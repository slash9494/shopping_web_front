import React from "react";
import styled from "styled-components";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducers";
import { createSelector } from "reselect";
import {
  loadManProductsActionAsync,
  authCheckActionAsync,
} from "../../modules";
import wrapper, { IStore } from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
function manPage() {
  const classes = useStyles();
  const checkUploadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductsInfo
  );
  const loadProductsInfo = useSelector(checkUploadProductInfo);
  return (
    <AppContainer className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={3}
        className={classes.gridContainer}
      >
        {loadProductsInfo?.data?.productsInfo?.map((item: any) => {
          return (
            <Grid item xs={6} sm={6} md={3} xl={3} className={classes.item}>
              <Link href={`/shop/detailview/manProduct/${item._id}`}>
                <CardMedia
                  className={classes.media}
                  image={`${item.images[0]}`}
                />
              </Link>
              <CardContent className={classes.cardContent}>
                <Typography align="left" className={classes.cartText}>
                  <div style={{ cursor: "hover" }}> {item.title} </div>
                  <div>{Math.floor(item.price)}원</div>
                </Typography>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
    </AppContainer>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    let body = {
      skip: 0,
      limit: 16,
    };
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(loadManProductsActionAsync.request(body));
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);
export default manPage;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    item: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: 600,
      maxWidth: "280px",
      border: "transparent",
      boxShadow: "none",
      paddingTop: "90px !important",
      [theme.breakpoints.down("xs")]: {
        height: 290,
        paddingTop: "30px !important",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "400px",
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: "600px",
        height: "1000px",
      },
    },
    media: {
      paddingTop: "130%",
      cursor: "pointer",
    },
    cardContent: {
      padding: 0,
      paddingTop: 6,
    },
    cartText: {
      fontSize: "1em",
      fontStyle: "black",
    },
    gridContainer: {
      [theme.breakpoints.down("xs")]: {
        padding: "90px 0 0 0",
      },
    },
  })
);

const AppContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px 10px 60px;
  margin: 0;
`;
