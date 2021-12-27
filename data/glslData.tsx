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
  '2021-12-28_1': {
    number: 67,
    tags: ['loop', 'circles'],
    credits: () => null,
    github: '',
  },
  '2021-12-27_3': {
    number: 66,
    tags: ['fract', 'scale'],
    credits: () => null,
    github: '',
  },
  '2021-12-27_2': {
    number: 65,
    tags: ['spot'],
    credits: () => null,
    github: '',
  },
  '2021-12-27_1': {
    number: 64,
    tags: ['random'],
    credits: () => null,
    github: '',
  },
}

export default glslData
