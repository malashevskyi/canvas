import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import useCanvas from '../../hooks/useCanvas'
import Particle from './Particle'

const sketch = ({ context, height, width, canvas }: any) => {
  const particles: any = []

  const mouse = { x: null, y: null }
  const count = 150
  let canvasRectAlpha = 1
  let intervalAlpha: any

  function addParticles(e: any) {
    mouse.x = e.clientX
    mouse.y = e.clientY

    clearInterval(intervalAlpha)
    let startClearRect = 0
    canvasRectAlpha = 0.1

    intervalAlpha = setInterval(() => {
      startClearRect += 1
      if (startClearRect > 200) {
        canvasRectAlpha += 0.004
      }
      if (canvasRectAlpha >= 1) {
        clearInterval(intervalAlpha)
      }
    })

    const power = 30
    const angleIncrement = (Math.PI * 2) / count

    const palette = random.pick(palettes).slice(0, 3)

    function addParticle(i: any) {
      particles.push(
        new Particle({
          context,
          x: mouse.x,
          y: mouse.y,
          radius: 1,
          color: random.pick(palette),
          velocity: {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power,
          },
        })
      )
    }

    for (let i = 0; i < count; i++) {
      addParticle(i)
    }
  }

  canvas.onclick = addParticles

  return (updatedProps: any) => {
    ;({ height, width } = updatedProps)

    context.fillStyle = `rgba(10, 10, 10, ${canvasRectAlpha})`
    context.fillRect(0, 0, width, height)

    particles.forEach((particle: any, i: any) => {
      if (particle.alpha > 0) {
        particle.render()
      } else {
        particles.splice(i, 1)
      }
    })
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
