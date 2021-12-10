import random from 'canvas-sketch-util/random'

class Square {
  context
  angle: number = random.range(0, Math.PI * 2)
  fx: number
  fy: number
  x: number
  y: number
  xBack: number
  yBack: number
  random: number = Math.random() * 2 + 0.5
  colorTick: number = 100
  distTickInitial: number = 200 + Math.trunc(1000 * Math.random())
  distTick: number = 200 + Math.trunc(1000 * Math.random())
  initTimeout: number = 100
  back: boolean = true
  color: string

  constructor(context, maxSide, [x, y]) {
    this.context = context
    this.fx = (Math.cos(this.angle) * maxSide) / 3 + 40
    this.fy = (Math.sin(this.angle) * maxSide) / 3 + 40
    this.x = x
    this.y = y + 20
    this.xBack = this.x
    this.yBack = this.y
  }

  render() {
    // delay in 100 frames
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
      dx = this.fx - this.x
      dy = this.fy - this.y
      dist = Math.sqrt(dx * dx + dy * dy)
      part = dist / this.distTick

      if (dist >= part) {
        const angle = Math.atan2(dy, dx)
        this.x += dCos(dist, angle)
        this.y += dSin(dist, angle)
        this.distTick -= 1
      } else if (dist < part) {
        this.x = this.fx
        this.y = this.fy
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
