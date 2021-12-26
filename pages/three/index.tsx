import { Flex } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { List } from 'react-virtualized'
import 'react-virtualized/styles.css'
import Card from '../../components/card'
import glslData from '../../data/threeData'
import useWindowSize from '../../hooks/useWindowSize'
import MainLayout from '../../layout/main'
import { mainActions } from '../../store'

const gapSize = 10
const cardHeight = 130
const cardWidth = 290

type RowArgs = {
  key: string
  index: number
  style: React.CSSProperties
}
type DataType = {
  id: string
  title: string
  tags: string[]
}

function rowRenderer(
  scrollDirection: string,
  dataArr: Array<DataType>,
  columnCount: number,
  anmRenderFirstScreen: boolean,
  { key, index, style }: RowArgs
) {
  // This is the range of cards visible on this row, given the current width:
  const startIndex = index * columnCount
  const stopIndex = Math.min(
    dataArr.length - 1, // last item
    startIndex + columnCount - 1
  )

  // count of cards in one row
  const cards = []

  for (let i = startIndex; i <= stopIndex; i++) {
    const data = dataArr[i]

    if (!data) continue

    const { title, id, tags } = data

    const date = id.slice(0, 10)

    cards.push(
      <Card
        index={i}
        indexInItem={i - startIndex}
        width={cardWidth}
        height={cardHeight - 10} // - margin
        date={date}
        margin={`0 ${gapSize / 2}px`}
        link={`/three/${id}`}
        title={title}
        id={id}
        tags={tags}
        src={`/images/three-previews/${id}.png`}
        scrollDirection={scrollDirection}
        anmRenderFirstScreen={anmRenderFirstScreen}
      />
    )
  }

  return (
    <Flex key={key} align="center" justify="center" style={style}>
      {cards}
    </Flex>
  )
}

type IndexProps = {
  glslDataServer: DataType[]
}

const Index: React.FC<IndexProps> = ({ glslDataServer }) => {
  const [scrollListTop, setScrollListTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')

  // more powerful animation on the first render for first screen cards
  const [anmRenderFirstScreen, setAnmRenderFirstScreen] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainActions.resetSpinner())

    // more lighter animation for new cards to be displayed when scrolling
    setTimeout(() => {
      setAnmRenderFirstScreen(false)
    }, 1000)
  }, [])

  // set initial dimensions to detect how many card render on server side;
  // render 42 cards -- 6 columns * 6 rows + 6 card auto adding, one to each column
  const size = useWindowSize({
    width: 1910, // 6 * card width
    height: 780, // 6 * card height
  })

  const columnCount = Math.floor((size.width - gapSize) / (cardWidth + gapSize))
  const rowCount = Math.ceil(glslDataServer.length / columnCount)

  const onListScrollHandler = ({ scrollTop }: { scrollTop: number }) => {
    if (scrollTop < scrollListTop) {
      setScrollDirection('up')
    } else {
      setScrollDirection('down')
    }
    setScrollListTop(scrollTop)
  }

  return (
    <MainLayout title="Canvas animations">
      <List
        width={size.width}
        height={size.height}
        rowCount={rowCount}
        onScroll={onListScrollHandler}
        rowHeight={cardHeight}
        overscanRowCount={0}
        rowRenderer={(rowArgs) =>
          rowRenderer(
            scrollDirection,
            glslDataServer,
            columnCount,
            anmRenderFirstScreen,
            rowArgs
          )
        }
      />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data: DataType[] = []

  Object.keys(glslData).forEach((key) => {
    const post = glslData[key]

    if (post) {
      data.push({
        id: key,
        title: 'Canvas animation - ' + post.tags.join(', '),
        tags: post.tags,
      })
    }
  })

  return {
    props: { glslDataServer: data },
  }
}

export default Index
