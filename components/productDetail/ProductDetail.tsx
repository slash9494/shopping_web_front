import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "react-image-gallery/styles/css/image-gallery.css";
import Popover from "@material-ui/core/Popover";
import HelpIcon from "@material-ui/icons/Help";
import Description from "./Description";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART_REQUEST, CartProductInfo } from "../../modules";
import Swal from "sweetalert2";
import { createSelector } from "reselect";
import { RootState } from "../../modules/reducers";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
interface ProductDetailProps {
  cartProductInfo: CartProductInfo;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: 12,
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    divider: {
      backgroundColor: "black",
    },
    formControl: {
      margin: "5px 0px 16px 16px",
      minWidth: 120,
    },
  })
);
const ProductDetailContainer = styled.div`
  width: 25vw;
  padding: 0 1.5vw;
  @media screen and (max-width: 1280px) {
    /* width: 14vw; */
    padding: 0;
  }
  @media screen and (max-width: 1025px) {
    width: 75vw;
    padding: 18px;
  }
  @media screen and (max-width: 600px) {
    width: 75vw;
    padding: 0;
    z-index: 5;
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 0px;
  font-size: 12px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 10px;
  height: 24px;
  width: 100%;
  &:hover {
    background: #495057;
  }
`;
const PopOverButton = styled.button`
  background: transparent;
  color: black;
  outline: none;
  border: none;
  border-radius: 0px;
  font-size: 9px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  @media screen and (min-width: 1025px) {
    display: none;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  position: "relative";
`;

function ProductDetail(props: ProductDetailProps) {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const checkUpUserInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUpUserInfo);
  const [size, setSize] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const PopOverOpen = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as number);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const snackBarHandleClose = () => {
    setSnackBarOpen(false);
  };
  const touchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const touchClose = () => {
    setAnchorEl(null);
  };
  const handleAddToCart = () => {
    const productId = props.cartProductInfo._id;
    const cartProductInfo = {
      title: props.cartProductInfo.title,
      size: size,
      price: props.cartProductInfo.price,
      image: props.cartProductInfo.images[0],
      section: props.cartProductInfo.section,
      color: props.cartProductInfo.color,
      _id: props.cartProductInfo._id,
    };
    if (size === "") {
      Swal.fire("사이즈를 선택해주세요", "", "info");
      return;
    } else if (userInfo.data?.isAuth === false) {
      Swal.fire("로그인을 해주세요", "", "info");
      router.push("/signIn");
      return;
    } else {
      dispatch({
        type: ADD_TO_CART_REQUEST,
        id: productId,
        cartProductInfo: cartProductInfo,
        size: size,
      });
    }
  };
  useEffect(() => {
    if (userInfo.data?.cart?.addToCartSuccess === true) {
      setSnackBarOpen(true);
    }
  }, [userInfo.data?.cart?.addToCartSuccess]);

  return (
    <ProductDetailContainer>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          {props.cartProductInfo?.title} &nbsp;
          <PopOverButton onClick={touchOpen}>
            <HelpIcon fontSize="small" />
            자세히 알아보기
          </PopOverButton>
          <Popover
            id={popOverId}
            open={PopOverOpen}
            anchorEl={anchorEl}
            onClose={touchClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Description
              description={props.cartProductInfo?.description}
              descriptionTitle={props.cartProductInfo?.descriptionTitle}
            />
          </Popover>
        </Typography>
        <Typography variant="body2">
          {props.cartProductInfo?.price} 원
          <br />
          색상: {props.cartProductInfo?.color}
        </Typography>
      </CardContent>
      <Divider classes={{ root: classes.divider }} />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">사이즈</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={size}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>사이즈 선택</em>
          </MenuItem>
          {props.cartProductInfo?.size?.find((values) => values === 1) ? (
            <MenuItem value={1}>S</MenuItem>
          ) : null}
          {props.cartProductInfo?.size?.find((values) => values === 2) ? (
            <MenuItem value={2}>M</MenuItem>
          ) : null}
          {props.cartProductInfo?.size?.find((values) => values === 3) ? (
            <MenuItem value={3}>L</MenuItem>
          ) : null}
        </Select>
      </FormControl>

      <Divider classes={{ root: classes.divider }} />
      <Button type="submit" onClick={handleAddToCart}>
        장바구니
      </Button>
      {userInfo.loading === true ? (
        <ProgressContainer>
          <CircularProgress style={{ position: "absolute", color: "black" }} />
        </ProgressContainer>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackBarOpen}
        onClose={snackBarHandleClose}
        message="장바구니에 담겼습니다."
        key={"bottom" + "right"}
      />
    </ProductDetailContainer>
  );
}

export default ProductDetail;
