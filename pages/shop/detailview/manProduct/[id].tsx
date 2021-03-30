import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Description from "../../../../components/productDetail/Description";
import ProductDetail from "../../../../components/productDetail/ProductDetail";
import { useSelector } from "react-redux";
import {
  authCheckActionAsync,
  loadManProductByIdActionAsync,
} from "../../../../modules";
import { createSelector } from "reselect";
import { RootState } from "../../../../modules/reducers";
import wrapper, { IStore } from "../../../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
  padding: 0 5vw;
  position: "absolute";
  @media screen and (max-width: 1280px) {
    padding: 0 2vw;
  }
  @media screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 40vw;
  padding: 20px 40px 40px 40px;
  height: 86vh;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  @media screen and (max-width: 769px) {
    width: 96vw;
  }
  @media screen and (max-width: 600px) {
    height: 50vh;
    padding: 20px;
  }
`;

const DescriptionContainer = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

function DetailProduct() {
  const [showThumbNail, setShowThumbNail] = useState(true);
  const [imageState, setImageState] = useState<any>([]);
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      return setShowThumbNail(false);
    }
  }, []);
  const checkLoadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductByIdInfo
  );
  const loadProductByIdInfo = useSelector(checkLoadProductInfo);
  useEffect(() => {
    if (loadProductByIdInfo?.data?.productInfo[0]?.images.length > 0) {
      const images = loadProductByIdInfo?.data?.productInfo[0]?.images;
      const imagesArray = images?.map((image: any) => {
        return {
          original: `${image}`,
          thumbnail: `${image}`,
        };
      });
      setImageState(imagesArray);
    }
  }, [loadProductByIdInfo?.data?.productInfo[0]]);

  return (
    <AppContainer>
      <DescriptionContainer>
        <Description
          description={loadProductByIdInfo?.data?.productInfo[0]?.description}
          descriptionTitle={
            loadProductByIdInfo?.data?.productInfo[0]?.descriptionTitle
          }
        />
      </DescriptionContainer>
      <ImageContainer>
        <ImageGallery
          items={imageState}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={showThumbNail}
          thumbnailPosition="right"
        />
      </ImageContainer>
      <ProductDetail
        cartProductInfo={loadProductByIdInfo?.data?.productInfo[0]}
      />
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
    context.store.dispatch(
      loadManProductByIdActionAsync.request(context.params?.id)
    );
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);
export default DetailProduct;
