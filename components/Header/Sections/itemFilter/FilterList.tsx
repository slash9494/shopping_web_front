import React, { useState, useCallback } from "react";
import {
  makeStyles,
  IconButton,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { price } from "./priceData";
import StyledCheckBox from "./StyledCheckBox";
import StyledRadioBox from "./StyledRadioBox";
interface Props {
  onClose: () => void;
  handleSizeFilters: (value: number[]) => void;
  handleCategoryFilters: (value: number[]) => void;
  handlePriceFilters: (value: string) => void;
}

function FilterList(props: Props) {
  const classes = useStyles();
  const [sizeChecked, setSizeChecked] = useState<number[]>([]);
  const [categoryChecked, setCategoryChecked] = useState<number[]>([]);
  const handleSizeChecked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const parsedValue = parseInt((e.target as HTMLButtonElement).value);
      const currentIndex = sizeChecked.indexOf(parsedValue);
      const newChecked = [...sizeChecked];
      if (currentIndex === -1) {
        newChecked.push(parsedValue);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setSizeChecked(newChecked);
      props.handleSizeFilters(newChecked);
    },
    [sizeChecked, props.handleSizeFilters]
  );
  const handleCategoryChecked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const parsedValue = parseInt((e.target as HTMLButtonElement).value);
      const currentIndex = categoryChecked.indexOf(parsedValue);
      const newChecked = [...categoryChecked];
      if (currentIndex === -1) {
        newChecked.push(parsedValue);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setCategoryChecked(newChecked);
      props.handleCategoryFilters(newChecked);
    },
    [categoryChecked, props.handleCategoryFilters]
  );
  const handlePriceChecked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.handlePriceFilters((e.target as HTMLButtonElement).value);
    },
    [props.handlePriceFilters]
  );

  return (
    <Container>
      <ButtonContainer>
        <IconButton onClick={props.onClose}>
          <CloseIcon className={classes.button} />
        </IconButton>
      </ButtonContainer>
      <ListContainer>
        <ListItemsContainer>
          <h2>사이즈</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="S"
            value="1"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="M"
            value="2"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleSizeChecked} />}
            label="L"
            value="3"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>아이템</h2>
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Top"
            value="1"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Bottom"
            value="2"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Shoes"
            value="3"
          />
          <FormControlLabel
            className={classes.itemContainer}
            control={<StyledCheckBox onClick={handleCategoryChecked} />}
            label="Acc"
            value="4"
          />
        </ListItemsContainer>
        <ListItemsContainer>
          <h2>가격</h2>
          <RadioGroup>
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~30,000"
              value={`${price[1].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~50,000"
              value={`${price[2].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~80,000"
              value={`${price[3].id}`}
            />
            <FormControlLabel
              className={classes.itemContainer}
              control={<StyledRadioBox onClick={handlePriceChecked} />}
              label="~100,000"
              value={`${price[4].id}`}
            />
          </RadioGroup>
        </ListItemsContainer>
      </ListContainer>
    </Container>
  );
}

export default FilterList;
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: 16,
    height: 16,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#000000",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#868e96",
    },
  },
  itemContainer: {
    width: "100%",
    justifyContent: "space-between",
    margin: 0,
    flexDirection: "row-reverse",
  },
  button: {
    color: "black",
  },
});
const Container = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    width: 40vw;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListContainer = styled.div``;

const ListItemsContainer = styled.div`
  padding: 30px;
`;
