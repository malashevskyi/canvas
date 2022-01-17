import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Canvas2dButton = () => {
  const router = useRouter()

  return (
    <NextLink href="/">
      <Button
        isActive={
          router.pathname.includes('canvas2d') || router.pathname === '/'
        }
        as={Link}
      >
        Canvas2d animations
      </Button>
    </NextLink>
  )
}

export default Canvas2dButton
