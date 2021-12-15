import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MainLayout from '../layout/main'
import { mainActions } from '../store'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const text = 'Loading main page assets. \n Please wait.'

    dispatch(mainActions.setSpinner(text))

    setTimeout(() => {
      router.push('/')
    }, 500)
  }, [router])

  return (
    <MainLayout title="Canvas animations">
      <h1>Canvas</h1>
      <h2>Canvas animations</h2>
    </MainLayout>
  )
}

export default Home
