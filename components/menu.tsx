import Canvas2dButton from './canvas2dButton'
import GithubButton from './githubButton'
import MenuButton from './menuButton'
import { HStack } from '@chakra-ui/layout'

const Menu = () => (
  <HStack spacing={1} p={1} justifyContent="flex-start">
    <Canvas2dButton />
    <MenuButton />
    <GithubButton link="https://github.com/malashevskyi/canvas" />
  </HStack>
)

export default Menu
