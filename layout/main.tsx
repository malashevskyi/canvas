import Head from 'next/head'
import LoadSpinner from '../components/loadSpinner'
import Menu from '../components/menu'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

function MainLayout({ title, children }) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  return (
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
        <meta name="theme-color" content="#ffffff" />

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
      </Head>
      <div className="main">
        <Box pos="fixed" zIndex={2} left={2} top={2}>
          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button p={2} h="40px">
                <Box as="span" pos="absolute" zIndex={-1}>
                  Menu
                </Box>
                <Box>
                  <Box
                    width="25px"
                    h="2px"
                    bg="white"
                    my="5px"
                    transition="transform 0.4s ease"
                    transform={
                      isOpen
                        ? 'rotate(-45deg) translate(-5px, 5px)'
                        : 'rotate(0deg)'
                    }
                  ></Box>
                  <Box
                    width="25px"
                    h="2px"
                    bg="white"
                    my="5px"
                    transition="transform 0.4s ease"
                    opacity={isOpen ? 0 : 1}
                  ></Box>
                  <Box
                    width="25px"
                    h="2px"
                    bg="white"
                    my="5px"
                    transition="transform 0.4s ease"
                    transform={
                      isOpen ? 'rotate(45deg) translate(-5px, -5px)' : ''
                    }
                  ></Box>
                </Box>
              </Button>
            </PopoverTrigger>
            <PopoverContent left={2}>
              <PopoverCloseButton />
              <PopoverBody>
                <Menu mainLayout={true} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        {children}
      </div>
      <LoadSpinner />
    </>
  )
}

export default MainLayout
