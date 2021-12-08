import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import { destroyObjects, resetCanvas } from '../../utiles'
import Ball from './Ball'

const sketch = ({ context, height, width, time }) => {
  let color
  let tick = 0
  const balls = []
  const opt = {
    curve: true,
  }

  const angles = []

  function getAngles() {
    angles.length = 0
    for (let i = 0; i < 5; i++) {
      angles.push((Math.PI / 2 / 100) * i + time)
    }
  }

  function getParticles() {
    for (let i = 0; i < 5; i++) {
      balls.push(new Ball(context, angles[i], opt, color))
    }
  }

  context.clearRect(0, 0, width, height)

  return {
    render(updatedProps) {
      ;({ height, width, time } = updatedProps)

      context.fillStyle = 'rgba(0, 0, 0, 0.1)'
      context.fillRect(0, 0, width, height)

      tick += 5
      color = `hsl(${tick}, 50%, 50%)`

      getAngles()
      getParticles()

      context.save()
      context.translate(width / 2, height / 2)
      balls.forEach((ball, i) => {
        if (ball.tick > 90) {
          balls.splice(i, 1)
        }
        ball.render()
      })
      context.restore()
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
