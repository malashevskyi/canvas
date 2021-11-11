import useCanvas from '../../hooks/useCanvas'
import Particle from './Particle'
import useNotification from '../../hooks/useNotification'

const sketch = () => (initialProps) => {
  const { context, canvas } = initialProps
  let { height, width } = initialProps

  const particles = []
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 200, // radius for pushing particles
  }
  const opt = {
    count: 200,
  }

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  function getParticles() {
    // reset particles
    particles.length = 0

    const margin = 100 // screen margin

    for (let i = 0; i < opt.count; i++) {
      particles.push(
        new Particle({
          context,
          x: (width - margin * 2) * Math.random() + margin,
          y: (height - margin * 2) * Math.random() + margin,
        })
      )
    }
  }
  getParticles()

  function setStrokeStyle(distance, radius) {
    if (distance < radius) context.strokeStyle = 'rgba(255, 0, 255, 1)'
  }
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)'

        let dx, dy, distance

        dx = particles[i].x - particles[j].x
        dy = particles[i].y - particles[j].y
        distance = Math.sqrt(dx * dx + dy * dy)

        context.beginPath()
        // draw lines
        if (distance < 95) {
          context.lineWidth = 2
          context.moveTo(particles[i].x, particles[i].y)
          context.lineTo(particles[j].x, particles[j].y)
        }
        // if a line less than 55 make it pink
        setStrokeStyle(distance, 55)

        // in circle radius
        // if a distance between one of two particles of the line and mouse position
        // less than 200 make this line pink
        dx = mouse.x - particles[i].x
        dy = mouse.y - particles[i].y
        distance = Math.sqrt(dx * dx + dy * dy)
        setStrokeStyle(distance, 200)

        dx = mouse.x - particles[j].x
        dy = mouse.y - particles[j].y
        distance = Math.sqrt(dx * dx + dy * dy)
        setStrokeStyle(distance, 200)

        context.stroke()
      }
    }
  }

  return {
    render(updatedProps) {
      ;({ width, height } = updatedProps)

      context.fillRect(0, 0, width, height)

      context.save()
      particles.forEach((particle) => {
        particle.update(mouse)
      })

      connectParticles()

      context.beginPath()
      context.fillStyle = 'rgba(255, 0, 255, 1)'
      context.arc(mouse.x, mouse.y, mouse.radius / 2, 0, Math.PI * 2)
      context.fill()
      context.restore()
    },
    resize() {
      getParticles()
    },
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch() })
  useNotification({
    message: 'Move mouse to push particles',
  })

  return ''
}

export default Canvas
