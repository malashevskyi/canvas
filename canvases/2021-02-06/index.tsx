import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, height, width }) => {
  const particles = []

  const mouse = {
    x: -width,
    y: -width,
    radius: width,
  }

  function setTween() {
    window['timelines'].push(
      gsap.to(mouse, {
        duration: 5,
        x: width + width,
        y: height + width,
        repeatDelay: 0,
        ease: 'power1.out',
        repeat: -1,
      })
    )
  }
  setTween()

  class Particle {
    context: CanvasRenderingContext2D
    radius: number
    x: number
    y: number
    baseX: number
    baseY: number
    density: number
    colorTick: number
    colorTickC: number
    color: string

    constructor(x, y) {
      this.x = x
      this.y = y
      this.radius = 1
      this.baseX = this.x
      this.baseY = this.y
      this.density = Math.random() * 40 + 5
      this.colorTick = 0
      this.colorTickC = 1
      this.color = 'hsl(360, 50%, 50%)'
    }

    draw() {
      context.fillStyle = this.color
      context.beginPath()
      context.rect(this.x, this.y, 19, 19)
      context.closePath()
      context.fill()
    }

    update() {
      this.colorTick += this.colorTickC
      if (this.colorTickC > 100 || this.colorTickC === 0) {
        this.colorTickC = -this.colorTickC
      }

      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius) {
        this.x += (dx / distance) * 1.5
        this.y += (dy / distance) * 1.5
      } else {
        if (this.x !== this.baseX) {
          this.x -= (this.x - this.baseX) / 12
        }
        if (this.y !== this.baseY) {
          this.y -= (this.y - this.baseY) / 12
        }
      }
      this.draw()
    }
  }

  function init() {
    particles.length = 0

    for (let x = 0; x < Math.ceil(width / 20); x++) {
      for (let y = 0; y < Math.ceil(height / 20); y++) {
        particles.push(new Particle(x * 20, y * 20))
      }
    }
  }
  init()

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      context.fillStyle = 'black'
      context.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.update()
      })
    },
    resize(updatedProps) {
      ;({ width, height } = updatedProps)
      mouse.x = -width
      mouse.y = -width
      init()
      setTween()
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
