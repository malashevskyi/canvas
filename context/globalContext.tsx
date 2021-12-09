import React, { createContext, useEffect, useState } from 'react'
import gsap from 'gsap'

type Manager = {
  unload: () => void
}

type StateType = {
  manager: Manager
  canvas2D: HTMLCanvasElement
  context2D: CanvasRenderingContext2D
  timelines: typeof gsap[]
}

const initialState: StateType = {
  manager: { unload: () => {} },
  canvas2D: null,
  context2D: null,
  timelines: [],
}

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>

  const defaultUpdate: UpdateType = () => defaultValue

  return createContext({
    state: defaultValue,
    dispatch: defaultUpdate,
  })
}

export const GlobalContext = createCtx(initialState)

const GlobalContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useState(initialState)

  // useEffect(() => {

  // }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
