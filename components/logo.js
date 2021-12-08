import { useContext } from 'react'
import { useRouter } from 'next/router'
import { LoadSpinnerContext } from '../context/loadSpinnerContext'
import { Button } from '@chakra-ui/button'
import Link from 'next/link'

const Logo = () => {
  const router = useRouter()
  const [, setSpinner] = useContext(LoadSpinnerContext)

  const onLogoClickHandler = (e) => {
    e.preventDefault()

    setSpinner({
      active: true,
      text: 'Loading main page assets. \n Please wait.',
    })

    router.push('/')
  }

  return (
    <Link href="/">
      <Button onClick={onLogoClickHandler}>Animations</Button>
    </Link>
  )
}

export default Logo
