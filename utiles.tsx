export const resetCanvas = (type = '2d') => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const canvasGL = document.getElementById('canvasGL') as HTMLCanvasElement

  if (type === 'webgl') {
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

export const destroyObjects = (manager) => {
  manager.unload()

  window['timelines'].forEach((timeline) => {
    timeline.kill()
  })
  setTimeout(() => {
    window['timelines'].length = 0
  })
}
