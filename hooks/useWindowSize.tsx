import { useState, useEffect } from 'react'

type Size = {
  width: number | undefined
  height: number | undefined
}

function useWindowSize({ width, height } = { width: 1920, height: 950 }): Size {
  const [windowSize, setWindowSize] = useState({
    width,
    height,
  })

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
