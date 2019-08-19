import React from 'react';
const ConditionalWrap = ({ condition, wrap, children }) => {
  return condition ? wrap(children) : <>{children}</>;
};

export default ConditionalWrap;
