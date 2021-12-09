import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Logo = () => {
  return (
    <NextLink href="/">
      <Button as={Link}>Animations</Button>
    </NextLink>
  )
}

export default Logo
