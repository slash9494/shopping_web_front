import React from "react";
import {
  Drawer,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  closeCartDrawer: any;
  userCartInfo: Array<any>;
}

const CartDrawerContainer = styled.div`
  @media screen and (min-width: 1600px) {
    width: 500px;
  }
  @media screen and (max-width: 1600px) and (min-width: 1300px) {
    width: 400px;
  }
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  width: 250px;
  @media screen and (min-width: 1600px) {
    width: 500px;
  }
  @media screen and (max-width: 1600px) and (min-width: 1300px) {
    width: 400px;
  }
  height: 100px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: white;
  top: 90%;
`;

const Button = styled.div`
  background: black;
  color: white;
  cursor: pointer;
  font-size: 15px;
  height: 30px;
  width: 100%;
  &:hover {
    background: #495057;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  padding: 10% 20%;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: theme.spacing(2),
      display: "flex",
      maxWidth: "100%",
      border: "transparent",
      boxShadow: "none",
      height: "15vw",
      maxHeight: "300px",
    },
    cardContent: {
      width: "50%",
    },
    gridContainer: {
      height: "100%",
    },
    text: {
      [theme.breakpoints.down("lg")]: {
        fontSize: "1vw",
      },
    },
  })
);

function CartDrawer(props: CartDrawerProps) {
  const classes = useStyles();
  return (
    <Drawer
      open={props.open}
      anchor="right"
      variant="persistent"
      onMouseLeave={props.closeCartDrawer}
      transitionDuration={600}
    >
      <CartDrawerContainer>
        <Grid container direction="column" className={classes.gridContainer}>
          {props.userCartInfo?.length > 0 &&
            props.userCartInfo?.map((item: any) => {
              return (
                <>
                  <Grid item className={classes.item}>
                    <ImageContainer>
                      <Img
                        src={`http://localhost:5000/${item.productInfo.image}`}
                      />
                    </ImageContainer>
                    <CardContent className={classes.cardContent}>
                      <Typography align="left">
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold" }}
                          className={classes.text}
                        >
                          {" "}
                          {item.productInfo.title}
                        </Typography>
                        <Typography className={classes.text}>
                          {item.productInfo.price}원
                        </Typography>

                        <Typography className={classes.text}>
                          {item.productInfo.size === 1
                            ? "S"
                            : item.productInfo.size === 2
                            ? "M"
                            : "L"}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.text}
                        >
                          {item.quantity}개
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Divider variant="middle" />
                </>
              );
            })}
        </Grid>
      </CartDrawerContainer>
      <Footer>
        <Link href="/cart">
          <Button>장바구니로 가기</Button>
        </Link>
      </Footer>
    </Drawer>
  );
}

export default CartDrawer;
