import { Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { motion } from "framer-motion";

import { makeStyles } from "@material-ui/styles";
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
  /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); */
  /* background: linear-gradient(
    45deg,
    rgb(234, 235, 236) 30%,
    rgba(250, 250, 250, 1) 90%
  ); */
  background: white;
  width: 20px;
  height: 20px;
  margin: 3px;
  position: relative;
  /* border-radius: ${({ borderRadius }) => borderRadius}; */
  border-radius: 50%;
  /* padding: 0px ${({ paddingX }) => paddingX}px; */

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  /* filter: drop-shadow(0px 1px 1px black); */
  /* border-width: 2px;
  border-color: black;
  border-style: solid; */
  /* box-shadow: inset 0 0px 10px 1px rgba(242, 242, 243, 0.72),
    0 3px 5px 2px rgba(156, 156, 156, 0.3), 0 1px 2px 1px rgba(43, 43, 43, 0.59); */
`;

StyledActionButton.defaultProps = {
  // paddingX: 0
};
