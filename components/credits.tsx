import { Box, Center, Link } from '@chakra-ui/react'

type CreditsProps = {
  link: string
  name?: string
  type: string
}
export type CreditProps = {
  link: string
  name: string
}

const CreditLink = ({ link, name }: CreditProps) => {
  return (
    <Link
      href={link}
      px={1}
      color="blue.400"
      _hover={{ color: 'blue.600' }}
      isExternal
    >
      {name}
    </Link>
  )
}

const Credits = ({ link, name, type }: CreditsProps) => {
  if (!type) return null

  let credits: JSX.Element

  switch (type) {
    case 'video':
      credits = (
        <Box>
          Inspired by the
          <CreditLink link={link} name="video" />
        </Box>
      )
      break
    case 'codepen':
      credits = (
        <Box>
          Inspired by the
          <CreditLink link={link} name="codepen" />
        </Box>
      )
      break
    case 'codesandbox':
      credits = (
        <Box>
          Inspired by the
          <CreditLink link={link} name="codesandbox" />
        </Box>
      )
      break
    case 'unsplash':
      credits = (
        <Box>
          Photo by
          <CreditLink link={link} name={name} />
          on
          <CreditLink link="https://unsplash.com/" name="Unsplash" />
        </Box>
      )
      break
    case 'article':
      credits = (
        <Box>
          Inspired by the
          <CreditLink link={link} name="article" />
        </Box>
      )
      break
  }

  return (
    <Center borderTop="solid 1px" borderColor="gray.200" w="100%">
      <Box as="h3" letterSpacing="1px" textAlign="center" pt={3}>
        Credits: <br />
        {credits}
      </Box>
    </Center>
  )
}

export default Credits
