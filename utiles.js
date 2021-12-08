export const resetCanvas = (type) => {
  const canvas = document.getElementById('canvas')
  const canvasGL = document.getElementById('canvasGL')

  if (type === 'webgl') {
    canvasGL.style.display = 'block'
    canvas.style.display = 'none'
  } else {
    canvas.style.display = 'block'
    canvasGL.style.display = 'none'
    const context = canvas.getContext('2d')
    context.globalAlpha = 1
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
}

export const destroyObjects = (manager) => {
  manager.unload()

  window['timelines'].forEach((timeline) => {
    timeline.pause()
    timeline.kill()
  })
  setTimeout(() => {
    window['timelines'].length = 0
  })
}
