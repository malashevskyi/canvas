import { Button } from '@chakra-ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../store'

const MenuButton = () => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const onToggleMenuHandler = () => {
    dispatch(mainActions.setMenuIsOpen(!state.menuIsOpen))
  }

  return (
    <Button isActive={state.menuIsOpen} onClick={onToggleMenuHandler}>
      Menu
    </Button>
  )
}

export default MenuButton
