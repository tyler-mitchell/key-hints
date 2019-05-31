import React from 'react';
import { Button } from "reakit/Button";
import { MemoryContainer } from './MemoryStyles';


const Memory = (props) => (
  <div>
    <MemoryContainer>
      <Button as="div" onClick={() => alert("clicked")}>
        Button
      </Button>
    </MemoryContainer>
  </div>
  
);

export default Memory;
