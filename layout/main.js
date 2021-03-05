import Head from 'next/head';

import LoadSpinner from '../components/loadSpinner';

const MainLayout = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="keywords" content="Canvas, animation" />
      <meta name="description" content="Canvas animations" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://canvas-phi-fawn.vercel.app/" />
      <meta
        property="og:image"
        content="https://canvas-phi-fawn.vercel.app/images/main-og.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content="Canvas animations" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/favicons/${1}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/favicons/${1}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/favicons/${1}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`/favicons/${1}/site.webmanifest`} />
    </Head>
    <div className="main">{children}</div>
    <LoadSpinner />
  </>
);

export default MainLayout;
