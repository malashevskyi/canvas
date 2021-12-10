import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, height, width }) => {
  random.setSeed(6)
  const palette = random.pick(palettes)
  let tick = 0
  const balls = []
  class Ball {
    x: number = 0
    y: number = 0
    angle: number
    color: string = random.pick(palette)
    radius: number = 1
    dx: number
    dy: number
    tick: number = 0
    start: boolean = true

    constructor(angle) {
      this.angle = angle
      this.dx = Math.cos(angle) / 2
      this.dy = Math.sin(angle) / 2
    }

    draw() {
      context.save()
      context.rotate(this.angle)
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.fillStyle = this.color
      context.closePath()
      context.fill()
      context.restore()
    }

    render() {
      this.tick += 1
      if (this.radius < 15 && this.start) this.radius += 0.5

      if (this.radius >= 15) this.start = false

      if (this.tick > 80 && this.radius > 0.5) this.radius -= 0.5

      this.x += this.dx
      this.y += this.dy
      this.dx += 0.1
      this.dy += 0.1
      this.draw()
    }
  }

  const angles = []
  for (let i = 0; i < 200; i++) {
    angles.push(((Math.PI * 2) / 200) * i)
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)
    tick += 1

    if (balls.length < 300 && tick % 3 === 0) {
      balls.push(new Ball(random.pick(angles)))
    }

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.save()
    context.translate(width / 2, height / 2)
    balls.forEach((ball, i) => {
      const radius = 750
      if (
        ball.x > radius ||
        ball.y > radius ||
        ball.x < -radius ||
        ball.y < -radius
      ) {
        balls.splice(i, 1, new Ball(random.pick(angles)))
      }
      ball.render()
    })
    context.restore()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
