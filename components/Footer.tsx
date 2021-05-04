import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
const useStyles = makeStyles({
  root: {
    margin: 0,
  },
});

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 40px;
  justify-content: center;
  padding: 10px;
`;

function Footer() {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.root}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          LYH&nbsp;
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}

export default Footer;
