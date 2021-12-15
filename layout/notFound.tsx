import Head from 'next/head'
import LoadSpinner from '../components/loadSpinner'

const NotFoundLayout = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <LoadSpinner />
    {children}
  </>
)

export default NotFoundLayout
