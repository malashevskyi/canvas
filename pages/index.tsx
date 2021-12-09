import { useState, useEffect, useContext } from 'react'
import { List } from 'react-virtualized'

import postsData from '../data/postsData'
import useWindowSize from '../hooks/useWindowSize'
import Card from '../components/card'
import { LoadSpinnerContext } from '../context/loadSpinnerContext'
import MainLayout from '../layout/main'

import 'react-virtualized/styles.css'
import { Flex } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'

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

    const { title, id } = data

    const date = id.slice(0, 10)

    cards.push(
      <Card
        index={i}
        indexInItem={i - startIndex}
        width={cardWidth}
        height={cardHeight - 10} // - margin
        date={date}
        margin={`0 ${gapSize / 2}px`}
        link={`/post/${id}`}
        title={title}
        id={id}
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
  postsDataServer: DataType[]
}

const Index: React.FC<IndexProps> = ({ postsDataServer }) => {
  const [scrollListTop, setScrollListTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')

  // more powerful animation on the first render for first screen cards
  const [anmRenderFirstScreen, setAnmRenderFirstScreen] = useState(true)

  const { dispatch: setSpinner } = useContext(LoadSpinnerContext)

  useEffect(() => {
    // remove loader
    setSpinner({
      active: false,
      text: '',
    })

    // more lighter animation for new cards to be displayed when scrolling
    setTimeout(() => {
      setAnmRenderFirstScreen(false)
    }, 1000)
  }, [setSpinner])

  // set initial dimensions to detect how many card render on server side;
  // render 42 cards -- 6 columns * 6 rows + 6 card auto adding, one to each column
  const size = useWindowSize({
    width: 1910, // 6 * card width
    height: 780, // 6 * card height
  })

  const columnCount = Math.floor((size.width - gapSize) / (cardWidth + gapSize))
  const rowCount = Math.ceil(postsDataServer.length / columnCount)

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
            postsDataServer,
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

  Object.keys(postsData).forEach((key) => {
    const post = postsData[key]

    if (post) {
      data.push({
        id: key,
        title: 'Canvas animation - ' + post.tags.join(', '),
      })
    }
  })

  return {
    props: { postsDataServer: data },
  }
}

export default Index
