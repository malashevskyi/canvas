export type PostType = {
  number: number
  tags: Array<string>
  credits: () => null | JSX.Element
  github: string
}

export interface PostsType {
  [key: string]: PostType
}
