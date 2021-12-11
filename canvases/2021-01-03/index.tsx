import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'
import Particle from './Particle'

const sketch = ({ context, height, width }) => {
  const particles = []
  let alpha = 1
  let speedUp = true
  let interval

  random.setSeed(16)
  let palette = palettes[0]

  function getParticles(amount) {
    // const angle = Math.PI * 2 / amount;

    for (let i = 0; i < amount; i++) {
      const [cx, cy] = random.insideCircle(400)
      particles.push(
        new Particle({
          context,
          x: cx, // lerp(0, 400 * Math.sin(angle * i), Math.random()),
          y: cy, // lerp(0, 400 * Math.cos(angle * i), Math.random()),
          radius: Math.random() + 0.5,
          color: random.pick(palette),
        })
      )
    }
  }

  getParticles(120)
  setInterval(() => {
    speedUp = !speedUp
  }, 3000)

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      interval = setInterval(() => {
        speedUp = !speedUp
      }, 3000)
    } else {
      clearInterval(interval)
    }
  })

  return (updatedProps) => {
    ;({ height, width } = updatedProps)

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`
    context.fillRect(0, 0, width, height)

    if (alpha > 0.1) {
      if (speedUp) {
        alpha -= 0.09
      } else {
        alpha += 0.001
      }
    } else if (alpha < 1) {
      alpha += 0.1
    }

    context.save()
    context.translate(width / 2, height / 2)
    particles.forEach((particle) => {
      particle.render(speedUp)
    })
    context.restore()

    context.globalCompositeOperation = 'destination-in'
    context.arc(
      width / 2,
      height / 2,
      400, // Math.min(width, height) / 2, // fullscreen circle
      0,
      Math.PI * 2
    )
    context.fillStyle = 'rgba(0, 0, 0, 1)'
    context.fill()
    context.restore()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
