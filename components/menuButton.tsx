import { useContext } from 'react'

import { MenuIsOpenContext } from '../context/menuIsOpenContext'
import { Button } from '@chakra-ui/button'

const MenuButton = () => {
  const { isOpen, setIsOpen } = useContext(MenuIsOpenContext)

  return (
    <Button isActive={isOpen} onClick={() => setIsOpen(!isOpen)}>
      Menu
    </Button>
  )
}

export default MenuButton
