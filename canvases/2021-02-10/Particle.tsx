class Particle {
  context: CanvasRenderingContext2D
  x: number
  y: number
  radius: number = 0
  baseX: number
  baseY: number
  density: number = Math.random() * 40 + 5
  color: string
  radiusTarget: number

  constructor(args) {
    Object.assign(this, args)
    this.baseX = this.x
    this.baseY = this.y
    this.color = `hsl(${this.radius * 3 + 170}, 50%, 50%)`
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.closePath()
    this.context.fill()
  }

  update(mouse) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouse.radius) {
      this.radiusTarget = Math.max((mouse.radius - distance) / 4.5, 3)
      this.color = `hsl(${this.radius * 2 + 170}, 50%, 50%)`
    } else {
      this.radiusTarget = 0
      this.color = `hsl(${this.radius * 2 + 170}, 50%, 50%)`
    }

    if (this.radiusTarget - this.radius > 0) {
      this.radius += 0.4
    }
    if (this.radiusTarget - this.radius < -0.4) {
      this.radius -= 0.4
    }

    if (distance > mouse.radius + 150) {
      this.radius = 0
    }
    this.draw()
  }
}

export default Particle
