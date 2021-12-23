import { Box, Image } from '@chakra-ui/react'

const Preview = ({ title, name, src, ...props }) => {
  return (
    <Box
      w="300px"
      height="123px"
      pos="relative"
      bg="white"
      overflow="hidden"
      objectFit="cover"
      {...props}
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        w: '100%',
        h: '100%',
        bg: 'blue.500',
        opacity: 0.1,
        zIndex: 1,
      }}
    >
      <Image w="auto" h="100%" mr="auto" src={src} alt={title} layout="fill" />
    </Box>
  )
}

export default Preview
