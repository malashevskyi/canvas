class Particle {
  context
  x: number
  y: number
  xTo: number
  yTo: number
  index: number
  radius: number = 1
  baseX: number
  baseY: number
  density: number = Math.random() * 10 + 35
  color: string = 'white'
  startAnimation: boolean = false
  random: number = Math.random()
  randomX: number
  randomY: number
  radiusAnimationDelay: number = 0
  rC: number = 0.05
  alpha: number = 0
  alpha2: number = 0
  tick: number = 0

  constructor(args) {
    Object.assign(this, args)

    this.baseX = this.x
    this.baseY = this.y
    this.randomX = Math.cos((this.random - 0.5) * 10) * 3
    this.randomY = Math.sin((this.random - 0.5) * 10) * 3
  }

  draw() {
    // this.alpha2 = this.alpha
    // if (this.tick < 100) this.alpha2 = 0;

    this.context.fillStyle = this.color
    // context.globalAlpha = this.alpha2;
    this.context.beginPath()
    if (this.startAnimation) {
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    } else {
      this.context.rect(this.x, this.y, 1, 1)
    }

    this.context.lineWidth = 0
    this.context.closePath()
    this.context.fill()
  }

  update(mouse, logoAnimationFinished) {
    this.tick += 1

    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouse.radius && logoAnimationFinished) {
      this.startAnimation = true
    }
    if (this.startAnimation) {
      this.x += this.randomX
      this.y += this.randomY
      if (this.index % 5 === 0) {
        this.radiusAnimationDelay += 1
        if (this.radiusAnimationDelay > 35 && this.radius > Math.abs(this.rC)) {
          if (this.radius > 3) {
            this.rC = -this.rC * 4
          }
          this.radius += this.rC
        }
      } else if (this.radius > 0.2) {
        this.radius -= 0.07
      }
    }
  }
}

export default Particle
