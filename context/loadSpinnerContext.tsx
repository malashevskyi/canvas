import React, { createContext, useState, useEffect } from 'react'
import Router from 'next/router'

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>

  const defaultUpdate: UpdateType = () => defaultValue

  return createContext({
    state: defaultValue,
    dispatch: defaultUpdate,
  })
}

const initialState = {
  active: false,
  text: '',
}
export const LoadSpinnerContext = createCtx(initialState)

const LoadSpinnerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [spinner, setSpinner] = useState(initialState)

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      setSpinner({
        active: false,
        text: '',
      })
    })
  }, [])

  return (
    <LoadSpinnerContext.Provider
      value={{ state: spinner, dispatch: setSpinner }}
    >
      {children}
    </LoadSpinnerContext.Provider>
  )
}

export default LoadSpinnerProvider
