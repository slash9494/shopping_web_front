import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "react-image-gallery/styles/css/image-gallery.css";
import styled from "styled-components";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    descriptionTitle: {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.1rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
      },
    },
    description: {
      fontSize: 14,
    },
    descriptionContainer: {
      width: "25vw",
      border: "transparent",
      boxShadow: "none",
      backgroundColor: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("md")]: {
        top: "94vh",
        width: "96vw",
      },
    },
  })
);

const DescriptionContainer = styled.div`
  width: 25vw;
  border: transparent;
  box-shadow: none;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1025px) {
    top: 94vh;
    width: 96vw;
  }
`;

interface DescriptionProps {
  description?: string;
  descriptionTitle?: string;
}

function Description(props: DescriptionProps) {
  const classes = useStyles();
  return (
    <DescriptionContainer>
      <Typography
        className={classes.descriptionTitle}
        variant="h5"
        align="center"
      >
        {props.descriptionTitle}
      </Typography>
      <Typography
        className={classes.description}
        color="textSecondary"
        gutterBottom
        align="center"
      >
        {props.description}
      </Typography>
    </DescriptionContainer>
  );
}

export default Description;
