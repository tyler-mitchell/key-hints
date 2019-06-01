import styled from "styled-components";
import { zIndex, position, top, right, bottom, left } from 'styled-system';
import { Box, Flex } from '@rebass/grid';
import { makeStyles } from '@material-ui/styles';
import { tint, shade, linearGradient, lighten } from 'polished';


export const Row = styled(Flex)`
  margin: -4px;
  ${zIndex};
  ${position};
`;

Row.defaultProps = {
  position: 'relative'
};


export const useKeyboardStyle = makeStyles({
  root: {
    background: '#f9f9f9',

    boxShadow: `0 2px  2px 2px  rgba(0, 0, 0, .1),
    0 1px  6px  rgba(0, 0, 0, .05),
    0 8px  8px  rgba(0, 0, 0, .1),
    0 16px 16px rgba(0, 0, 0, .1),
    8px 32px 32px rgba(0, 0, 0, .15),
    8px 64px 64px rgba(0, 0, 0, .15)`,

    padding: '10px',
    borderRadius: '20px',
    borderStyle: 'solid',
    borderTopColor: `${shade(0.02, '#f9f9f9')}`,
    borderBottomColor: `${shade(0.33, '#f9f9f9')}`,
    borderLeftColor: `${shade(0.09, '#f9f9f9')}`,
    borderRightColor: `${shade(0.2, '#f9f9f9')}`,
  },

  frame: {
    color: 'black',
    background: `${shade(0.7, '#f9f9f9')}`,
    width: '100%',
    padding: '4px',
    borderRadius: '10px',
    boxShadow: '0 0 0 4px hsl(0, 0%, 60%), 0 0 0 5px hsl(0, 0%, 90%), 0 0 0 3px hsl(0, 0%, 80%);'
  },
  key: {

    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    opacity: '0',
    transition: '.5s ease',
    backgroundColor: 'rgba(259, 67, 95, 0.7)',
    overflow: 'hidden',
  }
});
export default {Row, useKeyboardStyle};