import canvasSketch from 'canvas-sketch'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/globalContext'
import { destroyObjects, resetCanvas } from '../utiles'

type UseCanvasType = {
  sketch: () => void
  settings?: {}
  type?: string
}

const useCanvas = ({ sketch }: UseCanvasType) => {
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    resetCanvas('webgl')

    if (!state.canvasGL) return null

    let manager
    ;(async () => {
      state.manager.unload()

      manager = await canvasSketch(sketch(), {
        dimensions: [1024, 540],
        animate: true,
        context: 'webgl',
        canvas: state.canvasGL,
      })

      dispatch({ ...state, manager })
    })()

    return () => {
      destroyObjects(manager)
      resetCanvas('all')
    }
  }, [state.canvasGL])
}

export default useCanvas
