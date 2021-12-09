import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'

import { LoadSpinnerContext } from '../context/loadSpinnerContext'

import NotFoundLayout from '../layout/notFound'

type NotFoundProps = {
  title: string
}

const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  const { dispatch: setSpinner } = useContext(LoadSpinnerContext)
  const router = useRouter()

  useEffect(() => {
    setSpinner({
      active: false,
      text: '',
    })
  }, [setSpinner])

  const onClickHandler = () => (event: MouseEvent) => {
    event.preventDefault()

    setSpinner({
      active: true,
      text: 'Loading main page assets. \n Please wait.',
    })

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
