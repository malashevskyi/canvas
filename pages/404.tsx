import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NotFoundLayout from '../layout/notFound'
import { mainActions } from '../store'

type NotFoundProps = {
  title: string
}

const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainActions.resetSpinner())
  }, [])

  const onClickHandler = () => (event: MouseEvent) => {
    event.preventDefault()
    const text = 'Loading main page assets. \n Please wait.'

    dispatch(mainActions.setSpinner(text))

    setTimeout(() => {
      router.replace('/')
    }, 500)
  }

  return (
    <NotFoundLayout title="Page is not found!">
      <div className="not-found">
        <h1 className="not-found--title">
          {title ? title : 'Page '} Not Found
        </h1>
        <a href="/" className="not-found--link" onClick={onClickHandler}>
          Go to all animations
        </a>
      </div>
    </NotFoundLayout>
  )
}

export default NotFound
