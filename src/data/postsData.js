import { Fragment } from 'react';

const postsData = {
  20210219: {
    tags: ['move', 'image', 'push', 'creation', 'particles'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4&t=17s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-19',
    codePen: 'https://codepen.io/shevsky/pen/RwoZWYN'
  },
  20210218: {
    tags: ['pixels', 'blow', 'destruction', 'image'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-18',
    codePen: 'https://codepen.io/shevsky/pen/JjbJWVE'
  },
  20210217: {
    tags: ['pixels', 'transformation', 'destruction'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-17',
    codePen: 'https://codepen.io/shevsky/pen/jOVmBOe'
  },
  20210216: {
    tags: ['image', 'split'],
    credits: () => photoUnsplash("https://unsplash.com/@jakehills?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-16',
    codePen: 'https://codepen.io/shevsky/pen/oNYWLWv'
  },
  20210215: {
    tags: ['move', 'particles', 'connect', 'push', 'grid'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-15',
  },
  202102132: { 
    tags: ['move', 'particles', 'connect', 'attraction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_2',
  },
  202102131: { 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_1',
  },
  202102122: { 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_2',
  },
  202102121: { 
    tags: ['move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_1',
  },
  20210210: { 
    tags: ['dots', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-10',
  },
  20210209: { 
    tags: ['pull', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-09',
  },
  20210208: { 
    tags: ['touch', 'fight', 'color'], 
    credits: () => video("https://www.youtube.com/watch?v=FOPw03-jNrs&t=24s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-08',
  },
  Main: { 
    tags: ['pull', 'dots'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-07',
  },
  20210206: { 
    tags: ['pull', 'diagonal'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-06',
  },
  20210205: { 
    tags: ['lines', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-05',
  },
  20210204: { 
    tags: ['dots', 'sine'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-04',
  },
  20210203: { 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-03',
  },
  20210202: { 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-02',
  },
  20210201: { 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-01',
  },
  20210131: { 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-31',
  },
  20210130: { 
    tags: ['waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-30',
  },
  20210129: { 
    tags: ['pyramid', 'triangle', 'square', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-29',
  },
  20210128: { 
    tags: ['square', 'dots', 'rect', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-28',
  },
  20210127: { 
    tags: ['square', 'dots', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-27',
  },
  20210126: { 
    tags: ['square'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-26',
  },
  20210125: { 
    tags: ['numbers', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-25',
  },
  20210124: { 
    tags: ['scatter', 'balls'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-24',
  },
  20210123: { 
    tags: ['move', 'circle', 'trail'], 
    credits: () => article("https://www.kirupa.com/canvas/creating_motion_trails.htm"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-23',
  },
  20210122: { 
    tags: ['waves', 'sine', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-22',
  },
  20210121: { 
    tags: ['triangulation', 'heart', 'triangles'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-21',
  },
  20210120: { 
    tags: ['pulse', 'heart', 'jelly'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-20',
  },
  20210119: { 
    tags: ['circles', 'jelly', 'move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-19',
  },
  20210118: { 
    tags: ['particles', 'tunnel', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=5MUsKgU6i0I"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-18',
  },
  202101172: { 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_2',
  },
  202101171: { 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_1',
  },
  20210116: { 
    tags: ['rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-16',
  },
  20210115: { 
    tags: ['swirl', 'particles', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-15',
  },
  202101141: { 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_1',
  },
  202101142: { 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_2',
  },
  20210113: { 
    tags: ['draw', 'ornament', 'sine', 'circle'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-13',
  },
  20210112: { 
    tags: ['particles', 'scale', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-12',
  },
  20210111: { 
    tags: ['jelly', 'move', 'gooey'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-11',
  },
  202101102: { 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_2',
  },
  202101101: { 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_1',
  },
  20210109: { 
    tags: ['draw', 'circle', 'rotate'], 
    credits: () => video("https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-09',
  },
  20210108: { 
    tags: ['jelly', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-08',
  },
  20210107: { 
    tags: ['particles', 'circle', 'burst'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-07',
  },
  20210106: { 
    tags: ['squares', 'flickering', 'grid'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-06',
  },
  20210105: { 
    tags: ['sky', 'flickering', 'fall'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-05',
  },
  20210104: { 
    tags: ['balls'], 
    credits: () => video("https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-04',
  },
  20210103: { 
    tags: ['circle', 'rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=D_BPilf_F8k"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-03',
  },
  20210102: { 
    tags: ['firework', 'burst', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-02',
  },
};

function article(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >article</a> .
    </div>
  </Fragment>
}
function photoUnsplash(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      <span>Photo by <a target="_blank" rel="noreferrer" href={link}>Jake Hills</a> on <a target="_blank" rel="noreferrer" href="https://unsplash.com/">Unsplash</a></span>
    </div>
  </Fragment>
}
function video(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >video</a> .
    </div>
  </Fragment>
}
function codesandbox(link) {
  return  <Fragment>
    <div className="title">Credits:</div>
    <div className="inner">
      Inspired by the &nbsp;<a target="_blank" rel="noreferrer" href={link} >codesandbox</a> .
    </div>
  </Fragment>
}
// function description(desc) {
//   return  <Fragment>
//     <div className="inner">
//       {desc}
//     </div>
//   </Fragment>
// }

export default postsData;