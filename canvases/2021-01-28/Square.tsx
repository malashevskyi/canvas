import random from 'canvas-sketch-util/random'

class Square {
  context: CanvasRenderingContext2D
  angle: number = random.range(0, Math.PI * 2)
  fxCircle: number
  fyCircle: number
  fxRect: number
  fyRect: number
  x: number
  y: number
  xBack: number
  yBack: number
  random: number = Math.random() * 2 + 0.5
  colorTick: number = 30
  distTickInitial: number = 200 + Math.trunc(1000 * Math.random())
  distTick: number = 200 + Math.trunc(1000 * Math.random())
  initTimeout: number = 100
  back: boolean = true
  frameTick: number = 0
  frametick: number
  color: string

  constructor({ context, maxSide, position, outerPosition, sideHalf }) {
    const [outerPosX, outerPosY] = outerPosition
    const [posX, posY] = position

    this.context = context
    this.fxCircle = (Math.cos(this.angle) * maxSide) / 3 + sideHalf
    this.fyCircle = (Math.sin(this.angle) * maxSide) / 3 + sideHalf
    this.fxRect = outerPosX
    this.fyRect = outerPosY
    this.x = posX
    this.y = posY + 20
    this.xBack = this.x
    this.yBack = this.y
  }

  render() {
    this.frametick += 1
    // delay in 30 frames
    if (this.initTimeout) {
      this.initTimeout -= 1
      this.draw()
      return
    }
    const dCos = (dist, angle) => (Math.cos(angle) * dist) / this.distTick
    const dSin = (dist, angle) => (Math.sin(angle) * dist) / this.distTick

    let dx, dy, dist, part

    // from center
    if (this.back) {
      if (
        this.frameTick < 300 ||
        (this.frameTick > 800 && this.frameTick < 1300) ||
        (this.frameTick > 1800 && this.frameTick < 2300) ||
        (this.frameTick > 2800 && this.frameTick < 3300) ||
        (this.frameTick > 3800 && this.frameTick < 4300) ||
        this.frameTick > 4900
      ) {
        dx = this.fxCircle - this.x
        dy = this.fyCircle - this.y
      } else {
        dx = this.fxRect - this.x
        dy = this.fyRect - this.y
      }
      dist = Math.sqrt(dx * dx + dy * dy)
      part = dist / this.distTick

      if (dist >= part) {
        const angle = Math.atan2(dy, dx)
        this.x += dCos(dist, angle)
        this.y += dSin(dist, angle)
        this.distTick -= 1
      } else if (dist < part) {
        this.x = this.fxRect
        this.y = this.fyRect
      } else if (dist === 0) {
        this.distTick = this.distTickInitial
        this.back = false
      }
    }

    // to center
    if (!this.back) {
      dx = this.x - this.xBack
      dy = this.y - this.yBack
      dist = Math.sqrt(dx * dx + dy * dy)
      part = dist / this.distTick

      if (dist >= part) {
        const angle = Math.atan2(dy, dx)
        this.x -= dCos(dist, angle)
        this.y -= dSin(dist, angle)
        this.distTick -= 1
      } else if (dist < part) {
        this.x = this.xBack
        this.y = this.yBack
      } else if (dist === 0) {
        this.back = true
        this.distTick = this.distTickInitial
      }
    }

    this.draw()
  }

  draw() {
    this.colorTick += 0.2
    this.color = `hsl(${this.colorTick}, 50%, 50%)`
    this.context.beginPath()
    this.context.fillStyle = this.color
    this.context.rect(this.x, this.y, 1.5, 1.5)
    this.context.strokeWidth = 0
    this.context.strokeStyle = this.color
    this.context.stroke()
    this.context.fill()
    this.context.closePath()
  }
}

export default Square
