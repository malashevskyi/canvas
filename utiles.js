export const clearCanvas = (type) => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext(type)

  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  context.globalAlpha = 1
}
