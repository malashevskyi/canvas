import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import useCanvas from '../../hooks/useCanvas'

function getAlphaMarker(count, delay) {
  let isThrottled = false
  let tick = 0

  return () => {
    if (isThrottled) return true
    tick += 1

    if (tick < count * delay) {
      isThrottled = false
    } else {
      isThrottled = true
      setTimeout(() => {
        isThrottled = false
        tick = 0
      }, count * delay * 16)
    }
    return isThrottled
  }
}

const sketch = ({ context, height, width }) => {
  const particles = []
  const opt = {
    fallDelay: 20000,
  }
  let reduceAlpha = false
  let alpha = 1

  class ParticleFall {
    x: number
    y: number
    radius: number
    color: string

    constructor({ x, y, radius, color }) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
    }

    draw() {
      this.radius *= 0.9

      context.save()
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.shadowColor = this.color
      context.shadowBlur = 2
      context.fillStyle = this.color
      context.fill()
      context.restore()
    }

    animate(a) {
      this.color = `rgba(255, 255, 0, ${a})`
      this.draw()
    }
  }

  function getParticleFall(x, y, r) {
    return new ParticleFall({ x, y, radius: r * 2, color: 'yellow' })
  }
  class Particle {
    x: number
    y: number
    radius: number
    color: string = 'yellow'
    alpha: number = 1
    alphaMarker: () => boolean
    tick: number = 0
    dy: number = 1
    random: number = Math.random()
    dx: number
    fallDelay: number
    fall: boolean = false
    range: number = random.range(5, 13)
    innerParticles: ParticleFall[] = []

    constructor({ x, y, radius, delay }) {
      this.x = x
      this.y = y
      this.radius = radius

      this.alphaMarker = getAlphaMarker(10, delay)
      this.dx = this.random - 0.5
      this.fallDelay = opt.fallDelay * this.random
    }

    draw() {
      const alphaMarker = this.alphaMarker()
      this.tick += 1

      this.fallDelay = opt.fallDelay * this.random

      if (this.fall) {
        this.dy += 0.01
        this.y += this.dy
        this.x += this.dx / 2

        this.innerParticles.push(getParticleFall(this.x, this.y, this.radius))

        if (this.innerParticles.length > this.range) {
          this.innerParticles.shift()
        }
      }

      if (alphaMarker && this.alpha <= 0.6) {
        this.alpha += 0.03
      } else if (this.alpha > 0.1) {
        this.alpha -= 0.03
      }

      context.save()
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.shadowColor = this.color
      context.shadowBlur = 10
      context.fillStyle = this.color
      context.fill()
      context.restore()

      context.save()
      context.beginPath()
      context.arc(this.x, this.y, this.radius + 12, 0, Math.PI * 2)
      context.fillStyle = `rgba(10, 10, 10, ${this.alpha})`
      context.fill()
      context.restore()
    }

    animate() {
      this.draw()
    }
  }

  function getParticle() {
    return new Particle({
      x: lerp(-width / 2, width / 2, Math.random()),
      y: lerp(-height / 2, height / 2, Math.random()),
      radius: Math.random() + 0.5,
      delay: Math.random() * 100,
    })
  }

  function getParticles(amount) {
    for (let i = 0; i < amount; i++) {
      particles.push(getParticle())
    }
  }

  getParticles(150)

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    setTimeout(() => {
      reduceAlpha = !reduceAlpha
    }, 1000)

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`
    context.fillRect(0, 0, width, height)

    if (alpha > 0.1 && reduceAlpha) {
      alpha -= 0.2
    } else if (alpha < 1) {
      alpha += 0.2
    }

    context.save()
    context.translate(width / 2, height / 2)

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]

      if (particle.tick > particle.fallDelay) {
        particle.fall = true
        if (particle.y > height / 2 + 20) {
          particles.splice(i, 1, getParticle())
        }
      }
      particle.animate()

      particle.innerParticles.forEach((pInner) => {
        pInner.animate(1 / particle.innerParticles.length)
      })
    }

    context.restore()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
