import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../__/hooks/useNotification'

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
    x: number = 0
    y: number = angle
    dx: number = 10
    dy: number = angle
    first: boolean = true
    color: string = random.pick(palette)
    angle: number = angle
    cBool: boolean
    constructor(cBool) {
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
  useNotification({
    message: 'Move mouse to rotate',
  })

  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
