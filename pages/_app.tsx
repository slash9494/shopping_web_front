import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import wrapper from "../store/configureStore";
import type { AppProps /*, AppContext */ } from "next/app";
import Header from "../components/Header/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../index.scss";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans Condensed",sans-serif',
  },
  palette: {
    primary: { main: "#000000" },
  },
});
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const LYH = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/LYH_Icon.png" />
      <title>LYHShop</title>
    </Head>

    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </MuiThemeProvider>
  </>
);

LYH.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(LYH);
