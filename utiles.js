export const clearCanvas = (type) => {
  const canvas = document.getElementById('canvas')
  const canvasGL = document.getElementById('canvasGL')

  // context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  // context.globalAlpha = 1

  if (type === 'webgl') {
    canvasGL.style.display = 'none'
  } else {
    canvas.style.display = 'none'
  }
}
export const showCanvas = (type) => {
  const canvas = document.getElementById('canvas')
  const canvasGL = document.getElementById('canvasGL')

  if (type === 'webgl') {
    canvasGL.style.display = 'block'
  } else {
    canvas.style.display = 'block'
  }
}
