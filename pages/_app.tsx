import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ReactNotification from 'react-notifications-component'
import GlobalContextProvider from '../context/globalContext'
import LoadSpinnerProvider from '../context/loadSpinnerContext'
import MenuIsOpenProvider from '../context/menuIsOpenContext'
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

const RouteIndicator = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter()

  // const [loading, setLoading] = useState(null)
  // const [timeoutId, setTimeoutId] = useState(null)

  const onRouteChangeStart = useCallback(() => {
    console.log('on route change start', router)
    // setLoading(true);
  }, [])

  const onRouteChangeDone = useCallback(() => {
    console.log('on route change done', router.pathname)
    // setLoading(false);
    // setTimeoutId(
    //   setTimeout(() => {
    //     setTimeoutId(null);
    //     setLoading(null);
    //   }, DONE_DURATION)
    // );
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeDone)
    router.events.on('routeChangeError', onRouteChangeDone)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeDone)
      router.events.off('routeChangeError', onRouteChangeDone)
    }
  }, [onRouteChangeDone, onRouteChangeStart, router.events])

  // useEffect(
  //   () => () => {
  //     if (timeoutId) clearTimeout(timeoutId)
  //   },
  //   [timeoutId]
  // )

  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // console.log('_________________', pageProps)
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

    if (pageProps.id) {
      resetCanvas()
    } else {
      hideCanvas()
    }
  })

  return (
    <RouteIndicator>
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
    </RouteIndicator>
  )
}

export default MyApp
