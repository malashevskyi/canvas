import random from 'canvas-sketch-util/random'
import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'
import Triangle from './Triangle'
import trianglesPoints from './trianglesPoints'

const sketch = ({ context, width, height }) => {
  const triangles = []

  function getTriangles() {
    const angle = (Math.PI * 2) / trianglesPoints.length
    const radius = Math.sqrt(width * width + height * height) / 2
    trianglesPoints.forEach((array, i) => {
      const radiusM = radius + radius * 0.2 * Math.random()
      const a = 70

      triangles.push(
        new Triangle({
          context,
          position: {
            x1: array[0],
            y1: array[1],
            x2: array[2],
            y2: array[3],
            x3: array[4],
            y3: array[5],
          },
          sin: Math.sin(angle * (i + a)) * radiusM,
          cos: Math.cos(angle * (i + a)) * radiusM,
        })
      )
    })
  }

  function animateParticles() {
    triangles.forEach((triangle) => {
      window['timelines'].push(
        gsap.to(triangle, {
          duration: 3,
          x1: triangle.fromX1,
          y1: triangle.fromY1,
          x2: triangle.fromX2,
          y2: triangle.fromY2,
          x3: triangle.fromX3,
          y3: triangle.fromY3,
          delay: random.range(0, 2),
          repeat: -1,
          repeatDelay: 2.5,
          yoyo: true,
          ease: 'power2.in',
        })
      )
    })
  }

  if (triangles.length === 0) {
    getTriangles()
    animateParticles()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)
    context.clearRect(0, 0, width, height)

    context.save()
    context.translate(width / 2 - 283, height / 2 - 274)

    triangles.forEach((triangle) => {
      triangle.draw()
    })

    context.fill()
    context.restore()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
