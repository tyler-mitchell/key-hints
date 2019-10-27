import React from "react";

import {
  ChromeLogo,
  FigmaLogo,
  Windows10Logo,
  SketchLogo,
  VSCodeLogo
} from "../../assets";
import { motion } from "framer-motion";
import {
  Divider,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  IconButton,
  useTheme
} from "@material-ui/core";

import { KeyTableContext } from "../../context/KeyTableContext";
import { SheetData } from "../KeySheet/SheetData";

import {
  Folder as FolderIcon,
  Delete as DeleteIcon,
  MoreVertRounded as EditIcon
} from "@material-ui/icons";

import { clearKeySelection, setGlobalState, useGlobalState } from "../../state";

const AnimatedMenuItem = motion.custom(MenuItem);
export const SheetList = () => {
  const [selectedIndex, setSelectedIndex] = useGlobalState("selectedKeySheet");
  const { userKTC, setDocIndex, docIndex, deleteKeySheet } = React.useContext(
    KeyTableContext
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const bg1 = theme.palette.secondary.main;
  const bg2 = theme.palette.secondary.secondary;
  function handleListItemClick(event, index) {
    clearKeySelection();
    setSelectedIndex(index);
    setDocIndex(index);

    setGlobalState("mode", null);
  }

  function handleDeleteClick(index) {
    deleteKeySheet(index);
  }
  const handleOptionsClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  // const [sheetNames, setSheetNames] = useGlobalState('sheetNames')

  return (
    <>
      <List>
        <ListItem button>
          <ListItemIcon>
            <VSCodeLogo />
          </ListItemIcon>
          <ListItemText>VS Code</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChromeLogo />
          </ListItemIcon>
          <ListItemText>Chrome</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Windows10Logo />
          </ListItemIcon>
          <ListItemText>Windows 10</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FigmaLogo />
          </ListItemIcon>
          <ListItemText>Figma</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SketchLogo />
          </ListItemIcon>
          <ListItemText>Sketch</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        {userKTC &&
          userKTC.docs.map((doc, index) => {
            setGlobalState("sheetNames", o => ({ ...o, [doc.id]: index }));

            return (
              <>
                <ListItem
                  button
                  key={doc.id}
                  onClick={e => handleListItemClick(e, index)}
                  selected={selectedIndex === index}
                  style={{ borderRadius: "0px 20px 20px 0px" }}
                >
                  <ListItemIcon>
                    <FolderIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={doc.id} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      size="small"
                      onClick={handleOptionsClick}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleOptionsClose}
                  style={{
                    marginLeft: "30px",

                    padding: 0,

                    overflow: "hidden"
                  }}
                  MenuListProps={{
                    style: {
                      padding: 0
                    }
                  }}
                  PaperProps={{
                    elevation: 0,
                    style: {
                      borderRadius: "30px",
                      padding: "5px",
                      background: theme.palette.secondary.main,

                      margin: 0
                    }
                  }}
                >
                  <AnimatedMenuItem
                    dense
                    initial={{ color: "white", opacity: 1 }}
                    whileHover={{
                      backgroundColor: "red"
                    }}
                    style={{
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      borderRadius: "30px",
                      padding: "1px",
                      maxHeight: "30px",
                      fontWeight: 700,
                      fontSize: "14px",
                      margin: 0
                    }}
                    onClick={() => handleDeleteClick(index)}
                  >
                    <DeleteIcon
                      fontSize="small"
                      // style={{ marginRight: "2px", color: "white" }}
                    />
                    Delete
                  </AnimatedMenuItem>
                </Menu>
              </>
            );
          })}
      </List>
    </>
  );
};
