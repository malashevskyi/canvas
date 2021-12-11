import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Canvas2dButton = () => {
  return (
    <NextLink href="/">
      <Button as={Link}>Canvas2d animations</Button>
    </NextLink>
  )
}

export default Canvas2dButton
