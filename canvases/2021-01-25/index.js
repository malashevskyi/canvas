import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

import Numb from './Numb'
import useCanvas from '../../hooks/useCanvas'

const sketch = () => (initialProps) => {
  const { context } = initialProps
  let { height, width } = initialProps

  random.setSeed(1)

  const palette = random.pick(palettes)
  const numbs = []
  let tick = 0

  function addNumber() {
    if (numbs.length < 50 && tick % 10 === 0) {
      numbs.push(new Numb(context, palette))
    }
  }

  return (updatedProps) => {
    ;({ width, height } = updatedProps)
    tick += 1

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    addNumber()

    context.save()
    context.translate(width / 2, height - 50)
    for (let i = 0; i < numbs.length; i++) {
      const numb = numbs[i]
      if (numb.tick > 300) {
        numb.initial()
      }
      numb.render()
    }
    context.restore()
  }
}

function Canvas() {
  useCanvas({ sketch: () => sketch() })
  return ''
}

export default Canvas
