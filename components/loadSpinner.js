import { useContext } from 'react'

import { LoadSpinnerContext } from '../context/loadSpinnerContext'
import { Box, Center } from '@chakra-ui/layout'

const LoadSpinner = () => {
  const [spinner] = useContext(LoadSpinnerContext)

  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bg="#ffffff"
      zIndex={999999999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={spinner.active ? 1 : 0}
      transition="opacity .35s ease"
      pointerEvents="none"
    >
      {spinner.text && (
        <Center as="h4" pos="absolute" textAlign="center" pt="130px">
          <pre>{spinner.text}</pre>
        </Center>
      )}
      <div className="loader">Loading...</div>
    </Box>
  )
}

export default LoadSpinner
