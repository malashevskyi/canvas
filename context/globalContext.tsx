import React, { createContext, useState } from 'react'
import gsap from 'gsap'

type Manager = {
  unload: () => void
}

type StateType = {
  manager: Manager
  canvas2D: HTMLCanvasElement
  canvasGL: HTMLCanvasElement
  context2D: CanvasRenderingContext2D
  contextGL: WebGLRenderingContext
  timelines: typeof gsap[]
}

const initialState: StateType = {
  manager: { unload: () => {} },
  canvas2D: null,
  canvasGL: null,
  context2D: null,
  contextGL: null,
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

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
