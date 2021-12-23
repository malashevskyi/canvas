import { Box, Link } from '@chakra-ui/react'

function article(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        article
      </Link>
    </Box>
  )
}
function photoUnsplash(name: string, link: string) {
  return (
    <Box>
      Photo by
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        {name}
      </Link>
      on
      <Link
        href="https://unsplash.com"
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        Unsplash
      </Link>
    </Box>
  )
}
function video(link: string) {
  return (
    <Box>
      Inspired by the&nbsp;
      <Link
        href={link}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        video
      </Link>
    </Box>
  )
}
function codesandbox(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        codesandbox
      </Link>
    </Box>
  )
}
function codepen(link: string) {
  return (
    <Box>
      Inspired by the
      <Link
        href={link}
        px={1}
        color="blue.400"
        _hover={{ color: 'blue.600' }}
        isExternal
      >
        codepen
      </Link>
    </Box>
  )
}

type PostType = {
  number: number
  tags: Array<string>
  credits: () => null | JSX.Element
  github: string
}

interface PostsType {
  [key: string]: PostType
}

const canvas2dData: PostsType = {
  '2021-12-06': {
    number: 62,
    tags: ['circle', 'rotate', 'clock'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-12-06',
  },
  '2021-11-22': {
    number: 61,
    tags: ['fractals', 'triangles'],
    credits: () => video('https://www.youtube.com/watch?v=bIfNwgUVjV8&t=438s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-11-22',
  },
  '2021-03-08': {
    number: 60,
    tags: ['logo', 'particles', 'create', 'firework'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-03-08',
  },
  '2021-03-04': {
    number: 59,
    tags: ['game', 'shoot', 'circles', 'guns'],
    credits: () => video('https://www.youtube.com/watch?v=52rKp7P3gIs'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-03-04',
  },
  '2021-02-26': {
    number: 58,
    tags: ['text', 'blend', 'gradient'],
    credits: () => video('https://www.youtube.com/watch?v=qP2pJdOb-i8'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-26',
  },
  '2021-02-25': {
    number: 57,
    tags: ['image', 'split'],
    credits: () =>
      photoUnsplash('Ivana Cajina', 'https://unsplash.com/@von_co'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-25',
  },
  '2021-02-24': {
    number: 56,
    tags: ['particles', 'chase', 'move'],
    credits: () => codepen('https://codepen.io/osublake/pen/qNPBpJ'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-24',
  },
  '2021-02-23': {
    number: 55,
    tags: ['circle', 'rotate', 'gradient', 'button'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-23',
  },
  '2021-02-22': {
    number: 54,
    tags: ['rects', 'rotate', 'gradient'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-22',
  },
  '2021-02-20': {
    number: 53,
    tags: ['join', 'burst', 'particles'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-20',
  },
  '2021-02-19': {
    number: 52,
    tags: ['move', 'image', 'push', 'creation', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=XGioNBHrFU4&t=17s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-19',
  },
  '2021-02-18': {
    number: 51,
    tags: ['pixels', 'blow', 'destruction', 'image'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-18',
  },
  '2021-02-17': {
    number: 50,
    tags: ['pixels', 'transformation', 'destruction'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-17',
  },
  '2021-02-16': {
    number: 49,
    tags: ['image', 'split'],
    credits: () =>
      photoUnsplash(
        'Jake Hills',
        'https://unsplash.com/@jakehills?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
      ),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-16',
  },
  '2021-02-15': {
    number: 48,
    tags: ['move', 'particles', 'connect', 'push', 'grid'],
    credits: () => video('https://www.youtube.com/watch?v=XGioNBHrFU4'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-15',
  },
  '2021-02-13-2': {
    number: 47,
    tags: ['move', 'particles', 'connect', 'attraction'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-13_2',
  },
  '2021-02-13-1': {
    number: 46,
    tags: ['move', 'particles', 'connect', 'push'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-13_1',
  },
  '2021-02-12-2': {
    number: 45,
    tags: ['move', 'particles', 'connect', 'push'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-12_2',
  },
  '2021-02-12-1': {
    number: 44,
    tags: ['move'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-12_1',
  },
  '2021-02-10': {
    number: 43,
    tags: ['dots', 'scale'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-10',
  },
  '2021-02-09': {
    number: 42,
    tags: ['pull', 'dots'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-09',
  },
  '2021-02-08': {
    number: 41,
    tags: ['touch', 'fight', 'color'],
    credits: () => video('https://www.youtube.com/watch?v=FOPw03-jNrs&t=24s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-08',
  },
  '2021-02-06': {
    number: 40,
    tags: ['pull', 'diagonal'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-06',
  },
  '2021-02-05': {
    number: 39,
    tags: ['lines', 'waves'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-05',
  },
  '2021-02-04': {
    number: 38,
    tags: ['dots', 'sine'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-04',
  },
  '2021-02-03': {
    number: 37,
    tags: ['gradient', 'waves'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-03',
  },
  '2021-02-02': {
    number: 36,
    tags: ['gradient', 'waves'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-02',
  },
  '2021-02-01': {
    number: 35,
    tags: ['neons', 'sine'],
    credits: () =>
      codesandbox(
        'https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235'
      ),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-02-01',
  },
  '2021-01-31': {
    number: 34,
    tags: ['neons', 'sine'],
    credits: () =>
      codesandbox(
        'https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235'
      ),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-31',
  },
  '2021-01-30': {
    number: 33,
    tags: ['waves'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-30',
  },
  '2021-01-29': {
    number: 32,
    tags: ['pyramid', 'triangle', 'square', 'dots'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-29',
  },
  '2021-01-28': {
    number: 31,
    tags: ['square', 'dots', 'rect', 'circle', 'destruction'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-28',
  },
  '2021-01-27': {
    number: 30,
    tags: ['square', 'dots', 'circle', 'destruction'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-27',
  },
  '2021-01-26': {
    number: 29,
    tags: ['square'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-26',
  },
  '2021-01-25': {
    number: 28,
    tags: ['numbers', 'scale'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-25',
  },
  '2021-01-24': {
    number: 27,
    tags: ['scatter', 'balls'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-24',
  },
  '2021-01-23': {
    number: 26,
    tags: ['move', 'circle', 'trail'],
    credits: () =>
      article('https://www.kirupa.com/canvas/creating_motion_trails.htm'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-23',
  },
  '2021-01-22': {
    number: 25,
    tags: ['waves', 'sine', 'draw'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-22',
  },
  '2021-01-21_1': {
    number: 24,
    tags: ['triangulation', 'heart', 'triangles', 'pulse'],
    credits: () => video('https://www.youtube.com/watch?v=LNSvO-jJhKg'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-21_1',
  },
  '2021-01-21_2': {
    number: 23,
    tags: ['triangulation', 'heart', 'triangles'],
    credits: () => video('https://www.youtube.com/watch?v=LNSvO-jJhKg'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-21_2',
  },
  '2021-01-20': {
    number: 22,
    tags: ['pulse', 'heart', 'jelly'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-20',
  },
  '2021-01-19': {
    number: 21,
    tags: ['circles', 'jelly', 'move'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-19',
  },
  '2021-01-18': {
    number: 20,
    tags: ['particles', 'tunnel', 'move'],
    credits: () => video('https://www.youtube.com/watch?v=5MUsKgU6i0I'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-18',
  },
  '2021-01-17-2': {
    number: 19,
    tags: ['burst', 'firework', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-17_2',
  },
  '2021-01-17-1': {
    number: 18,
    tags: ['burst', 'firework', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-17_1',
  },
  '2021-01-16': {
    number: 17,
    tags: ['rotate', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-16',
  },
  '2021-01-15': {
    number: 16,
    tags: ['swirl', 'particles', 'rotate'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-15',
  },
  '2021-01-14-1': {
    number: 15,
    tags: ['orbit'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-14_1',
  },
  '2021-01-14-2': {
    number: 14,
    tags: ['orbit'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-14_2',
  },
  '2021-01-13': {
    number: 13,
    tags: ['draw', 'ornament', 'sine', 'circle'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-13',
  },
  '2021-01-12': {
    number: 12,
    tags: ['particles', 'scale', 'draw'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-12',
  },
  '2021-01-11': {
    number: 11,
    tags: ['jelly', 'move', 'gooey'],
    credits: () => video('https://www.youtube.com/watch?v=XqB_Ulfpd0w'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-11',
  },
  '2021-01-10-2': {
    number: 10,
    tags: ['draw', 'sine', 'circle', 'rotate'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-10_2',
  },
  '2021-01-10-1': {
    number: 9,
    tags: ['draw', 'sine', 'circle', 'rotate'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-10_1',
  },
  '2021-01-09': {
    number: 8,
    tags: ['draw', 'circle', 'rotate'],
    credits: () => video('https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-09',
  },
  '2021-01-08': {
    number: 7,
    tags: ['jelly', 'move'],
    credits: () => video('https://www.youtube.com/watch?v=XqB_Ulfpd0w'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-08',
  },
  '2021-01-07': {
    number: 6,
    tags: ['particles', 'circle', 'burst'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-07',
  },
  '2021-01-06': {
    number: 5,
    tags: ['squares', 'flickering', 'grid'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-06',
  },
  '2021-01-05': {
    number: 4,
    tags: ['sky', 'flickering', 'fall'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-05',
  },
  '2021-01-04': {
    number: 3,
    tags: ['balls'],
    credits: () => video('https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-04',
  },
  '2021-01-03': {
    number: 2,
    tags: ['circle', 'rotate', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=D_BPilf_F8k'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-03',
  },
  '2021-01-02': {
    number: 1,
    tags: ['firework', 'burst', 'particles'],
    credits: () => video('https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s'),
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-01-02',
  },
}

export default canvas2dData