import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'
import Circle from './Circle'

const sketch = ({ context, height, width }) => {
  let startAngle = 0

  const opt = {
    count: 15,
    offset: 4,
    radius: 140,
    waveOffset: 30,
  }
  const circles = []

  function getCircles() {
    for (let i = opt.count; i > 0; i--) {
      circles.push(
        new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: (i * opt.waveOffset * Math.PI) / 180,
          index: i,
        })
      )
    }
  }
  getCircles()

  return {
    render(updatedProps) {
      ;({ height, width } = updatedProps)

      startAngle += 1

      context.clearRect(0, 0, width, height)

      circles.forEach((circle, i) => {
        // circle.color = `hsl(${(i * 5 + time * 10) % 250 + 110}, 50%, 50%)`
        circle.draw(startAngle, width, height)
      })
    },
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
