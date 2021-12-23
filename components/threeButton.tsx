import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const ThreeButton = () => {
  const router = useRouter()
  return (
    <NextLink href="/three">
      <Button isActive={router.pathname.includes('three')} as={Link}>
        THREE.js animations
      </Button>
    </NextLink>
  )
}

export default ThreeButton
