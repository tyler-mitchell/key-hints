import React from "react";
import { AnimatedKeyContainer } from "./Key.styles";

const MainKey = props => {
  const { setAct } = props;
  return (
    <AnimatedKeyContainer
      // active={active}
      margin={margin}
      style={{
        background,
        borderTopColor,
        borderBottomColor,
        borderLeftColor,
        borderRightColor
      }}
      label={label}
      wt={wt}
      ht={ht}
      onClick={keyClicked}
    >
      <KeyTop
        color={defaultColor}
        wt={wt}
        ht={ht}
        style={{
          background
          // backgroundClip: 'content-box',
        }}
      >
        {/* <KeyChar ref={keyTopTextRef}>Basic Editing the view port</KeyChar> */}

        {(keyMapMode || addMode) && (
          <div
            ref={keyTopTextRef}
            style={{
              // color: x.interpolate(x=>`rgba(0, 0, 0, ${x})`),
              height: ht * 0.7 * 0.95,
              width: (wt - 17) * 0.95,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontFamily: "Karla, sans-serif"
            }}
          >
            {keyMapMode && <KeyText keyTopText={keyTopText} />}
          </div>
        )}

        {/* {(!keyMapMode) && <KeyChar>{keyName in iconLabels ? iconLabels[keyName] : label}</KeyChar>} */}
      </KeyTop>
      {((setActive.value && !isModifier) || !keyMapMode) && (
        <BottomKeyChar>
          {keyName in iconLabels ? iconLabels[keyName] : label}
        </BottomKeyChar>
      )}
    </AnimatedKeyContainer>
  );
};

export default Component;
