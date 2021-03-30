import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileUploadActionAsync } from "../../modules";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "../../modules/reducers";
import Swal from "sweetalert2";
import classes from "*.module.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

type ImagesState = any[];

type FileUploadProps = {
  refreshImages: Function;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      color: "black",
    },
  })
);

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const DropzoneContainer = styled.div`
  width: 350px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DroppedImageContainer = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;
  @media (max-width: 768px) {
    width: 100%;
    border: 1px solid lightgray;
    scrollbar-width: 3px;
  }
`;

const DroppedImage = styled.img`
  min-width: 100%;
  height: 100%;
  cursor: pointer;
`;

function FileUploadForm(props: FileUploadProps) {
  const classes = useStyles();
  const [Images, setImages] = useState<ImagesState>([]);
  const dispatch = useDispatch();
  const { fileUploadInfo } = useSelector(
    (state: RootState) => state.productReducer
  );
  const onDrop = (files: File[]) => {
    let formData = new FormData();
    const config = {
      data: { header: { "content-type": "multipart/form-data" } },
    };
    formData.append("file", files[0]);

    dispatch(fileUploadActionAsync.request({ formData, config }));
  };
  const PropImages = useCallback(() => {
    props.refreshImages([...Images, fileUploadInfo?.data?.filePath]);
  }, [fileUploadInfo?.data?.filePath, props]);

  useEffect(() => {
    if (fileUploadInfo?.data?.fileUploadSuccess === true) {
      setImages([...Images, fileUploadInfo.data.filePath]);
      PropImages();
    } else if (fileUploadInfo?.data?.fileUploadSuccess === false) {
      Swal.fire(
        " 파일을 업로드하는데 실패했습니다.",
        "png,jpg파일로 업로드해주세요",
        "error"
      );
    } else return;
  }, [
    // props.refreshImages,
    fileUploadInfo?.data?.filePath,
    fileUploadInfo?.data?.fileUploadSuccess,
  ]);
  const onDelete = (image: ImageData) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshImages(newImages);
  };

  return (
    <BlockContainer>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {fileUploadInfo.loading === true ? (
                <CircularProgress
                  className={classes.progress}
                  style={{ position: "absolute" }}
                />
              ) : null}
              <AddPhotoAlternateIcon fontSize="large" />
            </DropzoneContainer>
          </section>
        )}
      </Dropzone>
      <DroppedImageContainer>
        {Images.map((image, index) => (
          <DroppedImage
            src={`${image}`}
            alt={`productImg-${index}`}
            key={index}
            onClick={() => {
              onDelete(image);
            }}
          />
        ))}
      </DroppedImageContainer>
    </BlockContainer>
  );
}

export default FileUploadForm;
