import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const GLSLButton = () => {
  return (
    <NextLink href="/glsl">
      <Button as={Link}>GLSL animations</Button>
    </NextLink>
  )
}

export default GLSLButton
