import { useState, useEffect } from 'react';

function useWindowSize(initial) {
  const [windowSize, setWindowSize] = useState({
    width: initial ? initial.width : undefined,
    height: initial ? initial.height : undefined,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

export default useWindowSize;
