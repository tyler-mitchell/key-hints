/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { motion, useCycle, useMotionValue } from 'framer-motion';
import { useMeasure } from '../../hooks/helpers';
import { Grid } from '@material-ui/core';
import { Textfit } from 'react-textfit';

const KeyText = ({ keyTopHeight, testText, keyTopWidth }) => {
  const [bind, { height: textHeight, width: textWidth }] = useMeasure();
  const [scale, setScale] = React.useState(1);
  const [text, setText] = React.useState(null);
  const [overflow, setOverflow] = React.useState(false);

  return (
    <Textfit
      style={{
        display: 'flex',
        width: 'inherit',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'inherit',
        margin: '0 auto',
        overflow: 'hidden',
        
      }}
      min={10}
      max={20}
      mode="multi"
    >
      <div style={{
        display: '-webkit-box',

        // width: 'inherit',

        // height: 'inherit',
        // margin: '0 auto',
        textAlign: 'center',
        lineHeight: '1',
        WebkitLineClamp: '5',
        WebkitBoxOrient: 'vertical',

        // overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{testText}</div>
    </Textfit>
  );
};

export default KeyText;
