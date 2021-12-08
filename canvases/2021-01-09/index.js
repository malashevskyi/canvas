import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import useNotification from '../../hooks/useNotification'
import { destroyObjects, resetCanvas } from '../../utiles'

const sketch = ({ context, height, width }) => {
  random.setSeed(17)

  const palette = random.pick(palettes)
  let angle = -Math.PI / 2
  let dx, dy
  let arrowX = 0
  let arrowY = 0
  const balls = []
  let tick = 0

  class Ball {
    constructor(cBool) {
      this.x = 0
      this.y = angle
      this.dx = 10
      this.dy = angle
      this.first = true
      this.color = random.pick(palette)
      this.angle = angle
      this.cBool = cBool
    }

    draw() {
      context.save()
      context.rotate(this.angle)
      context.beginPath()
      context.rect(this.x, this.y - 8, 20, 20)
      context.fillStyle = this.color
      context.closePath()
      context.fill()
      context.restore()
    }

    render() {
      if (this.cBool) {
        this.x -= this.dx
      } else {
        this.x += this.dx
      }

      this.draw()
    }
  }

  function drawArrow() {
    context.save()
    context.translate(arrowX, arrowY)
    context.rotate(angle)
    context.beginPath()
    context.rect(-40, -25, 80, 50)
    context.closePath()
    // eslint-disable-next-line
    context.fillStyle = palette[4]
    context.fill()
    context.restore()
  }

  window.addEventListener('mousemove', (event) => {
    dx = event.clientX - arrowX
    dy = event.clientY - arrowY
    angle = Math.atan2(dy, dx)
  })

  let cBool = true

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    arrowX = width / 2
    arrowY = height / 2

    tick += 1

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    if (tick % 2 === 0) {
      if (tick % 4 === 0) {
        cBool = false
      } else {
        cBool = true
      }
      balls.push(new Ball(cBool))
    }
    if (balls.length > 300) {
      balls.shift()
    }

    context.save()
    context.translate(arrowX, arrowY)
    balls.forEach((ball) => {
      ball.render()
    })
    context.restore()
    drawArrow()
  }
}

function Canvas() {
  const [state, dispatch] = useContext(GlobalContext)

  useNotification({
    message: 'Move mouse to rotate',
  })

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
