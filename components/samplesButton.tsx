import { Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const SampleButton = () => {
  const router = useRouter()
  return (
    <NextLink href="/samples" passHref={true}>
      <Button isActive={router.pathname.includes('samples')} as={Link}>
        [samples / tests]
      </Button>
    </NextLink>
  )
}

export default SampleButton
