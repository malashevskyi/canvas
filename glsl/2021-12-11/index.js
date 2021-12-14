import glsl from 'glslify'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useCanvasGL from '../../hooks/useCanvasGL'
import fragmentShader from './shaders/fs.frag'
import vertexShader from './shaders/vs.vert'

const frag = glsl(`
  precision highp float;

  uniform float time;
  varying vec2 vUv;

  void main () {
    vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(color, 1.0);
  }
`)

const tls = []

const sketch = ({ context }) => {
  const renderer = new THREE.WebGLRenderer({
    context: context,
  })
  // WebGL background color
  renderer.setClearColor('#000', 1)

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)

  camera.position.set(0, 0, 1)
  camera.lookAt(new THREE.Vector3())

  // Setup camera controller
  const controls = new OrbitControls(camera, context.canvas)

  // Setup your scene
  const scene = new THREE.Scene()

  const uniforms = {
    u_time: { value: 0 },
    u_randomR: { value: 0 },
    u_randomG: { value: 0 },
    u_randomB: { value: 0 },
    u_resolution: {
      value: [1000, 1000],
      // x: 0,
      // y: 0,
      // },
    },
    // texture: { value: texture },
    // u_size: { value: '' },
  }

  camera.position.x = 3

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    // wireframe: true,
  })
  // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
  // const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material)
  // mesh.scale.set(0.2)

  scene.add(mesh)

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
  // camera.position.x = -10

  // Specify an ambient/unlit colour
  // scene.add(new THREE.AmbientLight('white'))

  // Add some light
  // const light = new THREE.PointLight('white', 1, 15.5)
  // light.position.set(1, 1, 1).multiplyScalar(1.5)
  const loader = new THREE.ImageLoader()
  loader.load(
    // resource URL
    '/images/glsl-previews/1.jpg',

    // onLoad callback
    imageOnLoad,

    // onProgress callback currently not supported
    undefined,

    // onError callback
    function () {
      console.error('An error happened.')
    }
  )

  function imageOnLoad(image) {
    // use the image, e.g. draw part of it on a canvas
    // const context = canvas.getContext('2d')
    // const canvas = document.createElement('canvas')
    // context.drawImage(image, 100, 100)
    console.log('image', image)
  }
  // const texInfo = loadImageAndCreateTextureInfo('./sprite.jpg');

  // scene.add(light)
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
    resize({ pixelRatio, viewportWidth, viewportHeight, width, height }) {
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

      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      // camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
      material.uniforms.u_resolution.value.x = width
      material.uniforms.u_resolution.value.y = height
    },
    // And render events here
    render({ time }) {
      material.uniforms.u_time.value = time
      material.uniforms.u_randomR.value = glitchAnm.randomRed
      material.uniforms.u_randomG.value = glitchAnm.randomGreen
      material.uniforms.u_randomB.value = glitchAnm.randomBlue

      mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.01
      // mesh.rotation.y = time * ((10 * Math.PI) / 180)
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
