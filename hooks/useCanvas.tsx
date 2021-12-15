import canvasSketch from 'canvas-sketch'
import { useEffect } from 'react'
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
    resetCanvas()

    if (!state.root.canvas2D) return null

    let manager
    ;(async () => {
      dispatch(mainActions.unloadCanvasManager())

      manager = await canvasSketch(sketch(), {
        canvas: state.root.canvas2D,
        animate: true,
      })

      dispatch(mainActions.newCanvasManager(manager))
    })()

    return () => {
      dispatch(mainActions.unloadCanvasManager())
      dispatch(mainActions.destroyTimelines())
    }
  }, [state.root.canvas2D])
}

export default useCanvas
