// React
import React from "react";
import "./App.css";

import { useStyles } from "./components/design-system/styles";
import { KeySheet } from "./components/KeySheet/KeySheet";
import { useWindowDimensions } from "./components/hooks/useLockScroll";
// Local
import Keyboard from "./components/Keyboard";

// utility for constructing className strings conditionally.
import clsx from "clsx";

// Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Content } from "mui-layout";
import { AnimatedPanel } from "./components/KeySheet/NewKeyPanel/AnimatedPanel";
import { NewKeyPanel } from "./components/KeySheet/NewKeyPanel/NewKeyPanel";
import { Box } from "@material-ui/core";
import KeyMapLayersPanel from "./components/KeySheet/KeyMapLayersPanel";
function Dashboard() {
  // useLockBodyScroll();
  const { height, width } = useWindowDimensions();
  return (
    <Content
      style={{
        // height: "100vh",

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
        <Box mt={10} zIndex={3}>
          <Keyboard />
        </Box>
        <Box display="inline-block" zIndex={2} position="relative">
          <KeyMapLayersPanel />
        </Box>

        <Box mt={3} zIndex={1} width="100%" display="inline-block">
          <KeySheet vh={height - 595} category="All Keys" />
        </Box>
      </Box>
    </Content>
  );
}

export default Dashboard;
