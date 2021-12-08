import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'
import Circle from './Circle'

const sketch = ({ context, height, width, time }) => {
  let startAngle = 0
  let widthHalf, heightHalf

  const opt = {
    count: 15,
    offset: 30,
    radius: 200,
    waveOffset: 100,
  }
  const circles = []

  function getCircles() {
    for (let i = opt.count; i > 0; i--) {
      circles.push(
        new Circle({
          context,
          radius: opt.radius + opt.offset * i,
          offsetAngle: (i * opt.waveOffset * Math.PI) / 180,
        })
      )
    }
  }
  getCircles()

  return {
    render(updatedProps) {
      ;({ width, height, time } = updatedProps)

      widthHalf = width / 2
      heightHalf = height / 2

      startAngle += 1

      context.clearRect(0, 0, width, height)

      for (let i = 0; i < circles.length; i++) {
        circles[i].color = `hsl(${i * 5 + time * 10 + 110}, 50%, 50%)`
        circles[i].draw(widthHalf, heightHalf, startAngle)
      }
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
