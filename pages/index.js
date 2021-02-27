import Link from 'next/link';
import { Fragment, useRef, useEffect } from 'react';

import MainLayout from '../layout/main';

const Index = (props) => {
  return (
    // <React.StrictMode>
    //   <div className="container">
    //     <MainLayout />
    //   </div>
    // </React.StrictMode>
    <div>Main</div>
  );
}

// Index.getInitialProps = async function() {
//   const res = await fetch("http://localhost:3000/data/postsData.js");
//   const data = await res.json();

//   // console.log(`Show data fetched. Count: ${data.length}`);

//   return {
//     comments: data
//   };
// }

export default Index;
