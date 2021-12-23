import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const GLSLButton = () => {
  const router = useRouter()

  return (
    <NextLink href="/glsl">
      <Button isActive={router.pathname.includes('glsl')} as={Link}>
        GLSL animations
      </Button>
    </NextLink>
  )
}

export default GLSLButton
