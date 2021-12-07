import { createContext, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import canvasSketch from 'canvas-sketch'

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useState({
    // canvas2D: document.getElementById('canvas'),
    manager: { unload: () => {} },
    canvas2D: null,
    context2D: null,
    timelines: [],
  })

  useEffect(async () => {
    Object.defineProperty(window, 'timelines', {
      value: [],
      writable: true,
    })
    Object.defineProperty(window, 'managers', {
      value: [],
      writable: true,
    })
    const canvas = document.getElementById('canvas')
    const manager = await canvasSketch(() => {}, { canvas })
    const context = canvas.getContext('2d')
    dispatch({
      ...state,
      manager,
      canvas2D: canvas,
      context2D: context,
    })
  }, [])

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}
