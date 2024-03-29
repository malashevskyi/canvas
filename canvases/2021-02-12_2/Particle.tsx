class Particle {
  context: CanvasRenderingContext2D
  x: number
  y: number
  radius: number = 3
  anchorX: number
  anchorY: number
  power: number = Math.random() * 10 + 15
  color: string = 'white'

  constructor(args) {
    Object.assign(this, args)
    this.anchorX = this.x
    this.anchorY = this.y
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.rect(this.x, this.y, 2.5, 2.5)
    this.context.lineWidth = 0
    this.context.closePath()
    this.context.fill()
  }

  update(mouse) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const returnSmooth = 15 // return back speed

    const maxDistance = mouse.radius
    const force = (maxDistance - distance) / maxDistance

    const returnXBack = () => {
      this.x -= (this.x - this.anchorX) / returnSmooth
    }
    const returnYBack = () => {
      this.y -= (this.y - this.anchorY) / returnSmooth
    }

    if (distance < mouse.radius) {
      // push
      this.x -= (dx / distance) * force * this.power
      this.y -= (dy / distance) * force * this.power

      // particle color inside mouse radius
      this.color = 'rgba(255, 0, 255, 1)'
    } else {
      // return to the anchor point
      if (this.x !== this.anchorX) returnXBack()
      if (this.y !== this.anchorY) returnYBack()

      // restore previous color
      this.color = 'white'
    }

    this.draw()
  }
}

export default Particle
