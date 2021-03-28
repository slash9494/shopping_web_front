import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  height: 30px;
  position: absolute;
  justify-content: center;
`;

function Footer() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
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
    </div>
  );
}

export default Footer;
