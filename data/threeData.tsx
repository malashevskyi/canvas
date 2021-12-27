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
  '2021-12-23': {
    number: 63,
    tags: ['sphere', 'torus'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/three/2021-12-23',
  },
}

export default threeData
