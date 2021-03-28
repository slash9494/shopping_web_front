import React, { FormEvent } from "react";
import { Divider, List } from "@material-ui/core";
import LoggedOutNavBar from "./LoggedOutNavBar";
import { Container } from "./LoggedInNavBar";
import { LinkContainer } from "../HeaderContainer";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logOutActionAsync } from "../../../modules";

function DrawerList(props: any) {
  const dispatch = useDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logOutActionAsync.request());
  };
  return (
    <div>
      <List>
        {!props.userInfo?.data?.isAuth ? (
          <LoggedOutNavBar />
        ) : (
          <div>
            <Link href="/payHistoryPage">
              <LinkContainer>결제내역</LinkContainer>
            </Link>
            <Link href="/upLoadProduct">
              <LinkContainer>업로드</LinkContainer>
            </Link>
            <form onSubmit={onSubmit}>
              <Button
                type="submit"
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  paddingLeft: "0.8vw",
                }}
              >
                로그아웃
              </Button>
            </form>
          </div>
        )}
        <Divider />
        <Container>
          <Link href="/contact">
            <LinkContainer style={{ width: "100%" }}>CONTACT</LinkContainer>
          </Link>
          <Link href="/videoBook">
            <LinkContainer>VIDEO BOOK</LinkContainer>
          </Link>
        </Container>
      </List>
    </div>
  );
}

export default DrawerList;
