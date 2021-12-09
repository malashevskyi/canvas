class Particle {
  context
  x: number
  y: number
  radius: number
  color: string

  constructor(args) {
    Object.assign(this, args)
  }

  draw() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.shadowColor = this.color
    this.context.shadowBlur = 10
    this.context.fillStyle = this.color
    this.context.fill()
    this.context.closePath()
  }

  render(speedUp) {
    this.draw()
    const dx = this.x
    const dy = this.y
    const angle = Math.atan2(this.x, this.y)
    const radius = Math.sqrt(dx * dx + dy * dy)
    const angleInc = speedUp ? 0.01 : 0.001

    this.x = radius * Math.sin(+(angle + angleInc).toFixed(3))
    this.y = radius * Math.cos(+(angle + angleInc).toFixed(3))
  }
}

export default Particle
