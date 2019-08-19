import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { makeStyles } from '@material-ui/styles';
// export const StyledActionButton = withStyles({
//   root: {
//     boxShadow: 'none',
//     textTransform: 'none',

//     // backgroundColor: '#007bff',
//     borderColor: '#007bff',

//     '&:hover': {
//       backgroundColor: '#0069d9',
//       borderColor: '#0062cc'
//     },
//     '&:active': {
//       boxShadow: 'none',
//       backgroundColor: '#0062cc',
//       borderColor: '#005cbf'
//     },
//     '&:focus': {
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
//     }
//   },
//   label: {
//     // background: 'black'
//   }
// })(Button);

export const StyledActionButton = styled(motion.div)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  width: 25px;
  height: 25px;
  position: relative;
  border-radius: 50%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
