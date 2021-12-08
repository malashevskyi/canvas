import canvasSketch from 'canvas-sketch'
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'
import useCanvas from '../../hooks/useCanvas'
import { destroyObjects, resetCanvas } from '../../utiles'

random.setSeed(random.pick(['513468']))
const palette = random.pick(palettes)

const sketch = ({ context, height, width }) => {
  const balls = []
  const opt = {
    radiusInc: 1.1,
    ballsCount: 700,
  }

  function inRange(axis, start, end) {
    return axis > start && axis < end
  }

  function Ball({ x, y, dx, dy, radius }) {
    this.x = lerp(radius, width - radius, x)
    this.y = lerp(radius, height - radius, y)
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = random.pick(palette.slice(0, 3))

    this.draw = () => {
      context.beginPath()
      context.arc(
        this.x,
        this.y,
        this.radius * opt.radiusInc,
        0,
        Math.PI * 2,
        false
      )
      context.fillStyle = this.color
      context.fill()
      context.closePath()
    }
    this.update = () => {
      const r = this.radius
      if (!inRange(this.x, r, width - r)) this.dx = -this.dx
      if (!inRange(this.y, r, height - r)) this.dy = -this.dy

      this.x += this.dx
      this.y += this.dy
    }
    this.render = () => {
      this.draw()
      this.update()
    }
  }

  function createBalls() {
    for (let i = 0; i < opt.ballsCount; i++) {
      balls.push(
        new Ball({
          x: Math.random(),
          y: Math.random(),
          dx: random.gaussian(0, 1) * 0.5,
          dy: random.gaussian(0, 1) * 0.5,
          radius: Math.abs(random.gaussian(0, 1)) * 14,
        })
      )
    }
  }

  createBalls()

  return (updatedProps) => {
    ;({ height, width } = updatedProps)

    context.fillStyle = '#000'
    context.clearRect(0, 0, width, height)

    balls.forEach((ball) => ball.render())
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
