import canvasSketch from 'canvas-sketch'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/globalContext'
import { destroyObjects, resetCanvas } from '../utiles'

type UseCanvasType = {
  sketch: () => void
  settings?: {}
}

const useCanvas = ({ sketch, settings }: UseCanvasType) => {
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    resetCanvas()

    if (!state.canvas2D) return null

    let manager
    ;(async () => {
      state.manager.unload()

      manager = await canvasSketch(
        sketch(),
        settings || {
          canvas: state.canvas2D,
          animate: true,
        }
      )

      dispatch({ ...state, manager })
    })()

    return () => {
      destroyObjects(manager)
    }
  }, [state.canvas2D])
}

export default useCanvas
