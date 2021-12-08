import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'

const sketch = ({ context, width, height }) => {
  let tick = 0.3999
  let tickC = 0.0000001

  return ({ width, height }) => {
    const radius = Math.max(width, height)

    context.fillStyle = 'hsla(0, 0%, 0%, 1)'
    context.fillRect(0, 0, width, height)
    context.translate(width / 2, height / 2)

    for (let i = 0; i < 3000; i++) {
      context.fillStyle = 'yellow'
      context.beginPath()
      context.rect(
        Math.cos(i) * Math.sin((i / 2) * Math.sin(tick)) * radius,
        Math.sin(i) * Math.sin((i / 2) * Math.sin(tick)) * radius,
        2,
        2
      )
      context.fill()
    }

    tick += tickC
    if (tick > 0.4 || tick < 0.3999) {
      tickC = -tickC
    }
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useEffect(() => {
    resetCanvas()

    const settings = {
      canvas: state.canvas2D,
      animate: true,
    }

    let manager
    ;(async () => {
      state.manager.unload()

      manager = await canvasSketch(sketch, settings)

      dispatch({ ...state, manager })
    })()

    return () => {
      destroyObjects(manager)
    }
  }, [])

  return ''
}

export default Canvas
