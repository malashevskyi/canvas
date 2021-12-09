import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import GlobalContextProvider from '../context/globalContext'
import LoadSpinnerProvider from '../context/loadSpinnerContext'
import MenuIsOpenProvider from '../context/menuIsOpenContext'
import postsData from '../data/postsData'
import '../styles/globals.sass'

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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (typeof router.query.id !== 'string') return

    const id = router.query.id

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
      console.clear()
      console.log('id', id)
      // if the post is not found
      if (!postsData[id]) hideCanvas()
      // if the post exists
      if (postsData[id]) resetCanvas()
    } else {
      // hide canvas on all other urls
      hideCanvas()
    }
  }, [router.query.id])

  return (
    <GlobalContextProvider>
      <LoadSpinnerProvider>
        <MenuIsOpenProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </MenuIsOpenProvider>
      </LoadSpinnerProvider>
      <ReactNotification />
    </GlobalContextProvider>
  )
}

export default MyApp
