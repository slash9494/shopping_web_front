import React, { useState, ChangeEvent, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
interface Props {
  searchValue: (value: string) => void;
}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        width: "25ch",
        marginBottom: "15px",
      },
    },
  })
);
function SearchProduct(props: Props) {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value);
      props.searchValue(e.currentTarget.value);
    },
    [props.searchValue, input]
  );

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="검색"
        onChange={onChange}
        value={input}
      />
    </form>
  );
}

export default SearchProduct;
