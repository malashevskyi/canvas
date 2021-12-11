import random from 'canvas-sketch-util/random'
import gsap from 'gsap'

class Particle {
  context: CanvasRenderingContext2D
  x: number
  y: number
  xTo: number
  yTo: number
  index: number
  color: string
  start: boolean = false
  alpha: number = 1
  tick: number = 0
  width: number = 2
  height: number = 2
  constructor(args) {
    Object.assign(this, args)

    this.index = args.index + random.rangeFloor(0, 2000)
  }

  draw() {
    this.tick += 50
    if (this.tick > this.index && !this.start) {
      this.start = true
      gsap.to(this, {
        duration: 5,
        x: this.xTo,
        y: this.yTo,
        repeatDelay: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power4.in',
      })
    }
    this.context.save()
    this.context.globalAlpha = this.alpha
    this.context.beginPath()
    this.context.fillStyle = this.color
    this.context.rect(this.x, this.y, this.width, this.height)
    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }
}

export default Particle
