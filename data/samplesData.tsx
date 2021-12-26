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
  '2021-12-25': {
    number: null,
    tags: ['particles'],
    credits: () => null,
    github: '',
  },
}

export default threeData
