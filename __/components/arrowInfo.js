import { Button } from '@chakra-ui/button'
import { Center } from '@chakra-ui/layout'

const ArrowInfo = ({ onClick, additionalOpen }) => (
  <Center pos="fixed" top="-32px" left="0" zIndex="99999" w="100%">
    <Button isActive={additionalOpen} onClick={onClick}>
      Additional
    </Button>
  </Center>
)
export default ArrowInfo
