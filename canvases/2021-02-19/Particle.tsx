class Particle {
  context
  x: number
  y: number
  radius: number = 3
  anchorX: number
  anchorY: number
  density: number = Math.random() * 10 + 15
  color: string = 'red'

  constructor(args) {
    Object.assign(this, args)
    this.anchorX = this.x
    this.anchorY = this.y
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.rect(this.x, this.y, 2, 2)
    this.context.lineWidth = 0
    this.context.closePath()
    this.context.fill()
  }

  update(mouse) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const forceDirectionX = dx / distance
    const forceDirectionY = dy / distance
    const maxDistance = mouse.radius
    const force = (maxDistance - distance) / maxDistance
    const directionX = forceDirectionX * force * this.density
    const directionY = forceDirectionY * force * this.density

    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.anchorX) {
        this.x -= (this.x - this.anchorX) / 10
      }
      if (this.y !== this.anchorY) {
        this.y -= (this.y - this.anchorY) / 10
      }
    }
  }
}

export default Particle
