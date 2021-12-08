import Logo from './logo'
import GithubButton from './githubButton'
import MenuButton from './menuButton'
import { HStack } from '@chakra-ui/layout'

const Menu = () => (
  <HStack spacing={1} p={1} justifyContent="flex-start">
    <MenuButton />
    <Logo />
    <GithubButton link="https://github.com/malashevskyi/canvas" />
  </HStack>
)

export default Menu
