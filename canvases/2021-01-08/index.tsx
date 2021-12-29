import random from 'canvas-sketch-util/random'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, canvas, height, width }) => {
  const mouse = {
    x: null,
    y: null,
  }
  let widthHalf, heightHalf
  const dots = []
  const palette = ['#230f2b', '#f21d41']

  const ease = (time, start, dRest, duration) => {
    let t = time

    t /= Math.floor(duration / 1.8)
    if (t < 1) {
      return dRest * 0.55 * t * t + start
    }
    return (-dRest / 2) * ((t - 1) * (t - 3) - 1) + start
  }
  class DrawCircle {
    anchorX: number
    anchorY: number
    x: number
    y: number
    vx: number = 0
    vy: number = 0
    radius: number
    color: string
    friction: number = 0.4
    springFactor: number = 0.7
    setTargetMarker: boolean = true
    initialX: number
    initialY: number
    targetX: number
    targetY: number
    tick: number
    duration: number

    constructor({ x, y, radius = 2, color = 'rgba(0, 0, 0, 0.2)' }) {
      this.anchorX = x
      this.anchorY = y
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.setTarget()
    }

    setTarget() {
      this.initialX = this.x
      this.initialY = this.y
      this.targetX = this.anchorX + random.rangeFloor(0, 20) - 20
      this.targetY = this.anchorY + random.rangeFloor(0, 80) - 80
      this.tick = 0
      this.duration = random.rangeFloor(40, 70)
    }

    render() {
      context.save()
      context.beginPath()
      context.fillStyle = this.color
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    update() {
      let dx, dy, dist

      dx = this.x - mouse.x
      dy = this.y - mouse.y
      dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 70) {
        const angle = Math.atan2(dy, dx)

        const tx = mouse.x + Math.cos(angle) * 50
        const ty = mouse.y + Math.sin(angle) * 50

        this.vx += (tx - this.x) / 4
        this.vy += (ty - this.y) / 4

        const dx1 = -(this.x - this.anchorX - 30)
        const dy1 = -(this.y - this.anchorY - 30)

        this.vx += (dx1 * this.springFactor) / 1.5
        this.vy += (dy1 * this.springFactor) / 1.5

        this.vx *= this.friction
        this.vy *= this.friction

        this.x += this.vx
        this.y += this.vy

        this.targetX = this.x
        this.targetY = this.y
        return
      }

      this.setTargetMarker = true

      dx = this.targetX - this.x
      dy = this.targetY - this.y
      dist = Math.sqrt(dx * dx + dy * dy)

      if (Math.abs(dist) <= 0) {
        this.setTarget()
      } else {
        const t = this.tick
        const d = this.duration
        let start = this.initialY
        let dRest = this.targetY - start
        this.y = ease(t, start, dRest, d)

        start = this.initialX
        dRest = this.targetX - start
        this.x = ease(t, start, dRest, d)

        this.tick += 1
      }
    }
  }

  function renderConnectedDots(pathSmall, pathBig) {
    context.beginPath()
    context.save()
    context.translate(width / 2, height / 2)
    context.scale(1.4, 1.4)
    context.fillStyle = palette[0]
    context.rotate(1)
    context.fill(pathBig)
    context.restore()

    context.save()
    context.fillStyle = palette[1]
    context.fill(pathSmall)
    context.restore()
  }
  function connectDots(d) {
    const pathSmall = new Path2D()
    const pathBig = new Path2D()

    for (let i = 0, l = d.length; i <= l; i++) {
      const p0 = d[i === l ? 0 : i]
      const p1 = d[i + 1 >= l ? i + 1 - l : i + 1]

      pathSmall.quadraticCurveTo(
        p0.x,
        p0.y,
        (p0.x + p1.x) * 0.5,
        (p0.y + p1.y) * 0.5
      )
      pathBig.quadraticCurveTo(
        p0.x - widthHalf,
        p0.y - heightHalf,
        (p0.x - widthHalf + p1.x - widthHalf) * 0.5,
        (p0.y - heightHalf + p1.y - heightHalf) * 0.5
      )
    }
    renderConnectedDots(pathSmall, pathBig)
  }

  function getDots() {
    const count = 20
    for (let i = 0; i < count; i++) {
      dots.push(
        new DrawCircle({
          x: widthHalf + 250 * Math.cos((i * Math.PI * 2) / count),
          y: heightHalf + 250 * Math.sin((i * Math.PI * 2) / count),
        })
      )
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height)
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillRect(0, 0, width, height)
  }

  function mouseMoveHandler(e) {
    mouse.x = (height / canvas.offsetHeight) * e.offsetX
    mouse.y = (width / canvas.offsetWidth) * e.offsetY
  }
  function touchMoveHandler(e) {
    e.preventDefault()
    mouse.x = e.changedTouches[0].clientX
    mouse.y = e.changedTouches[0].clientY
  }

  function getM(props) {
    ;({ height, width } = props)
    widthHalf = width / 2
    heightHalf = height / 2
  }

  getDots()

  canvas.addEventListener('mousemove', mouseMoveHandler)
  canvas.addEventListener('touchmove', touchMoveHandler)

  return {
    render(updatedProps) {
      getM(updatedProps)

      clearCanvas()

      connectDots(dots)

      dots.forEach((circle) => {
        circle.update()
        // circle.render() // dots
      })
      new DrawCircle({
        x: mouse.x,
        y: mouse.y,
        radius: 90,
        color: 'rgba(255, 0, 0, .05',
      }).render()
    },
    resize(updatedProps) {
      getM(updatedProps)
      if (context) {
        dots.length = 0
        getDots()
      }
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
