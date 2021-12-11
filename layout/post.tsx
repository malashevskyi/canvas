import Head from 'next/head'
import { useCallback, useState } from 'react'
import Additional from '../components/additional'
import LoadSpinner from '../components/loadSpinner'
import Menu from '../components/menu'
import Navbar from '../components/navbar'
import MenuIsOpenProvider from '../context/menuIsOpenContext'
import postsData from '../data/canvas2dData'

const PostLayout = ({ children, postTitle, postDescription, tags, url }) => {
  return (
    <>
      <Head>
        <title>{postTitle}</title>
        <meta name="keywords" content={`Canvas, animation, ${tags}`} />
        <meta name="description" content={postDescription} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://canvas-phi-fawn.vercel.app/${url}`}
        />
        <meta
          property="og:image"
          content="https://canvas-phi-fawn.vercel.app/images/post-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={postTitle} />
        <meta property="og:description" content={postDescription} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`/favicons/site.webmanifest`} />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"
        />
      </Head>
      <LoadSpinner />
      <MenuIsOpenProvider>
        <Navbar canvasNames={Object.keys(postsData)} />
        {children}
        <Menu />
      </MenuIsOpenProvider>
      <Additional />
    </>
  )
}

export default PostLayout
