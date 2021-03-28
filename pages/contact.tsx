import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import { Divider, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      border: "1px solid darkgray",
    },
    divider: {
      backgroundColor: "black",
      height: "350px",
      margin: 0,
    },
  })
);

const AppContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 10%;
  width: 100%;
  height: calc(100vh - 120px);
  margin: 0;
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const SectionContainer = styled.div`
  width: 45%;
`;

const DividerContainer = styled.div`
  width: 10%;
  justify-content: center;
  display: flex;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const DetailContainer = styled.div`
  padding-left: 40px;
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

function contact() {
  const classes = useStyles();
  return (
    <AppContainer>
      <BlockContainer>
        <SectionContainer>
          <Avatar alt="LYH" src="/LYH.png" className={classes.avatar} />
        </SectionContainer>
        <DividerContainer>
          <Divider
            orientation="vertical"
            variant="inset"
            className={classes.divider}
          />
        </DividerContainer>
        <SectionContainer>
          <DetailContainer>
            <Typography variant="h3" style={{ paddingBottom: "20px" }}>
              LEE YUN HYEON
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: "5px" }}>
              slash9494@naver.com
            </Typography>
            <Typography variant="h5">
              <a href="https://github.com/slash9494" style={{ color: "black" }}>
                <GitHubIcon />
              </a>
            </Typography>
          </DetailContainer>
        </SectionContainer>
      </BlockContainer>
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

export default contact;
