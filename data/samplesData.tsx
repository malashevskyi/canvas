type PostType = {
  number: number
  tags: Array<string>
  credits: () => null | JSX.Element
  github: string
}

interface PostsType {
  [key: string]: PostType
}

const threeData: PostsType = {
  '1_test': {
    number: null,
    tags: ['test'],
    credits: () => null,
    github: '',
  },
  '2021-12-28_3': {
    number: null,
    tags: ['glsl', 'loop', 'rotation'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-28_3',
  },
  '2021-12-28_2': {
    number: null,
    tags: ['glsl', 'logo'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-28_2',
  },
  '2021-12-28_1': {
    number: null,
    tags: ['glsl', 'normalize'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-28_1',
  },
  '2021-12-27_8': {
    number: null,
    tags: ['glsl', 'mod', 'offset'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_8',
  },
  '2021-12-27_7': {
    number: null,
    tags: ['glsl', 'rotation', 'flower'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_7',
  },
  '2021-12-27_6': {
    number: null,
    tags: ['glsl', 'rotation'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_6',
  },
  '2021-12-27_5': {
    number: null,
    tags: ['glsl', 'fract'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_5',
  },
  '2021-12-27_4': {
    number: null,
    tags: ['glsl', 'distance'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_4',
  },
  '2021-12-27_3': {
    number: null,
    tags: ['glsl', 'distance'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_3',
  },
  '2021-12-27_2': {
    number: null,
    tags: ['glsl', 'mix'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_2',
  },
  '2021-12-27_1': {
    number: null,
    tags: ['glsl', 'mix'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-27_1',
  },
  '2021-12-26_2': {
    number: null,
    tags: ['raycaster', 'intersects', 'hover'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-26_2',
  },
  '2021-12-26_1': {
    number: null,
    tags: ['raycaster', 'intersects'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-26_1',
  },
  '2021-12-25': {
    number: null,
    tags: ['particles', 'three.js'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/samples/2021-12-25',
  },
}

export default threeData
