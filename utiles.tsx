export const resetCanvas = (type = '2d') => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const canvasGL = document.getElementById('canvasGL') as HTMLCanvasElement

  if (type === 'webgl' || type === 'all') {
    canvasGL.style.display = 'block'
    canvas.style.display = 'none'
  } else {
    if (canvas) {
      canvas.style.display = 'block'
      canvasGL.style.display = 'none'
    }
    const context = canvas.getContext('2d')
    context.globalAlpha = 1
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
}
