import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useCanvasGL from '../../hooks/useCanvasGL'
import fragmentShader from './shaders/fs.frag'
import vertexShader from './shaders/vs.vert'

const sketch = ({ context, width, height }) => {
  const renderer = new THREE.WebGLRenderer({
    context,
  })

  const dat = require('dat.gui')
  const gui = new dat.GUI()
  gui.domElement.id = 'gui'

  renderer.setClearColor('#000', 1)

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
  camera.position.set(0, 0, -4)
  camera.lookAt(new THREE.Vector3())

  const controls = new OrbitControls(camera, context.canvas)

  const scene = new THREE.Scene()

  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/images/glsl-images/1.jpg', (image) => {
    console.log('image', image)
  })

  const geometry = new THREE.PlaneBufferGeometry(7, 3.5, 32, 32)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_frequency: { value: new THREE.Vector2(7, 5) },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_time: { value: 0 },
      u_texture: { value: texture },
      u_randomR: { value: 0 },
      u_randomG: { value: 0 },
      u_randomB: { value: 0 },
    },
  })
  material.side = THREE.DoubleSide
  const mesh = new THREE.Mesh(geometry, material)

  gui
    .add(material.uniforms.u_frequency.value, 'x')
    .min(0)
    .max(20)
    .step(0.01)
    .name('frequencyX')
  gui
    .add(material.uniforms.u_frequency.value, 'y')
    .min(0)
    .max(20)
    .step(0.01)
    .name('frequencyY')

  scene.add(mesh)

  const light = new THREE.PointLight(0xffffff, 0.5)
  light.position.set(2, 3, 4).multiplyScalar(1.5)
  scene.add(light)

  const glitchAnm = {
    randomRed: null,
    randomGreen: null,
    randomBlue: null,
  }
  let tick = 0
  let countdown1 = -20
  let countdown2 = -30
  let countdown3 = -40

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
    },

    render({ time }) {
      tick++

      if (tick % Math.floor(300 * Math.random()) === 0 && countdown1 <= 0) {
        glitchAnm.randomRed = Math.random() * 30 * Math.random()
        countdown1 += Math.random() * 30
      } else {
        if (glitchAnm.randomRed > 0 && glitchAnm.randomRed < 1)
          glitchAnm.randomRed -= Math.random() * 2
        else if (glitchAnm.randomRed >= 1)
          glitchAnm.randomRed -= Math.random() * 2
        else glitchAnm.randomRed = 0
        countdown1--
      }
      if (tick % Math.floor(300 * Math.random()) === 0 && countdown2 <= 0) {
        glitchAnm.randomGreen = Math.random() * 10 * Math.random()
        countdown2 += Math.random() * 30
      } else {
        if (glitchAnm.randomGreen > 0 && glitchAnm.randomGreen < 1.1)
          glitchAnm.randomGreen -= 0.2 * Math.random()
        else glitchAnm.randomGreen = 0
        countdown2--
      }
      if (tick % Math.floor(200 * Math.random()) === 0 && countdown3 <= 0) {
        glitchAnm.randomBlue = Math.random() * 10 * Math.random()
        countdown3 += Math.random() * 30
      } else {
        if (glitchAnm.randomBlue > 0 && glitchAnm.randomBlue < 1)
          glitchAnm.randomBlue -= Math.random() * 2
        else if (glitchAnm.randomBlue >= 1)
          glitchAnm.randomBlue -= Math.random() * 5
        else glitchAnm.randomBlue = 0
        countdown3--
      }

      material.uniforms.u_time.value = time
      material.uniforms.u_randomR.value = glitchAnm.randomRed
      material.uniforms.u_randomG.value = glitchAnm.randomGreen
      material.uniforms.u_randomB.value = glitchAnm.randomBlue

      controls.update()
      renderer.render(scene, camera)
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose()
    },
  }
}
function Canvas() {
  useCanvasGL({ sketch: () => sketch })

  return ''
}
export default Canvas
