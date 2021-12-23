import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const ThreeButton = () => {
  return (
    <NextLink href="/three">
      <Button as={Link}>THREE.js animations</Button>
    </NextLink>
  )
}

export default ThreeButton
