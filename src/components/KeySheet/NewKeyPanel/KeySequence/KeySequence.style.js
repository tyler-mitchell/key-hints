import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

const TextActionButton = styled(motion.div)``;
export const useSequenceStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    // padding: '1rem',
    // left: 10,

    top: 10,
    left: 0,
    right: 0,
    width: '90%',
    height: '80px',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    justifyContent: 'flex-end',

    padding: '10px 10px',

    borderRadius: '5px',

    alignItems: 'center'
    // borderRadius: 0
  },
  buttonGroup: {
    borderRadius: '13px'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 38,
    margin: 6
  },
  chip: { button: { marginRight: '15px' } },
  KeyLabelButton: {
    position: 'absolute',
    right: '32px',
    top: '2px',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0,0,0)',
    maxWidth: '15px',
    maxHeight: '15px',
    minWidth: '15px',
    minHeight: '15px',
    zIndex: 2
    // top: 0,
    // right: 0
  },
  KeyLabelButtonIcon: {
    fontSize: '12px',
    backfaceVisibility: 'hidden',
    transform: 'translate3d(0,0,0)',
    maxWidth: '15px',
    maxHeight: '15px',
    minWidth: '15px',
    minHeight: '15px'

    // top: 0,
    // right: 0
  },
  popper: {
    zIndex: 1000,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.common.white} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`
      }
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  },
  paper: {
    maxWidth: 400,
    overflow: 'hidden'
  },
  menuItem: {
    boxSizing: 'content-box',
    height: 5,
    padding: 0,
    margin: 0
  }
}));
