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
  '2021-12-26_2': {
    number: null,
    tags: ['raycaster', 'intersects', 'hover'],
    credits: () => null,
    github: '',
  },
  '2021-12-26_1': {
    number: null,
    tags: ['raycaster', 'intersects'],
    credits: () => null,
    github: '',
  },
  '2021-12-25': {
    number: null,
    tags: ['particles', 'three.js'],
    credits: () => null,
    github: '',
  },
}

export default threeData
