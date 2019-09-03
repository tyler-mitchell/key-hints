import React from "react";
import { KeyTableContext } from "../../../context/KeyTableContext";
import { AddPhotoAlternateRounded, PhotoRounded } from "@material-ui/icons";
import { Avatar, makeStyles, Popover } from "@material-ui/core";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import FileUploader from "react-firebase-file-uploader";
import { FirebaseContext } from "../../utils/firebase";
import { motion, useAnimation } from "framer-motion";

import {
  usePopupState,
  bindHover,
  bindPopover
} from "material-ui-popup-state/hooks";
import { Paper } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import styled from "styled-components";
import { lighten } from "polished";
import {
  AddRounded as AddIcon,
  DeleteRounded as DeleteIcon
} from "@material-ui/icons";

const AnimatedAvatar = motion.custom(Avatar);
const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    width: 55,
    height: 55,
    color: "#fff",
    userSelect: "none",
    backgroundClip: "content-box",
    padding: "8px",
    overflow: "hidden",
    backgroundColor: theme.palette.primary.main
  },
  img: {
    userSelect: "none",

    pointerEvents: "none",
    overflow: "hidden",
    userDrag: "none",
    position: "relative",
    zIndex: 0,
    borderRadius: "50%"
  },
  avatarProgress: {
    color: theme.palette.action.selected,
    position: "absolute",

    zIndex: 2
  },

  fabRoot: {
    width: 20,
    alignSelf: "baseline",
    marginLeft: 40,
    marginTop: 15,
    // height: 20,
    minHeight: 20,
    maxHeight: 20,
    maxWidth: 20,
    minWidth: 20,
    padding: "3px",
    borderRadius: "50%",
    position: "absolute"
  },
  fabPrimary: {
    color: lighten(0.5, theme.palette.common.white),
    backgroundColor: lighten(0.1, theme.palette.action.selected),
    // backgroundColor: "white",
    "&:hover": {
      backgroundColor: theme.palette.action.selected,

      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}));
const UploadMenuContainer = motion.custom(styled(Fab)`
  /* width: 100px;
  height: 100px; */
  /* top: 0; */
  /* width: 100%; */
  /* left: 5px; */
  /* right: 0; */
`);

const Upload = props => {
  const { setShortcutImage } = props;
  const [uploadState, setUploadState] = React.useState({
    filename: null,
    downloadURL: null,
    isUploading: false,
    image: null,
    previewImage: null,
    uploadProgress: 0,
    file: null
  });
  const { storage } = React.useContext(FirebaseContext);
  const classes = useStyles();
  const fileUploaderRef = React.useRef(null);

  const handleUploadStart = () => {
    console.log(`⭐: fileUploaderRef`, fileUploaderRef.current);
    setUploadState({
      ...uploadState,
      isUploading: true,
      uploadProgress: 0
    });
  };

  const handleProgress = progress => {
    console.log(`⭐: Upload -> progress`, progress);
    setUploadState({
      ...uploadState,
      uploadProgress: progress
    });
  };

  const handleUploadError = error => {
    console.log(`⭐: Upload -> error`, error);
    setUploadState({
      ...uploadState,
      isUploading: false
      // Todo: handle error
    });
  };
  const handleUploadSuccess = async filename => {
    console.log(
      `⭐:handleUploadSuccess: fileUploaderRef.current`,
      fileUploaderRef
    );
    const downloadURL = await storage
      .ref("key-sheet-images")
      .child(filename)
      .getDownloadURL();

    console.log(`⭐: BEFORE TIMEOUT: isUploading`, uploadState.isUploading);

    console.log(`⭐: TIMEOUT: isUploading`, uploadState.isUploading);
    setUploadState({
      filename: filename,
      image: null,
      downloadURL: downloadURL,
      uploadProgress: 100,
      isUploading: false
    });
  };

  const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  const handleUpload = () => {
    const { image } = uploadState;
    const uploadTask = storage.ref(`key-sheet-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("key-sheet-images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };

  const customOnChangeHandler = event => {
    // const {
    //   target: { files }
    // } = event;
    // const [file] = files;

    const reader = new FileReader();
    const file = event.target.files[0];
    console.log(`⭐: PREVIEW EXISTS`, uploadState.previewImage !== null);

    reader.onload = e => {
      console.log(`⭐: PREVIEW IMAGE SET`);
      // setUploadState({ previewImage: e.target.result });
      setShortcutImage(file);
      setUploadState({
        ...uploadState,
        image: file,
        previewImage: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
      // fileUploaderRef.current.startUpload(file);
    }
  };
  const fileInputRef = React.useRef(null);
  const [showUploader, setShowUploader] = React.useState(false);
  const [imgExists, setImgExists] = React.useState(false);
  return (
    <motion.div
      onHoverStart={() => {
        setShowUploader(true);
      }}
      onHoverEnd={() => {
        setShowUploader(false);
      }}
      style={{
        display: "flex"
        // justifyContent: "center"
        // alignItems: "center"
      }}
    >
      {/* <Button onClick={startUploadManually}>Manual Upload</Button> */}
      <UploadMenuContainer
        color="primary"
        component="label"
        classes={{ root: classes.fabRoot, primary: classes.fabPrimary }}
        initial={{ opacity: 0, zIndex: 3, position: "absolute" }}
        animate={
          showUploader ? { opacity: 1, scale: 1 } : { scale: 0, opacity: 0 }
        }
        whileHover={{
          scale: 0.93,
          transition: { yoyo: Infinity, ease: "linear" }
        }}
      >
        {uploadState.isUploading && (
          <CircularProgress size={30} className={classes.avatarProgress} />
        )}

        <AddIcon style={{ fontSize: "18px" }} />
        <input
          accept="image/*"
          type="file"
          name="file-input"
          onChange={customOnChangeHandler}
          hidden
          ref={fileInputRef}
        />
        <FileUploader
          accept="image/*"
          disabled={true}
          hidden
          // as="button"
          name="key-sheet-icon"
          randomizeFilename
          storageRef={storage.ref("key-sheet-images")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
          onChange={customOnChangeHandler}
          ref={fileUploaderRef}
        />
      </UploadMenuContainer>
      {uploadState.previewImage && (
        <UploadMenuContainer
          color="secondary"
          component={"label"}
          classes={{ root: classes.fabRoot, primary: classes.fabPrimary }}
          initial={{
            opacity: 0,

            zIndex: 3,
            position: "absolute"
          }}
          animate={
            showUploader
              ? {
                  opacity: 1,
                  scale: 1,
                  x: 20
                  // top: 0,
                }
              : { scale: 0, opacity: 0 }
          }
          whileHover={{
            scale: 0.93,
            transition: { yoyo: Infinity, ease: "linear" }
          }}
        >
          <DeleteIcon
            style={{ fontSize: "14px" }}
            onClick={e => {
              // e.stopPropagation();

              console.log(`⭐: fileUploaderRef`, fileUploaderRef.current);
              fileInputRef.current.value = "";
              setShortcutImage(null);
              setUploadState({
                ...uploadState,
                image: null,
                // isUploading: false,
                previewImage: null
              });
            }}
          />
        </UploadMenuContainer>
      )}
      <AnimatedAvatar
        src={uploadState.previewImage}
        classes={{ root: classes.avatar, img: classes.img }}
        component="label"
        style={{ marginRight: "10px", position: "relative" }}
        animate={
          uploadState.isUploading ? { padding: "9px" } : { padding: "5px" }
        }
      >
        <PhotoRounded size="small" />
        {/* {uploadState.isUploading && (
          <CircularProgress size={50} className={classes.avatarProgress} />
        )} */}
      </AnimatedAvatar>
    </motion.div>
  );
};

export default Upload;
