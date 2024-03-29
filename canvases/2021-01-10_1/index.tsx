import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, height, width }) => {
  random.setSeed(24)

  const palette = random.pick(palettes)
  const TWO_PI = Math.PI * 2
  const opt = {
    rotateAngle: 2,
  }
  const countCircles = 5
  const balls = []
  const c = [] // cords, big circle
  const c2 = [] // cords, small circles

  let tick = 0

  class Ball {
    x: number
    y: number
    color: string = random.pick(palette)
    dx: number = 1
    dxI: number = 1
    tick: number = 0
    radius: number = 20

    constructor(x, y) {
      this.x = x
      this.y = y
    }

    draw() {
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.fillStyle = this.color
      context.fill()
      context.closePath()
    }

    render() {
      this.dx += this.dxI
      if (this.dx % 50 === 0) {
        this.dxI = -this.dxI
      }

      this.x = this.dx
      this.y = this.dx
      this.draw()
    }
  }

  for (let i = 0; i <= 15; i++) {
    balls.push(new Ball(0, 0))
  }

  function createCords(count, radius, array) {
    const angle = (Math.PI * 2) / count
    for (let i = 0; i < count; i++) {
      array.push({
        x: radius * Math.cos(angle * i),
        y: radius * Math.sin(angle * i),
      })
    }
  }

  createCords(1000, 400, c)
  createCords(700, 70, c2)

  function clearCanvas() {
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillRect(0, 0, width, height)
    context.clearRect(0, 0, width, height)
  }
  clearCanvas()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 1

    context.translate(width / 2, height / 2)

    const d = [4.5, 1.5, 0.9]
    for (let j = 0; j < 3; j++) {
      context.save()
      context.translate(
        // center of the small circle (moving)
        c[tick % c.length].x / d[j],
        c[tick % c.length].y / d[j]
      )
      for (let i = 1; i <= 5; i++) {
        context.save()
        context.rotate(
          (TWO_PI / opt.rotateAngle) * (tick % opt.rotateAngle) +
            (TWO_PI / countCircles) * i
        )
        balls[i].render()
        context.restore()
      }
      context.restore()
    }
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
