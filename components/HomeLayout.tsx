import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "next/link";
import Footer from "./Footer";

function HomeLayout() {
  return (
    <>
      <LandingPageContainer>
        <DirectoryContainer>
          <Link href="/shop/manPage">
            <MenuItemContainer>
              <CardMedia
                className="image"
                style={styles.imageStyle}
                image="/ManCategory.jpg"
                title="Man"
              />
              <ContentContainer>MAN</ContentContainer>
            </MenuItemContainer>
          </Link>
          <Link href="/shop/womanPage">
            <MenuItemContainer>
              <CardMedia
                className="image"
                style={styles.imageStyle}
                image="/WomanCategory.jpg"
                title="Man"
              />
              <ContentContainer>WOMAN</ContentContainer>
            </MenuItemContainer>
          </Link>
          <Link href="/shop/kidPage">
            <MenuItemContainer>
              <CardMedia
                className="image"
                style={styles.imageStyle}
                image="KidCategory.jpg"
                title="Man"
              />
              <ContentContainer>KID</ContentContainer>
            </MenuItemContainer>
          </Link>
        </DirectoryContainer>
        <Footer />
      </LandingPageContainer>
    </>
  );
}

HomeLayout.prototypes = {
  children: PropTypes.node.isRequired,
};

export default HomeLayout;

const styles = {
  imageStyle: {
    height: "100%",
    width: "100%",
    paddingTop: "100%",
    boxSizing: "border-box",
  },
} as const;

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px 30px 60px;
`;

const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    align-items: center;
    display: flex;
    justify-content: center;
    grid-template-columns: 1.5fr;
    grid-gap: 15px;
  }
`;

const MenuItemContainer = styled.div`
  height: 80vh;
  min-width: 30%;
  width: 22vw;
  overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;

  text-decoration: none;
  color: #212529;
  font-size: 1.2em;

  @media screen and (max-width: 800px) {
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }
  &:hover {
    cursor: pointer;
    & .image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    & .content {
      opacity: 0.9;
    }
  }
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
  @media screen and (max-width: 800px) {
    height: 300px;
  }
`;

const ContentContainer = styled.div`
  height: 90px;
  width: 6vw;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
`;
