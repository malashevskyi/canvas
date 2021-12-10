import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'
import Particle from './Particle'

const sketch = ({ context, canvas, height, width }) => {
  const particles = []
  const coordsCount = 200
  const angle = (Math.PI * 2) / coordsCount
  const circlesRadius = 100

  const mouse = {
    x: width / 2,
    y: height / 2,
  }

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  })

  function getParticles() {
    for (let i = 0; i < 40; i++) {
      const newParticle = new Particle({
        context,
        // random start tick from 0 to coordsCount for random start position on circle
        startTick: Math.floor(Math.random() * coordsCount),
        coordsCount,
        angle,
        circlesRadius,
        mouseStart: mouse,
        index: i,
      })

      particles.push(newParticle)

      window['timelines'].push(
        gsap.to(newParticle, {
          duration: 4,
          radius: 7,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
          ease: 'power2.inOut',
        })
      )
    }
  }
  getParticles()

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.fillStyle = 'rgba(10, 10, 10, 1)'
    context.fillRect(0, 0, width, height)

    particles.forEach((particle) => {
      particle.update(mouse)
    })
  }
}
function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
