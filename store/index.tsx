import { configureStore, createSlice } from '@reduxjs/toolkit'
import gsap from 'gsap'

type Manager = {
  unload: () => void
}
type InitialStateType = {
  manager: Manager
  canvas2D: HTMLCanvasElement
  canvasGL: HTMLCanvasElement
  context2D: CanvasRenderingContext2D
  contextGL: WebGLRenderingContext
  timelines: typeof gsap[]
  spinnerIsActive: boolean
  spinnerText: string
  menuIsOpen: boolean
}

const initialState: InitialStateType = {
  manager: { unload: () => {} },
  canvas2D: null,
  canvasGL: null,
  context2D: null,
  contextGL: null,
  timelines: [],
  spinnerIsActive: false,
  spinnerText: '',
  menuIsOpen: true,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    newCanvasManager(state, action) {
      state.manager = action.payload
    },
    unloadCanvasManager(state) {
      state.manager.unload()
    },
    setCanvas2D(state, action) {
      state.canvas2D = action.payload
    },
    setCanvasGL(state, action) {
      state.canvasGL = action.payload
    },
    resetSpinner(state) {
      state.spinnerIsActive = false
      state.spinnerText = ''
    },
    setSpinner(state, action) {
      state.spinnerIsActive = true
      state.spinnerText = action.payload
    },
    setMenuIsOpen(state, action) {
      state.menuIsOpen = action.payload
    },
    destroyTimelines(state) {
      if (typeof window['timelines']) {
        window['timelines'].forEach((timeline) => {
          timeline.kill()
        })
        setTimeout(() => {
          window['timelines'].length = 0
        })
      }
    },
  },
})

export const mainActions = mainSlice.actions
const store = configureStore({
  reducer: {
    root: mainSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
export default store
export type RootState = ReturnType<typeof store.getState>
