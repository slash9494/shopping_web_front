import React, { FormEvent, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
  Button,
  Badge,
  Menu,
} from "@material-ui/core";
import { logOutActionAsync } from "../../../modules";
import Link from "next/link";
interface LogInNavBarProps {
  badgeCount: number;
  showCartDrawer: any;
  userName: string;
}

function LoggedInNavBar(props: LogInNavBarProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logOutActionAsync.request());
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  return (
    <Container>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        className="classes.button"
      >
        <div style={{ fontSize: "16px" }}>{props.userName}</div>
      </Button>
      <Menu
        id="userMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href="/payHistoryPage">
          <LinkContainer>결제내역</LinkContainer>
        </Link>
        <Link href="/upLoadProduct">
          <LinkContainer>상품등록</LinkContainer>
        </Link>
        <form
          onSubmit={onSubmit}
          style={{ paddingLeft: "8px", fontWeight: "bold" }}
        >
          <Button type="submit" className={classes.button}>
            로그아웃
          </Button>
        </form>
      </Menu>
      <BagContainer>
        <StyledBadge
          badgeContent={props.badgeCount}
          color="default"
          showZero={true}
          className="badge"
          onMouseOver={props.showCartDrawer}
        >
          <img
            src="/Shopping-bag.svg"
            style={{ width: 40, height: 40 }}
            alt="shopping-bag"
          />
        </StyledBadge>
      </BagContainer>
    </Container>
  );
}

export default LoggedInNavBar;
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 956px) {
    flex-direction: column;
  }
`;

const LinkContainer = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  color: black;
`;
const BagContainer = styled.div`
  padding: 10px 15px;
  font-size: 1rem;
  text-decoration: none;
  color: black;
  @media screen and (max-width: 956px) {
    display: none;
  }
`;
const useStyles = makeStyles({
  button: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  drawer: {
    zIndex: 10,
    position: "fixed",
  },
});
export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 21,
      top: 25,
      fontSize: 15,
      [theme.breakpoints.down("sm")]: {
        top: 20,
        right: 16,
        fontSize: 14,
      },
    },
  })
)(Badge);
