import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import { GlobalContextProvider } from '../context/globalContext'
import LoadSpinnerProvider from '../context/loadSpinnerContext'
import postsData from '../data/postsData'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.sass'

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'blue.300',
          color: 'white',
          borderRadius: '0',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          _hover: {
            bg: 'blue.600',
          },
          _active: {
            bg: 'blue.500',
            _hover: {
              bg: 'blue.600',
            },
          },
        },
      },
      defaultProps: {
        variant: 'solid',
        size: 'sm',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const { id } = router.query
  useEffect(() => {
    const canvasContainer = document.querySelector('body > .container')

    const hideCanvas = () => {
      canvasContainer?.setAttribute(
        'style',
        'opacity: 0; width: 0; height: 0; z-index: -1;'
      )
    }
    const resetCanvas = () => {
      canvasContainer?.removeAttribute('style')
    }

    if (router.pathname === '/post/[id]') {
      // if the post is not found
      if (!postsData[id]) hideCanvas()
      // if the post exists
      if (postsData[id]) resetCanvas()
    } else {
      // hide canvas on all other urls
      hideCanvas()
    }
  })

  return (
    <LoadSpinnerProvider>
      {/* eslint-disable-next-line */}
      <GlobalContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GlobalContextProvider>
      <ReactNotification />
    </LoadSpinnerProvider>
  )
}

export default MyApp
