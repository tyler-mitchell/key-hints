import { useState, useEffect, useRef } from 'react';

export default targetKey => {
  const [keyPressed, setKeyPressed] = useState(false);

  let prevKey = useRef();

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (prevKey.current === targetKey) return;
      if (key === targetKey) {
        setKeyPressed(true);
        prevKey.current = key;
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
        prevKey.current = '';
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
