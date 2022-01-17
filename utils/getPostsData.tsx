import path from 'path'
import fs from 'fs'

function getPostsData(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', fileName)
  const dataRes = fs.readFileSync(filePath).toString()
  const data = JSON.parse(dataRes)

  return data
}

export default getPostsData
