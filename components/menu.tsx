import { VStack } from '@chakra-ui/layout'
import Canvas2dButton from './canvas2dButton'
import GithubButton from './githubButton'
import GLSLButton from './glslButton'
import MenuButton from './menuButton'

const Menu = () => (
  <VStack spacing={1} p={1} justifyContent="flex-start" alignItems="flex-start">
    <Canvas2dButton />
    <GLSLButton />
    <MenuButton />
    <GithubButton link="https://github.com/malashevskyi/canvas" />
  </VStack>
)

export default Menu
