import { Box } from '@chakra-ui/react'
import Image from 'next/image'

const Preview = ({ title, name, src, index, ...props }) => {
  return (
    <Box
      w="300px"
      height="123px"
      pos="relative"
      overflow="hidden"
      objectFit="cover"
      bg="white"
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
      <Image
        src={src}
        alt={title}
        layout="fill"
        objectFit="cover"
        priority={index < 10}
      />
    </Box>
  )
}

export default Preview
