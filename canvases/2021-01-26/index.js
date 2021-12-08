import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import { destroyObjects, resetCanvas } from '../../utiles'
import Square from './Square'

const sketch = ({ context, height, width }) => {
  const points = []
  let tick = 0

  for (let y = 0; y < 200; y += 5) {
    for (let x = 0; x < 200; x += 5) {
      points.push([x, y])
    }
  }

  context.clearRect(0, 0, width, height)

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.translate(width / 2 - 200, height / 2 - 200)
    context.scale(2, 2)

    if (tick > points.length - 1) {
      const square = new Square({ context, xy: points[tick % points.length] })
      square.render(true)
      if (tick > points.length * 2) tick = -1
    } else {
      const square = new Square({ context, xy: points[tick] })
      square.render()
    }

    tick += 1
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useEffect(() => {
    resetCanvas()

    if (!state.canvas2D) return

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
  }, [state.canvas2D])

  return ''
}
export default Canvas
