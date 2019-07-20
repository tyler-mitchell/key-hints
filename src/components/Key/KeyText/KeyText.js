/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { motion, useCycle, useMotionValue } from 'framer-motion';
import { useMeasure } from '../../hooks/helpers';
import { Grid } from '@material-ui/core';
import { Textfit } from 'react-textfit';
import { useGlobalState } from '../../../state';

const KeyText = ({ keyTopHeight, testText, keyTopWidth, keyTopText, children }) => {
  const [bind, { height: textHeight, width: textWidth }] = useMeasure();
  const [scale, setScale] = React.useState(1);
  const [text, setText] = React.useState(null);
  const [overflow, setOverflow] = React.useState(false);
  const [fontFamily] = useGlobalState('currentFont');
  return (
    
      <Textfit
        style={{
          display: 'flex',
          // width: '90%',
          // height: '90%',
          width: 'inherit',
          height: 'inherit',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          overflow: 'hidden',
          fontFamily: 'Karla, sans-serif'
        }}
        min={10}
        max={18}
        mode="multi"
      >
        <div
          style={{
            display: '-webkit-box',

            // width: 'inherit',

            // height: 'inherit',

            // margin: '1px 1px',
            textAlign: 'center',
            lineHeight: '1',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical',

            // overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {keyTopText}
        </div>
      </Textfit>
 
  );
};

export default KeyText;
