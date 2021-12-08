import canvasSketch from 'canvas-sketch'
import { useContext, useEffect } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'
import Ball from './Ball'

const sketch = ({ context, height, width, time }) => {
  let color
  let tick = 0
  const balls = []
  const opt = {
    frequency: 20,
  }

  const angles = []

  function getAngles() {
    angles.length = 0
    for (let i = 0; i < 3; i++) {
      angles.push((Math.PI / 2 / 100) * i + time)
    }
  }

  function getParticles() {
    for (let i = 0; i < 3; i++) {
      balls.push(new Ball(context, angles[i], color))
    }
  }

  context.clearRect(0, 0, width, height)

  return (updatedProps) => {
    ;({ width, height, time } = updatedProps)

    context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    context.fillRect(0, 0, width, height)

    tick += 5
    color = `hsl(${tick}, 50%, 50%)`

    if (tick % -(opt.frequency - 105) === 0) {
      getAngles()
      getParticles()
    }

    context.save()
    context.translate(width / 2, height / 2)
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].radius === 0) {
        balls.splice(i, 1)
      }
      balls[i].render()
    }
    context.restore()
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
