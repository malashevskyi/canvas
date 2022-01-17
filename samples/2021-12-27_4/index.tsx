import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useCanvasGL from '../../hooks/useCanvasGL'
import fragmentShader from './shaders/fs.frag'
import vertexShader from './shaders/vs.vert'

const sketch = ({ context, width, height }) => {
  const renderer = new THREE.WebGLRenderer({
    context,
  })

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
  camera.position.set(0, 0, -4)
  camera.lookAt(new THREE.Vector3())

  const controls = new OrbitControls(camera, context.canvas)

  const scene = new THREE.Scene()

  const geometry = new THREE.PlaneBufferGeometry(7, 3.5, 32, 32)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_time: { value: 0 },
    },
  })
  material.side = THREE.DoubleSide
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight)
      camera.aspect = viewportWidth / viewportHeight
      camera.updateProjectionMatrix()
    },

    render({ time }) {
      material.uniforms.u_time.value = time

      controls.update()
      renderer.render(scene, camera)
    },
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
