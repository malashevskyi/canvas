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
  '2021-12-06': {
    number: 62,
    tags: ['circle', 'rotate', 'clock'],
    credits: () => null,
    github:
      'https://github.com/malashevskyi/canvas/tree/master/canvases/2021-12-06',
  },
}

export default glslData
