import { VStack } from '@chakra-ui/layout'
import Canvas2dButton from './canvas2dButton'
import GithubButton from './githubButton'
import GLSLButton from './glslButton'
import MenuButton from './menuButton'
import SampleButton from './samplesButton'
import ThreeButton from './threeButton'

type MenuProps = {
  mainLayout?: Boolean
}

const Menu = ({ mainLayout }: MenuProps) => {
  return (
    <VStack
      spacing={1}
      pos="relative"
      zIndex={999}
      p={1}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Canvas2dButton />
      <ThreeButton />
      <GLSLButton />
      <SampleButton />
      {!mainLayout && <MenuButton />}
      <GithubButton link="https://github.com/malashevskyi/canvas" />
    </VStack>
  )
}

export default Menu
