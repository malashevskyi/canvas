import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'
import Particle from './Particle'

const sketch = ({ context, height, width }) => {
  const particles = []

  const opt = {
    offset: 0,
    offset2: 0,

    // increase to make an image bigger
    squaresCount: 20,

    squareWidth: 20,
    squareHeight: 20,
    screenRadius: Math.sqrt(width * width + height * height) / 2,
  }
  const image = new Image()
  image.src = '/images/canvas/lake1000-1000.jpg'

  image.onload = () => {
    for (let uX = 0; uX < opt.squaresCount; uX++) {
      for (let uY = 0; uY < opt.squaresCount; uY++) {
        const newParticle = new Particle({
          context,
          uX,
          uY,
          opt,
          image,
        })

        particles.push(newParticle)

        window['timelines'].push(
          gsap.to(newParticle, {
            x: 0,
            y: 0,
            duration: 5,
            repeatDelay: 1,
            delay: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          })
        )
      }
    }
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    context.clearRect(0, 0, width, height)

    context.translate(
      width / 2 -
        (opt.squaresCount * opt.squareWidth) / 2 -
        (opt.squaresCount * opt.offset) / 2,
      height / 2 -
        (opt.squaresCount * opt.squareHeight) / 2 -
        (opt.squaresCount * opt.offset) / 2
    )

    if (particles.length !== 0) {
      particles.forEach((particle) => {
        particle.update()
      })
    }
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
