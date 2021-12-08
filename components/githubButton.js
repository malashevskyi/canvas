import { Button } from '@chakra-ui/button'
import { Link } from '@chakra-ui/layout'

const GithubButton = ({ link, ...props }) => {
  return (
    <Button {...props} color="white" p={3} href={link} as={Link} isExternal>
      Github
    </Button>
  )
}

export default GithubButton
