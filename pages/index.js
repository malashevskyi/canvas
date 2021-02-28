import Link from 'next/link';
import { Fragment, useRef, useEffect, useState, useMemo } from 'react';

import postsData from '../data/postsData';
// import { FixedSizeList as List } from 'react-window';
import { List } from 'react-virtualized';
import AutoSizer from "react-virtualized-auto-sizer";
import 'react-virtualized/styles.css'; 
import Image from 'next/image';
import gsap from 'gsap';

const GAP_SIZE = 10;
const CARD_HEIGHT = 120;
const CARD_WIDTH = 290;
const tls = [];


const Index = ({ comments, postsData }) => {
  // set initial height (for full hd resolution minus top bar and card margin);
  // used to detect how many card render on server side;
  const [height, setHeight] = useState(900);
  // set initial width (for full hd resolution)
  const [width, setWidth] = useState(1920);

  // create own AutoSizer
  const setDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setDimensions();
    window.addEventListener( 'resize', setDimensions);
    return () => {
      window.removeEventListener( 'resize', setDimensions);
    }
  }, []);

  const dataArr = [];

  Object.keys(postsData).forEach(key => {
    dataArr.push({
      id: key,
      number: postsData[key].number,
      title: postsData[key].tags.join(' / ')
    });
  });

  const Item = ({
    cardHeight,
    cardWidth,
    columnCount,
    gapSize,
    rowCount,
    index,
    style,
    key,
    comments
  }) => {
    // This is the range of cards visible on this row, given the current width:
    const startIndex = index * columnCount;
    const stopIndex = Math.min(
      comments.length - 1, // last item
      startIndex + columnCount - 1
    );
    
    const cards = [];
    // console.log(dataArr, 'dddddddddddd');
    for (let i = startIndex; i <= stopIndex; i++) {
      const comment = comments[i];
      // const imageSrc = `/images/previews/${comments[i].id}.png`;
      // const title = comments[i].name;
      // const id = comments[i].id;
  
      // const link = (
      //   <a>
      //     <Image
      //       src={imageSrc}
      //       alt={title}
      //       // width={290}
      //       layout="fill"
      //     />
      //   </a>
      // );
  
      const card = (
        <div
          key={i}
          className="Card"
          style={{
            width: cardWidth,
            height: cardHeight,
            margin: `0 ${gapSize / 2}px`
          }}
        >
          {/* {comment.title} */}
          <br />
          {comment.id}
          {/* <Link href={`/post/${dataArr[i].id}`}>
            {link}
          </Link> */}
        </div>
      );
      cards.push(card);
  
    }
    // console.log(startIndex);
    // console.log(stopIndex);
    // console.log(cards);
    // console.log(index);
    
    // return (
    //   <div key={key} style={style}>
    //     {comment.id}: {comment.name}
    //   </div>
    // )
  
    return (
      <div className="Item" style={style}>
        {/* {comments} */}
        {cards}
      </div>
    );
  };



  function rowRenderer( comments, dataArr, rowCount, columnCount, { key, index, style }) {
    // const dataArr = [];

    // Object.keys(postsData).forEach(key => {
    //   dataArr.push({
    //     id: key,
    //     number: postsData[key].number,
    //     title: postsData[key].tags.join(' / ')
    //   });
    // });

    // console.log(postsData[index]);
    // return <div style={style} key={key}>lala</div>
    // console.log(postsData[index]);
    // const postData = postsData[index];
    // const comment = comments[index];
    // return (
    //   <div key={key} style={style}>
    //     {comment.id}: {comment.name}
    //   </div>
    // )

    return (
      <Item
        index={index}
        columnCount={columnCount}
        rowCount={rowCount}
        postsData={dataArr}
        comments={comments}
        cardWidth={290}
        cardHeight={CARD_HEIGHT}
        gapSize={GAP_SIZE}
        style={style}
        key={key}
      />
    );
  }

  // const columnCount = Math.floor( (width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE) );
  // const rowCount = Math.ceil(dataArr.length / columnCount);
  const columnCount = Math.floor( (width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE) );
  const rowCount = Math.ceil(comments.length / columnCount);


  // issue https://github.com/bvaughn/react-virtualized/issues/851#issuecomment-338415738
  // const ssrHeight = 1000;
  // const ssrWidth = 1000;

  return (
    <div className="main">
      {/* <AutoSizer defaultHeight={ssrHeight} defaultWidth={ssrWidth}>
        {({ height, width }) => ( */}
          <List
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={130}
            rowRenderer={(rowArgs) => rowRenderer( comments, dataArr, rowCount, columnCount, rowArgs )}
            overscanRowCount={0}
          />
        {/* )} */}
      {/* </AutoSizer> */}
    </div>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch("http://jsonplaceholder.typicode.com/comments");
  const data = await res.json();

  return {
    comments: data,
    postsData
  };
}

export default Index;
