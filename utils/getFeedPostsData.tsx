import path from 'path'
import fs from 'fs'
import { FeedDataType } from '../types'

function getFeedPostsData(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', fileName)
  const dataRes = fs.readFileSync(filePath).toString()
  const dataParsed = JSON.parse(dataRes)
  const data: FeedDataType[] = []

  Object.keys(dataParsed).forEach((key) => {
    const post = dataParsed[key]

    data.push({
      id: key,
      title: 'Canvas animation - ' + post.tags.join(', '),
      tags: post.tags,
    })
  })

  return data
}

export default getFeedPostsData
