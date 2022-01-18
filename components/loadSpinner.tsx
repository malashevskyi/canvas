import { Box, Center } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const LoadSpinner = () => {
  const state = useSelector((state: RootState) => state)
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bg="#ffffff"
      zIndex={99}
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={state.root.spinnerIsActive ? 1 : 0}
      transition="opacity .35s ease"
      pointerEvents="none"
    >
      {/* {state.root.spinnerText && ( */}
      {/* <Center as="h4" pos="absolute" textAlign="center" pt="130px"> */}
      {/* <pre>{state.root.spinnerText}</pre> */}
      {/* </Center> */}
      {/* )} */}
      <div className="loader">Loading...</div>
    </Box>
  )
}

export default LoadSpinner
