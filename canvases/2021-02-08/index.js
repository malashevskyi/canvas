import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'
import random from 'canvas-sketch-util/random'

import useCanvas from '../../hooks/useCanvas'
import Ball from './Ball'
import { resetCanvas } from '../../utiles'
import { useEffect } from 'react/cjs/react.development'

const sketch = () => (initialProps) => {
  const { context } = initialProps
  let { height, width } = initialProps

  random.setSeed(10)

  const palette = random.pick(palettes)
  const radius = 10
  const black = '#000000'
  const xl = Math.round(width / 50)
  const yl = Math.round(height / 50)
  const historyColors = [black]
  let tick = 0

  const balls = []

  function getBalls() {
    // generate grid of balls
    for (let x = 0; x < xl; x++) {
      for (let y = 0; y < yl; y++) {
        const u = x / (xl - 1)
        const v = y / (yl - 1)

        balls.push(
          new Ball({
            context,
            x: lerp(radius, width - radius, u),
            y: lerp(radius, height - radius, v),
            dx: (Math.random() - 0.5) * 3,
            dy: (Math.random() - 0.5) * 3,
            color: '#000000',
          })
        )
      }
    }
  }
  getBalls()

  function addNewColor() {
    // remove an old history color
    if (historyColors.length > 30) historyColors.shift()

    // randomly select a ball and change its color to new random color
    const color = random.pick(palette)

    historyColors.push(color)
    const randomBall = balls[random.rangeFloor(0, balls.length - 1)]
    randomBall.color = color
  }

  function getLatestColor(color1, color2) {
    const maxIndex = Math.max(
      historyColors.findIndex((color) => color === color1),
      historyColors.findIndex((color) => color === color2)
    )
    // return the newest color from history
    return historyColors[maxIndex]
  }

  function throwBalls(i, j) {
    const first = balls[i]
    const second = balls[j]
    // throw balls in different directions
    const dRadius = 4 * Math.random()
    first.dy = Math.sin(random.range(0, 3)) * dRadius
    first.dx = Math.cos(random.range(0, 3)) * dRadius
    second.dy = Math.sin(random.range(3.14, 6)) * dRadius
    second.dx = Math.cos(random.range(3.14, 6)) * dRadius

    if (first.color === black) {
      // if first ball's color is black, set it to the second ball's color
      first.color = second.color
    } else if (second.color === black) {
      // if second ball's color is black, set it to the first ball's color
      second.color = first.color
    } else {
      // find the newest color of these two balls
      const newColor = getLatestColor(first.color, second.color)

      // prevent change color between two balls more than once
      if (second.prevColor !== newColor) {
        second.prevColor = second.color
        second.color = newColor
      }
      if (first.prevColor !== newColor) {
        first.prevColor = first.color
        first.color = newColor
      }
    }
  }

  return (updatedProps) => {
    ;({ height, width } = updatedProps)

    context.clearRect(0, 0, width, height)

    tick += 1

    if (tick % 20 === 0) addNewColor()

    for (let i = 0; i < balls.length; i++) {
      const el = balls[i]

      el.draw(width, height, radius)

      for (let j = i + 1; j < balls.length; j++) {
        const elNext = balls[j]
        const dx = el.x - elNext.x
        const dy = el.y - elNext.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < radius * 2) throwBalls(i, j)
      }
    }
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch() })

  useEffect(() => {
    resetCanvas()
  }, [])

  return ''
}

export default Canvas
