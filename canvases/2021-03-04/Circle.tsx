import gsap from 'gsap'

type CartridgeType = {
  x: number
  y: number
}

class Circle {
  context
  cartridges: CartridgeType[]
  x: number
  y: number
  radius: number = 20
  color: string = 'white'
  shot: boolean = false

  constructor(args) {
    Object.assign(this, args)
  }

  draw() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.fillStyle = this.color
    this.context.closePath()
    this.context.fill()
  }

  update() {
    this.y += 1

    if (!this.shot) {
      this.cartridges.forEach((cartridge) => {
        const dx = this.x - cartridge.x
        const dy = this.y - cartridge.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.radius) {
          this.shot = true

          gsap.to(this, {
            radius: 30,
            duration: 0.3,
            ease: 'bounce.out',
          })
          gsap.to(this, {
            radius: 0,
            duration: 2,
            delay: 0.3,
            ease: 'bounce.in',
          })
          this.color = 'red'
        }
      })
    }
  }
}

export default Circle
