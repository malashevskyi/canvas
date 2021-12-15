import canvasSketch from 'canvas-sketch'
import { useEffect } from 'react'
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
    resetCanvas()

    if (!state.canvas2D) return null

    let manager
    ;(async () => {
      // state.manager.unload()
      dispatch(mainActions.unloadCanvasManager())

      manager = await canvasSketch(sketch(), {
        canvas: state.canvas2D,
        animate: true,
      })

      dispatch(mainActions.newCanvasManager(manager))
    })()

    return () => {
      destroyObjects(manager)
    }
  }, [state.canvas2D])
}

export default useCanvas
