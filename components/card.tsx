import { Badge, VStack, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { mainActions } from '../store'
import Preview from './preview'

const Card = ({
  index,
  indexInItem,
  width,
  height,
  date,
  margin,
  tags,
  link,
  id,
  title,
  src,
  scrollDirection,
  anmRenderFirstScreen,
}) => {
  const yAnmUp = -30 * indexInItem - 50
  const router = useRouter()
  let yAnmDown = 30 * indexInItem + 50
  let delay = indexInItem / 100

  const dispatch = useDispatch()

  if (anmRenderFirstScreen) {
    yAnmDown += index * 4
    delay = index / 50
  }

  const onCardClickHandler = (e) => {
    e.preventDefault()
    const text = 'Loading data for all canvases. \n Please wait.'
    dispatch(mainActions.setSpinner(text))
    router.push(link)
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: scrollDirection === 'down' ? yAnmDown : yAnmUp,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
      }}
    >
      <div key={index} className="card" style={{ width, height, margin }}>
        <Link href={link}>
          <a onClick={onCardClickHandler}>
            <VStack
              as="h2"
              alignItems="flex-start"
              spacing={1}
              p={1}
              pos="absolute"
              top={0}
              left="0"
              zIndex={2}
              mt="2px"
              ml="2px"
              flexWrap="wrap"
              willChange="transform"
              transition="transform .3s ease"
            >
              {tags.map((tag) => (
                <Box
                  color="blue.500"
                  fontSize="11px"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  fontWeight="600"
                  bg="white"
                  px={1}
                  borderRadius="2px"
                >
                  {tag}
                </Box>
              ))}
            </VStack>
            <Badge
              as="time"
              dateTime={date}
              pos="absolute"
              right={1}
              bottom={1}
              letterSpacing="2px"
              fontSize="9px"
              color="gray.600"
              zIndex={2}
            >
              {date.slice(0, 10)}
            </Badge>
            <Preview src={src} name={id} title={title} />
          </a>
        </Link>
      </div>
    </motion.div>
  )
}

export default Card
