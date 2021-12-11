import gsap from 'gsap'
import useCanvas from '../../hooks/useCanvas'

const sketch = ({ context, width, height }) => {
  const ys = Array(8).fill(0)
  const alpha = Array(8).fill(0)
  let tick = 0

  // move from bottom and top to center
  ys.forEach((_, i) => {
    window['timelines'].push(
      gsap.from(ys, {
        duration: 2,
        delay: i / 2,
        [i]: i % 2 === 0 ? -height / 2 : height / 2,
        ease: 'power3.out',
      })
    )
  })
  // animate opacity
  alpha.forEach((_, i) => {
    window['timelines'].push(
      gsap.to(alpha, {
        duration: 2,
        delay: i / 2 + 0.5,
        [i]: 1,
        ease: 'power3.out',
      })
    )
  })

  const paths = [
    /* C */ new Path2D(
      'M82.3,63.2C75,75.5,61.4,84.5,44.2,84.5C18.6,84.5,0,65.8,0,41.6C0,19,18.6,0,44.2,0 c17.4,0,31.1,8.2,38.4,20.4l-16.7,9.7C62,22.7,54.5,17.8,44.2,17.8c-14.3,0-24.2,10.4-24.2,23.9c0,13,10,24.4,24.2,24.4 c10.1,0,17.5-5.2,21.5-12.4L82.3,63.2z'
    ),
    /* R */ new Path2D(
      'M68.5,30.6c0,11.8-5.8,21.7-14.5,26.4l16.8,24.6H46.3L34.1,61.3H19.7v20.3H0V0h39.5C56,0,68.5,12.8,68.5,30.6z M19.7,18.2v24.8h16.9c6.7,0,12.1-5.6,12.1-12.5c0-6.7-5.4-12.4-12-12.4H19.7z'
    ),
    /* E */ new Path2D(
      'M62.5,0v18.2H19.7v14h35.8v17H19.7v14h42.8v18.2H0V0H62.5z'
    ),
    /* A */ new Path2D(
      'M65.6,68.9H26.3l-5.4,12.7H0L34.9,0h22l35,81.6h-21L65.6,68.9z M58.8,52.8L46.1,22.3l-13,30.5H58.8z'
    ),
    /* T */ new Path2D('M77.8,18.2H48.8v63.4H28.9V18.2H0V0h77.8V18.2z'),
    /* I */ new Path2D('M19.7,81.6H0V0h19.7V81.6z'),
    /* V */ new Path2D('M57.7,81.6H36.1L0,0h21.7L47,58.3L72.2,0H94L57.7,81.6z'),
    /* E */ new Path2D(
      'M62.5,0v18.2H19.7v14h35.8v17H19.7v14h42.8v18.2H0V0H62.5z'
    ),
  ]
  const xPositions = [0, 62, 118, 146, 201, 259, 257, 315]

  function drawLetter(i) {
    context.save()
    context.globalAlpha = alpha[i]
    context.fillStyle = `hsl(${tick + 10 * i}, 50%, 50%)`
    context.translate(xPositions[i], ys[i])
    context.fill(paths[i])
    context.restore()
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)

    tick += 1

    context.clearRect(0, 0, width, height)
    context.translate(width / 2 - 420, height / 2 - 100)

    context.scale(2, 2)

    context.beginPath()
    context.globalCompositeOperation = 'multiply'

    xPositions.forEach((_, i) => drawLetter(i))

    context.closePath()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch })

  return ''
}
export default Canvas
