type PostType = {
  number: number
  tags: Array<string>
  credits: () => null | JSX.Element
  github: string
}

interface PostsType {
  [key: string]: PostType
}

const glslData: PostsType = {
  '2021-12-11': {
    number: 63,
    tags: ['glitch'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/glsl/2021-12-11',
  },
}

export default glslData
