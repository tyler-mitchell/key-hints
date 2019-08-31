// React
import React from "react";
import "./App.css";

import { useStyles } from "./components/design-system/styles";
import { KeySheet } from "./components/KeySheet/KeySheet";
import useLockBodyScroll from "./components/hooks/useLockScroll";
// Local
import Keyboard from "./components/Keyboard";

// utility for constructing className strings conditionally.
import clsx from "clsx";

// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Content } from "mui-layout";
import { Box } from "@material-ui/core";
function Dashboard() {
  useLockBodyScroll();
  const style = useStyles();

  return (
    <Content
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* ⭐ MAIN APP */}

      {/* <Container maxWidth="lg" className={style.container}> */}
      <Box
        display="inline-flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box mt={10}>
          <Keyboard />
        </Box>

        <Box mt={3} width="100%" display="inline-block">
          <KeySheet category="All Keys" />
        </Box>
      </Box>
      {/* </Container> */}
    </Content>
  );
}

export default Dashboard;
