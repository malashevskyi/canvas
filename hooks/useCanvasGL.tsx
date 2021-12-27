import canvasSketch from 'canvas-sketch'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../store'
import { resetCanvas } from '../utiles'

type UseCanvasType = {
  sketch: () => void
  settings?: {}
  type?: string
}

const useCanvas = ({ sketch }: UseCanvasType) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    resetCanvas('webgl')

    if (!state.root.canvasGL) return null

    let manager
    ;(async () => {
      dispatch(mainActions.unloadCanvasManager())

      manager = await canvasSketch(sketch(), {
        dimensions: [1024, 512],
        animate: true,
        context: 'webgl',
        canvas: state.root.canvasGL,
      })

      dispatch(mainActions.newCanvasManager(manager))
    })()

    return () => {
      dispatch(mainActions.unloadCanvasManager())
      dispatch(mainActions.destroyTimelines())
      resetCanvas('all')
    }
  }, [state.root.canvasGL])
}

export default useCanvas
