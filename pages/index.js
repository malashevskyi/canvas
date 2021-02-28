import { List } from 'react-virtualized';
import gsap from 'gsap';

import postsData from '../data/postsData';
import useWindowSize from '../hooks/useWindowSize';
import Card from '../components/card';

import 'react-virtualized/styles.css';

const gapSize = 10;
const cardHeight = 130;
const cardWidth = 290;
const tls = [];

function rowRenderer( dataArr, columnCount, { key, index, style }) {

  // This is the range of cards visible on this row, given the current width:
  const startIndex = index * columnCount;
  const stopIndex = Math.min(
    dataArr.length - 1, // last item
    startIndex + columnCount - 1
  );

  // count of cards in one row 
  const cards = [];

  for (let i = startIndex; i <= stopIndex; i++) {
    const cardData = dataArr[i];
    const title = dataArr[i].title;
    const id = dataArr[i].id;

    console.log(cardData);

    cards.push(<Card
      index={i}
      width={cardWidth}
      height={cardHeight - 10} // - margin
      date={id}
      margin={`0 ${gapSize / 2}px`}
      link={`/post/${dataArr[i].id}`}
      title={title}
      id={id}
      />);
  }

  return (
    <div className="item" key={key} style={style}>
      {cards}
    </div>
  );
}

function getPostsDataArray(obj) {
  const data = [];

  Object.keys(obj).forEach(key => {
    data.push({
      id: key,
      title: 'Canvas animation - ' + obj[key].tags.join(', ')
    });
  });

  return data;
}

const Index = ({ comments, postsData }) => {
  const dataArr = getPostsDataArray(postsData);

  // set initial dimensions to detect how many card render on server side;
  // render 42 cards -- 6 columns * 6 rows (+ 6 card auto adding, one to each column)
  const size = useWindowSize({
    width: 1910, // 6 * card width
    height: 780 // 6 * card height
  });
  
  const columnCount = Math.floor( (size.width - gapSize) / (cardWidth + gapSize) );
  const rowCount = Math.ceil(dataArr.length / columnCount);

  return (
    <div className="main">
      <List
        width={size.width}
        height={size.height}
        rowCount={rowCount}
        rowHeight={cardHeight}
        rowRenderer={(rowArgs) => rowRenderer( dataArr, columnCount, rowArgs )}
        overscanRowCount={0}
      />
    </div>
  );
};

Index.getInitialProps = async function() {
  return {
    postsData
  };
}

export default Index;
