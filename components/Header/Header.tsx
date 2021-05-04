import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules/reducers";
import LoggedOutNavBar from "./Sections/LoggedOutNavBar";
import LoggedInNavBar, { StyledBadge } from "./Sections/LoggedInNavBar";
import {
  Toolbar,
  Hidden,
  IconButton,
  Drawer,
  makeStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import DrawerList from "./Sections/DrawerList";
import { createSelector } from "reselect";
import { useRouter } from "next/router";
import {
  HeaderContainer,
  LeftMenuContainer,
  LinkContainer,
  LogoContainer,
  LogoLink,
  OptionsContainer,
  BagContainer,
} from "./HeaderContainer";
import ItemFilter from "./Sections/itemFilter/ItemFilter";
import { price } from "./Sections/itemFilter/priceData";
import {
  loadManProductsActionAsync,
  loadWomanProductsActionAsync,
  loadKidProductsActionAsync,
} from "../../modules";
import CartDrawer from "./Sections/CartDrawer";
export type Filters = {
  size: string[];
  category: number[];
  price: number[];
  [prop: string]: any;
};

const useStyles = makeStyles({
  toolBarContainer: {
    height: "1rem",
    width: "20vw",
    justifyContent: "flex-start",
    padding: 0,
    paddingLeft: "3vw",
  },
});

function Header() {
  const router = useRouter();
  const pathName = router.pathname;
  const classes = useStyles();
  const dispatch = useDispatch();
  const checkUserDataInfo = createSelector(
    (state: RootState) => state.userReducer,
    (userReducer) => userReducer.userInfo
  );
  const userInfo = useSelector(checkUserDataInfo);
  const checkProductDataInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.loadProductsInfo
  );
  const productsInfo = useSelector(checkProductDataInfo);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);
  useEffect(() => {
    if (userInfo.data?.cart?.length > 0) {
      setBadgeCount(userInfo.data?.cart?.length);
    } else {
      setBadgeCount(0);
    }
  }, [userInfo.data?.cart]);
  useEffect(() => {
    if (productsInfo.loading === true) {
      setBackdropOpen(true);
    }
    if (productsInfo.loading === false) {
      setBackdropOpen(false);
    }
  }, [productsInfo.loading]);
  const [filters, setFilters] = useState<Filters>({
    size: [],
    category: [],
    price: [],
  });
  function handleFilters<T>(propedFilters: T[] | T, kind: string) {
    const newFilters = { ...filters };
    newFilters[kind] = propedFilters;
    if (kind === "price") {
      let priceValues = handlePrice(propedFilters);
      newFilters[kind] = priceValues;
    }
    setFilters(newFilters);
    showFilteredResults(newFilters);
  }
  const handlePrice = (value) => {
    const data = price;
    let array: number[] = [];
    for (let key in data) {
      if (data[key].id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const showFilteredResults = (filters: Filters) => {
    const variables = {
      skip: 0,
      filters: filters,
    };
    if (pathName === "/shop/manPage") {
      dispatch(loadManProductsActionAsync.request(variables));
    } else if (pathName === "/shop/womanPage") {
      dispatch(loadWomanProductsActionAsync.request(variables));
    } else if (pathName === "/shop/kidPage") {
      dispatch(loadKidProductsActionAsync.request(variables));
    } else return;
  };
  const upDateSearchTerm = (newValue: string) => {
    const variables = {
      skip: 0,
      limit: "",
      filters: filters,
      searchTerm: newValue,
    };
    if (pathName === "/shop/manPage") {
      dispatch(loadManProductsActionAsync.request(variables));
    } else if (pathName === "/shop/womanPage") {
      dispatch(loadWomanProductsActionAsync.request(variables));
    } else if (pathName === "/shop/kidPage") {
      dispatch(loadKidProductsActionAsync.request(variables));
    } else return;
  };
  const [open, setOpen] = useState(false);
  const showCartDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <HeaderContainer>
        <Hidden mdUp>
          <Toolbar className={classes.toolBarContainer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </Hidden>
        <Hidden smDown implementation="css">
          <LeftMenuContainer>
            <Link href="/contact">
              <LinkContainer>CONTACT</LinkContainer>
            </Link>
            <Link href="/videoBook">
              <LinkContainer>VIDEO BOOK</LinkContainer>
            </Link>
          </LeftMenuContainer>
        </Hidden>
        <LogoContainer>
          <LogoLink>
            <Link href="/">
              <img
                src="/LYH.svg"
                style={{ height: "100%", width: "100%" }}
                alt="LYH_logo"
              />
            </Link>
          </LogoLink>
        </LogoContainer>
        <Hidden smDown implementation="css">
          <OptionsContainer>
            {userInfo?.data?.isAuth ? (
              <LoggedInNavBar
                badgeCount={badgeCount}
                showCartDrawer={showCartDrawer}
                userName={userInfo?.data?.name}
              />
            ) : (
              <LoggedOutNavBar />
            )}
          </OptionsContainer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <DrawerList userInfo={userInfo} />
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation="css">
          {userInfo?.data?.isAuth ? (
            <BagContainer>
              <Link href="/cart">
                <LinkContainer>
                  <StyledBadge
                    badgeContent={badgeCount}
                    color="default"
                    showZero={true}
                  >
                    <img
                      src="/Shopping-bag.svg"
                      style={{ width: 30, height: 30 }}
                      alt="shopping_bag"
                    />
                  </StyledBadge>
                </LinkContainer>
              </Link>
            </BagContainer>
          ) : null}
        </Hidden>
      </HeaderContainer>
      {pathName === "/shop/womanPage" ||
      pathName === "/shop/manPage" ||
      pathName === "/shop/kidPage" ? (
        <ItemFilter
          sizeFilters={(propedSizeFilters: number[]) =>
            handleFilters(propedSizeFilters, "size")
          }
          categoryFilters={(propedCategoryFilters: number[]) =>
            handleFilters(propedCategoryFilters, "category")
          }
          priceFilters={(propedPriceFilters: string) =>
            handleFilters(propedPriceFilters, "price")
          }
          searchValue={upDateSearchTerm}
        />
      ) : null}
      <CartDrawer
        open={open}
        closeCartDrawer={showCartDrawer}
        userCartInfo={userInfo.data?.cart}
      />
      <Backdrop open={backdropOpen} style={{ backgroundColor: "white" }}>
        <CircularProgress style={{ color: "black" }} />
      </Backdrop>
    </>
  );
}

export default Header;
