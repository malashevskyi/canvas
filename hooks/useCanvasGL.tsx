import canvasSketch from 'canvas-sketch'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../store'
import { destroyObjects, resetCanvas } from '../utiles'

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

    if (!state.canvasGL) return null

    let manager
    ;(async () => {
      dispatch(mainActions.unloadCanvasManager())

      manager = await canvasSketch(sketch(), {
        dimensions: [1024, 540],
        animate: true,
        context: 'webgl',
        canvas: state.canvasGL,
      })

      dispatch(mainActions.newCanvasManager(manager))
    })()

    return () => {
      destroyObjects(manager)
      resetCanvas('all')
    }
  }, [state.canvasGL])
}

export default useCanvas
