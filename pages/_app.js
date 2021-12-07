import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import { GlobalContextProvider } from '../context/globalContext'
import LoadSpinnerProvider from '../context/loadSpinnerContext'
import postsData from '../data/postsData'
import '../styles/globals.sass'

// const GlobalContext = createContext({})

// export function GlobalContextProvider({ children }) {
//   const [state, dispatch] = useState({
//     something: 'something',
//   })

//   return (
//     <GlobalContext.Provider value={[state, dispatch]}>
//       {children}
//     </GlobalContext.Provider>
//   )
// }

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const { id } = router.query
  useEffect(() => {
    const canvasContainer = document.querySelector('body > .container')

    const hideCanvas = () => {
      canvasContainer.setAttribute(
        'style',
        'opacity: 0; width: 0; height: 0; z-index: -1;'
      )
    }
    const resetCanvas = () => {
      canvasContainer.removeAttribute('style')
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
        <Component {...pageProps} />
      </GlobalContextProvider>
      <ReactNotification />
    </LoadSpinnerProvider>
  )
}

export default MyApp
