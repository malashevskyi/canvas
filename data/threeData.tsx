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
  '2021-12-23': {
    number: 63,
    tags: ['three TEST'],
    credits: () => null,
    github: 'TEST',
  },
}

export default glslData
