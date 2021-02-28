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
  const dataArr = [];

  // create data arr from postsData
  Object.keys(postsData).forEach(key => {
    dataArr.push({
      id: key,
      number: postsData[key].number,
      title: postsData[key].tags.join(' / ')
    });
  });

  const Item = ({
    index,
    postsData,
    columnCount,
    cardWidth,
    cardHeight,
    gapSize,
    style,
    key,
  }) => {
    // This is the range of cards visible on this row, given the current width:
    const startIndex = index * columnCount;
    const stopIndex = Math.min(
      postsData.length - 1, // last item
      startIndex + columnCount - 1
    );
    
    const cards = [];

    for (let i = startIndex; i <= stopIndex; i++) {
      const cardData = postsData[i];
      const imageSrc = `/images/previews/${postsData[i].id}.png`;
      const title = postsData[i].name;
      const id = postsData[i].id;
  
      const link = (
        <a>
          <Image
            src={imageSrc}
            alt={title}
            // width={290}
            layout="fill"
          />
        </a>
      );
  
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
          <Link href={`/post/${dataArr[i].id}`}>
            {link}
          </Link>
        </div>
      );
      cards.push(card);
  
    }
  
    return (
      <div className="Item" style={style}>
        {cards}
      </div>
    );
  };



  function rowRenderer( dataArr, columnCount, { key, index, style }) {
    console.log('rowRenderer');
    return (
      <Item
        index={index}
        postsData={dataArr}
        columnCount={columnCount}
        cardWidth={290}
        cardHeight={CARD_HEIGHT}
        gapSize={GAP_SIZE}
        style={style}
        key={key}
      />
    );
  }

  // issue https://github.com/bvaughn/react-virtualized/issues/851#issuecomment-338415738
  const ssrHeight = 900; // set initial height for fullHD minus top bar and card margin
  const ssrWidth = 500; // set initial width for fullHD 

  return (
    <div className="main">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor( (width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE) );
          const rowCount = Math.ceil(dataArr.length / columnCount);

          console.log(`
            width: ${width}
            height: ${height}
            rowCount: ${rowCount}
          `);

          return <List
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={130}
            rowRenderer={(rowArgs) => rowRenderer( dataArr, columnCount, rowArgs )}
            overscanRowCount={10}
          />
        }}
      </AutoSizer>
      {/* <AutoSizer defaultHeight={ssrHeight} defaultWidth={ssrWidth}> */}
        {/* {({ height, width }) => (
        )} */}
      {/* </AutoSizer> */}
    </div>
  );
};

Index.getInitialProps = async function() {
  // const res = await fetch("http://jsonplaceholder.typicode.com/comments");
  // const data = await res.json();

  return {
    // comments: data,
    postsData
  };
}

export default Index;
