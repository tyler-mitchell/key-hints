import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { ErrorRounded as ErrorIcon } from '@material-ui/icons';
import { CheckCircleRounded as CheckIcon } from '@material-ui/icons';
export const KeySequenceStatus = ({ isKeyAvailable, isEmpty }) => {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={isEmpty ? { opacity: 0 } : { opacity: 1 }}
      animte={{}}
    >
      <AnimatePresence>
        {isKeyAvailable && !isEmpty ? (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              top: '23px',

              right: '23px',

              fontSmooth: 'always',

              background: 'white',
              border: '3px solid white',
              // boxShadow: 'inset 0px 0px 2px 5px #209CEE',
              borderRadius: '100%',
              display: 'flex'
            }}
            exit={{ scale: 0 }}
          >
            <CheckIcon
              fontSize="medium"
              style={{
                display: 'inline-block',

                color: '#4be8bc'
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ scale: 0 }}
            transition={{ delay: 0.3 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              position: 'absolute',
              top: '23px',

              right: '23px',

              fontSmooth: 'always',

              background: 'white',
              border: '3px solid white',
              // boxShadow: 'inset 0px 0px 2px 5px #209CEE',
              borderRadius: '100%',
              display: 'flex'
            }}
          >
            <ErrorIcon fontSize="medium" style={{ color: '#FC7575' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
