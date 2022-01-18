import { VStack } from '@chakra-ui/layout'
import useWindowSize from '../hooks/useWindowSize'
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
  const { width } = useWindowSize()

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
      {!mainLayout && width >= 768 && <MenuButton />}
      <GithubButton link="https://github.com/malashevskyi/canvas" />
    </VStack>
  )
}

export default Menu
