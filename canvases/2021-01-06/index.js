import canvasSketch from 'canvas-sketch'
import { linspace } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { useEffect } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../context/globalContext'

import { destroyObjects, resetCanvas } from '../../utiles'

random.setSeed('749302')
const palette = random.pick(palettes)

const sketch = ({ context, height, width }) => {
  function throttleTimeout(count, delay) {
    let isThrottled = false
    let tick = 0
    return () => {
      if (isThrottled) return true
      tick += 1

      if (tick > count * delay) {
        isThrottled = true

        setTimeout(() => {
          isThrottled = false
          tick = 0
        }, count * delay * 16)
      }
      return isThrottled
    }
  }

  const rects = []
  let countX
  let countY

  class Particle {
    constructor({ x, y }) {
      this.x = x
      this.y = y
      this.color = random.pick(palette)
      this.delay = Math.random() * 100
      this.alphaMarker = false
      this.alpha = 1
      this.throttleTimeout = throttleTimeout(10, this.delay)
    }

    draw() {
      const throttle = this.throttleTimeout()

      if (throttle && this.alpha <= 1) {
        this.alpha += 0.03
      } else if (this.alpha > 0.5) {
        this.alpha -= 0.03
      }

      context.save()
      context.beginPath()
      context.rect(this.x, this.y, width / countX, height / countY)
      context.globalAlpha = this.alpha
      context.fillStyle = this.color
      context.fill()
      context.restore()
    }

    animate() {
      this.draw()
    }
  }

  const createGrid = () => {
    countX = Math.floor(width / 40)
    countY = Math.floor(height / 40)

    const u = linspace(countX)
    const v = linspace(countY)

    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        // const u = countX <= 1 ? 0.5 : x / (countX);
        // const v = countY <= 1 ? 0.5 : y / (countY);
        rects.push(
          new Particle({
            x: width * u[x],
            y: height * v[y],
          })
        )
      }
    }
  }

  createGrid()

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      context.fillRect(0, 0, width, height)

      rects.forEach((particle) => {
        particle.animate()
      })
    },

    resize(updatedProps) {
      ;({ width, height } = updatedProps)
      rects.length = 0
      createGrid()
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
