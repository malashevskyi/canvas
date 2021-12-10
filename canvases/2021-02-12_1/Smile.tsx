class Smile {
  context
  x: number
  y: number
  constructor(args) {
    Object.assign(this, args)
  }

  draw(eyePosition, mouthRadius) {
    // body
    this.context.beginPath()
    this.context.arc(this.x, this.y, 100, 0, Math.PI * 2)
    this.context.closePath()
    this.context.fillStyle = 'rgb(228, 167, 0)'
    this.context.fill()

    // eyes
    this.context.beginPath()
    this.context.arc(this.x - 30, this.y - 30, 20, 0, Math.PI * 2)
    this.context.arc(this.x + 30, this.y - 30, 20, 0, Math.PI * 2)
    this.context.closePath()
    this.context.fillStyle = 'white'
    this.context.fill()

    // pupils
    this.context.beginPath()
    this.context.arc(
      this.x - 38 + eyePosition.x,
      this.y - 38 + eyePosition.y,
      10,
      0,
      Math.PI * 2
    )
    this.context.arc(
      this.x + 22 + eyePosition.x,
      this.y - 38 + eyePosition.y,
      10,
      0,
      Math.PI * 2
    )
    this.context.closePath()
    this.context.fillStyle = 'black'
    this.context.fill()

    // mouth
    this.context.beginPath()
    this.context.moveTo(this.x - mouthRadius, this.y + 30)
    this.context.lineTo(this.x + mouthRadius, this.y + 30)
    this.context.lineTo(this.x + mouthRadius, this.y + 30 + 5)
    this.context.lineTo(this.x - mouthRadius, this.y + 30 + 5)
    this.context.fillStyle = 'black'
    this.context.fill()
  }
}

export default Smile
