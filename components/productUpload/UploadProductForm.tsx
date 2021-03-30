import React, { useState, ChangeEvent, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import FileUploadForm from "./FileUploadForm";
import { RootState } from "../../modules/reducers";
import {
  uploadManProductActionAsync,
  uploadWomanProductActionAsync,
  uploadKidProductActionAsync,
} from "../../modules";
import { useRouter } from "next/router";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createSelector } from "reselect";
export type Images = any[];

const useStyles = makeStyles((theme: Theme) => ({
  root: { padding: 0 },
  formControl: {
    minWidth: 120,
    marginRight: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
  },
  sizeContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));
const SizeListContainer = styled.div`
  display: flex;
  align-items: center;
`;

function UploadProductForm(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const writer = props.writer;
  const checkUploadProductInfo = createSelector(
    (state: RootState) => state.productReducer,
    (productReducer) => productReducer.uploadProductInfo
  );
  const uploadProductInfo = useSelector(checkUploadProductInfo);
  const [inputs, setInputs] = useState({
    title: null,
    descriptionTitle: null,
    description: null,
    amountOfS: null,
    amountOfM: null,
    amountOfL: null,
    price: null,
    color: null,
  });
  const [images, setImages] = useState<Images>([]);
  const [category, setCategory] = useState<number | string>("");
  const [section, setSection] = useState("");
  const [sizeValues, setSizeValues] = useState<number[]>([]);
  const {
    title,
    descriptionTitle,
    description,
    price,
    color,
    amountOfS,
    amountOfM,
    amountOfL,
  } = inputs;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const updateImages = (propedImages: Images) => {
    setImages(propedImages);
  };
  const categoryChange = (e: ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as number);
  };
  const sectionChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSection(e.target.value as string);
  };
  const sizeValueChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const parsedValue = parseInt((e.target as HTMLButtonElement).value);
    const currentIndex = sizeValues.indexOf(parsedValue);
    const newSizeValues = [...sizeValues];
    if (currentIndex === -1) {
      newSizeValues.push(parsedValue);
    } else {
      newSizeValues.splice(currentIndex, 1);
    }
    setSizeValues(newSizeValues);
  };
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputs.descriptionTitle ||
      !inputs.description ||
      !inputs.price ||
      !inputs.title ||
      !images.length ||
      !category ||
      !section ||
      !color
    ) {
      Swal.fire(
        "빈칸을 모두 채워야 합니다.",
        "사이즈를 제외한 빈칸과 셀렉터를 모두 입력하세요",
        "error"
      );
      return;
    }
    let body = {
      writer: writer,
      title: title,
      descriptionTitle: descriptionTitle,
      description: description,
      amoutOfS: amountOfS,
      amountOfM: amountOfM,
      amountOfL: amountOfL,
      size: sizeValues,
      price: price,
      color: color,
      images: images,
      category: category,
      section: section,
    };

    if (section === "man") {
      dispatch(uploadManProductActionAsync.request(body));
    }
    if (section === "woman") {
      dispatch(uploadWomanProductActionAsync.request(body));
    }
    if (section === "kid") {
      dispatch(uploadKidProductActionAsync.request(body));
    }
  };
  useEffect(() => {
    if (uploadProductInfo?.data?.upLoadProductSuccess === true) {
      Swal.fire("상품 업로드를 완료했습니다.", "", "success");
      router.push("/");
    }
  }, [uploadProductInfo?.data?.upLoadProductSuccess]);
  console.log(sizeValues, inputs.amountOfS);
  return (
    <Container className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload Product
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FileUploadForm refreshImages={updateImages} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="text"
                value={title}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="descriptionTitle"
                label="descriptionTitle"
                id="descriptionTitle"
                autoComplete="text"
                value={descriptionTitle}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="text"
                value={description}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="price"
                id="price"
                autoComplete="transaction-amount"
                value={price}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="color"
                label="color"
                id="color"
                autoComplete="transaction-amount"
                value={color}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.sizeContainer}>
              <SizeListContainer>
                <FormControlLabel
                  value="1"
                  control={
                    <Checkbox
                      color="default"
                      className={classes.root}
                      onClick={sizeValueChange}
                    />
                  }
                  label="S"
                  labelPlacement="top"
                />
                <TextField
                  variant="outlined"
                  required
                  name="amountOfS"
                  label="piece(재고량)"
                  id="amountOfS"
                  autoComplete="transaction-amount"
                  value={amountOfS}
                  onChange={onChange}
                />
              </SizeListContainer>
              <SizeListContainer>
                <FormControlLabel
                  value="2"
                  control={
                    <Checkbox
                      color="default"
                      className={classes.root}
                      onClick={sizeValueChange}
                    />
                  }
                  label="M"
                  labelPlacement="top"
                />
                <TextField
                  variant="outlined"
                  required
                  name="amountOfM"
                  label="piece(재고량)"
                  id="amountOfM"
                  autoComplete="transaction-amount"
                  value={amountOfM}
                  onChange={onChange}
                />
              </SizeListContainer>
              <SizeListContainer>
                <FormControlLabel
                  value="3"
                  control={
                    <Checkbox
                      color="default"
                      className={classes.root}
                      onClick={sizeValueChange}
                    />
                  }
                  label="L"
                  labelPlacement="top"
                />
                <TextField
                  variant="outlined"
                  required
                  name="amountOfL"
                  label="piece(재고량)"
                  id="amountOfL"
                  autoComplete="transaction-amount"
                  value={amountOfL}
                  onChange={onChange}
                />
              </SizeListContainer>
            </Grid>
            <Grid item xs={12} justify="flex-start">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={categoryChange}
                  label="category"
                  name="category"
                >
                  <MenuItem value={1}>Top</MenuItem>
                  <MenuItem value={2}>Bottom</MenuItem>
                  <MenuItem value={3}>Shoes</MenuItem>
                  <MenuItem value={4}>ACC</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={section}
                  onChange={sectionChange}
                  label="section"
                >
                  <MenuItem value={"man"}>MAN</MenuItem>
                  <MenuItem value={"woman"}>WOMAN</MenuItem>
                  <MenuItem value={"kid"}>KID</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            REGISTER
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default UploadProductForm;
