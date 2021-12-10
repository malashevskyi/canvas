import useCanvas from '../../hooks/useCanvas'
import useNotification from '../../__/hooks/useNotification'
import Particle from './Particle'

const sketch = ({ context, canvas, height, width }) => {
  const particles = []
  const mouse = {
    x: null,
    y: null,
    radius: 200,
  }
  const opt = {
    offset: 40,
  }
  const touchColor = 'rgb(255, 0, 255)'
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  function getParticles() {
    particles.length = 0
    const m = 500
    const countX = Math.floor(m / opt.offset)
    const countY = Math.floor(m / opt.offset)
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = countX <= 1 ? 0.5 : x / (countX - 1)
        const v = countY <= 1 ? 0.5 : y / (countY - 1)
        particles.push(
          new Particle({
            context,
            x: m * u + (width / 2 - m / 2),
            y: m * v + (height / 2 - m / 2),
          })
        )
      }
    }
  }
  getParticles()

  function setStrokeStyle(
    distance,
    radius,
    color = 'rgba(255, 255, 255, 0.1)'
  ) {
    if (distance < radius) {
      context.strokeStyle = color
    }
  }
  function setDotColor(distance, radius, color, i, j) {
    if (distance < radius) {
      particles[i].color = color
      particles[j].color = color
    }
  }
  function connectParticles(color) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        // reset all lines color
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        // reset all particles color
        particles[i].color = 'rgba(255, 255, 255, 0.1)'
        particles[j].color = 'rgba(255, 255, 255, 0.1)'

        let dx, dy, distance

        dx = particles[i].x - particles[j].x
        dy = particles[i].y - particles[j].y
        distance = Math.sqrt(dx * dx + dy * dy)

        context.beginPath()
        // draw lines
        if (distance < opt.offset * 2) {
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
        setDotColor(distance, 200, color, i, j)
        setStrokeStyle(distance, 200, color)

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

      connectParticles(touchColor)

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
  useCanvas({ sketch: () => sketch })

  useNotification({
    message: 'Move mouse to push particles',
  })

  return ''
}
export default Canvas
