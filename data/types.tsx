export type CreditDataType = {
  link?: string
  name?: string
  type?: string
}

export type PostType = {
  number: number
  tags: Array<string>
  credits: CreditDataType
  github: string
}

export interface PostsType {
  [key: string]: PostType
}
