import React, { useEffect, useState } from "react";
import wrapper, { IStore } from "../store/configureStore";
import axios from "axios";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import ReactPlayer from "react-player";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

gsap.registerPlugin(ScrollTrigger);

const AppContainer = styled.div`
  width: 100vw;
  & .videoSection {
    @media screen and (max-width: 1300px) {
      align-items: center;
    }
  }
`;

const TitleConTextContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1546213290-e1b492ab3eee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80")
    no-repeat center;
  background-size: cover;
`;

const VideoStoreContainer = styled.div`
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1300px) {
    width: 100%;
    height: 40%;
  }
`;

const VideoManContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;

const ContextContainer = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  @media screen and (max-width: 1300px) {
    position: static;
    width: 100%;
    height: 100%;
  }
`;

const BlockContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  & #video2 {
    position: absolute;
    overflow: hidden;
    @media screen and (max-width: 1300px) {
      position: static;
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fade: {
      width: "100%",
      height: "100%",
      position: "fixed",
      [theme.breakpoints.down("md")]: {
        height: "10%",
        position: "static",
      },
    },
    manVideoText: {
      justifyContent: "center",
      display: "flex",
      position: "absolute",
      color: "white",
      width: "30vw",
      paddingLeft: "2vw",
      paddingRight: "2vw",
      [theme.breakpoints.down("lg")]: {
        paddingRight: 0,
      },
      [theme.breakpoints.down("md")]: {
        position: "static",
        padding: "20px",
        width: "100vw",
      },
    },
    textSize: {
      fontSize: "1.2vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "2vw",
      },
    },
  })
);

function videoBook() {
  const classes = useStyles();
  const [ImgSize, setImgSize] = useState(false);
  const manImgFullSize = "100vh";
  const manImgSmSize = "90vh";
  useEffect(() => {
    if (window.innerWidth < 1300) {
      setImgSize(true);
    }
    if (window.innerWidth > 1300) {
      const animationStoreOptions = {
        scrollTrigger: {
          trigger: "#videoSection",
          start: "center center",
          end: () => "+=" + 2400,

          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      };

      const StoreTimeLine = gsap.timeline(animationStoreOptions);
      StoreTimeLine.fromTo(
        "#video2",
        { xPercent: +200, x: 0 },
        { xPercent: +100, x: 0 }
      );
    }
  }, []);
  return (
    <>
      <Head>
        <title>LYHShop | 컬랙션</title>
      </Head>
      <AppContainer id="App">
        <Fade duration={2000}>
          <TitleConTextContainer>
            <Fade duration={2000} delay={800}>
              <Typography
                variant="h4"
                style={{
                  paddingBottom: "10px",
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: "100px",
                  fontSize: "2vw",
                }}
              >
                "지속 가능한 오프라인 매장을 설계하고 있습니다"
              </Typography>
            </Fade>
          </TitleConTextContainer>
        </Fade>
        <BlockContainer id="videoSection" className="videoSection">
          <VideoStoreContainer id="video1">
            <ReactPlayer
              url="https://player.vimeo.com/video/383980330?title=0&portrait=0&byline=0&autoplay=1&loop=1"
              loop={true}
              playing={true}
              width="100%"
              height="100%"
            />
          </VideoStoreContainer>
          <Fade className={classes.fade}>
            <ContextContainer>
              <Typography
                variant="h4"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  fontSize: "1.7vw",
                }}
              >
                "매장에서 다채로운 환경을 즐겨보세요"
              </Typography>
              <Typography
                variant="h6"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  fontSize: "1.2vw",
                }}
              >
                최고 수준의 환경 효율적인 매장을 운영할 수 있도록 노력하고
                있습니다.
              </Typography>
            </ContextContainer>
          </Fade>
          <VideoStoreContainer id="video2">
            <ReactPlayer
              url="https://player.vimeo.com/video/142621176?title=0&portrait=0&byline=0&autoplay=1&loop=1"
              loop={true}
              playing={true}
              width="100%"
              height="100%"
            />
          </VideoStoreContainer>
        </BlockContainer>
        <BlockContainer
          style={{ backgroundColor: "black", height: "100%" }}
          id="videoSection2"
        >
          <VideoManContainer id="videoMan">
            <Fade className={classes.manVideoText}>
              <Typography variant="h6" className={classes.textSize}>
                "오가닉 코튼과 같이 더욱 지속 가능한 방법으로 <br />
                생산된 소재 사용을 통해 편한함을 느낄 수 있습니다."
              </Typography>
            </Fade>
            <ReactPlayer
              url="https://player.vimeo.com/video/372194764?title=0&portrait=0&byline=0&autoplay=1"
              loop={true}
              playing={true}
              width="100vw"
              height={ImgSize ? manImgSmSize : manImgFullSize}
            />
          </VideoManContainer>
          <VideoManContainer id="videoMan2">
            <Fade className={classes.manVideoText} style={{ right: 0 }}>
              <Typography variant="h6" className={classes.textSize}>
                "다양한 악세사리와 함께 내추럴 스타일을 추구합니다."
              </Typography>
            </Fade>
            <ReactPlayer
              url="https://player.vimeo.com/video/517759687?title=0&portrait=0&byline=0&autoplay=1"
              loop={true}
              playing={true}
              width="100vw"
              height={ImgSize ? manImgSmSize : manImgFullSize}
            />
          </VideoManContainer>
        </BlockContainer>
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

export default videoBook;
