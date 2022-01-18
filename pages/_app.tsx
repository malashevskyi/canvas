import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Router, useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import { Provider, useDispatch } from 'react-redux'
import store, { mainActions } from '../store'
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

function App({ pageProps, Component }) {
  const dispatch = useDispatch()

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      dispatch(mainActions.resetSpinner())
    })
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

function Index({ Component, pageProps }: AppProps) {
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

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log(
            'Service Worker registration successful with scope: ',
            registration.scope
          )
        },
        (err) => {
          console.log('Service Worker registration failed: ', err)
        }
      )
    }
  }, [])

  return (
    <RouteIndicator>
      <Provider store={store}>
        <App pageProps={pageProps} Component={Component} />
        <ReactNotification />
      </Provider>
    </RouteIndicator>
  )
}

export default Index
