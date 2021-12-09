import { createContext, useState, useEffect } from 'react'

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>

  const defaultUpdate: UpdateType = () => defaultValue

  return createContext({
    isOpen: defaultValue,
    setIsOpen: defaultUpdate,
  })
}

export const MenuIsOpenContext = createCtx(true)

const MenuIsOpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 1000)
  }, [])

  return (
    <MenuIsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuIsOpenContext.Provider>
  )
}

export default MenuIsOpenProvider
