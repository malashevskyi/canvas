import { Fragment } from 'react';

const postsData = {
  20210226: {
    number: 58,
    tags: ['text', 'blend', 'gradient'],
    credits: () => video("https://www.youtube.com/watch?v=qP2pJdOb-i8"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-26',
    codePen: 'https://codepen.io/shevsky/pen/JjbpBeW'
  },
  20210225: {
    number: 57,
    tags: ['image', 'split'],
    credits: () => photoUnsplash("Ivana Cajina", "https://unsplash.com/@von_co"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-25',
    codePen: 'https://codepen.io/shevsky/pen/vYypQaj'
  },
  20210224: {
    number: 56,
    tags: ['particles', 'chase', 'move'],
    credits: () => codepen('https://codepen.io/osublake/pen/qNPBpJ'),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-24',
    codePen: 'https://codepen.io/shevsky/pen/XWNVMVE'
  },
  20210223: {
    number: 55,
    tags: ['circle', 'rotate', 'gradient', 'button'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-23',
    codePen: 'https://codepen.io/shevsky/pen/WNoXzzN'
  },
  20210222: {
    number: 54,
    tags: ['rects', 'rotate', 'gradient'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-22',
    codePen: 'https://codepen.io/shevsky/pen/poNWvEa'
  },
  20210220: {
    number: 53,
    tags: ['join', 'burst', 'particles'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-20',
    codePen: 'https://codepen.io/shevsky/pen/NWbvawm'
  },
  20210219: {
    number: 52,
    tags: ['move', 'image', 'push', 'creation', 'particles'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4&t=17s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-19',
    codePen: 'https://codepen.io/shevsky/pen/RwoZWYN'
  },
  20210218: {
    number: 51,
    tags: ['pixels', 'blow', 'destruction', 'image'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-18',
    codePen: 'https://codepen.io/shevsky/pen/JjbJWVE'
  },
  20210217: {
    number: 50,
    tags: ['pixels', 'transformation', 'destruction'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-17',
    codePen: 'https://codepen.io/shevsky/pen/jOVmBOe'
  },
  20210216: {
    number: 49,
    tags: ['image', 'split'],
    credits: () => photoUnsplash("Jake Hills", "https://unsplash.com/@jakehills?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-16',
    codePen: 'https://codepen.io/shevsky/pen/oNYWLWv'
  },
  20210215: {
    number: 48,
    tags: ['move', 'particles', 'connect', 'push', 'grid'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-15',
  },
  202102132: {
    number: 47, 
    tags: ['move', 'particles', 'connect', 'attraction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_2',
  },
  202102131: {
    number: 46, 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_1',
  },
  202102122: {
    number: 45, 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_2',
  },
  202102121: {
    number: 44, 
    tags: ['move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_1',
  },
  20210210: {
    number: 43, 
    tags: ['dots', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-10',
  },
  20210209: {
    number: 42, 
    tags: ['pull', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-09',
  },
  20210208: {
    number: 41, 
    tags: ['touch', 'fight', 'color'], 
    credits: () => video("https://www.youtube.com/watch?v=FOPw03-jNrs&t=24s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-08',
  },
  Main: {
    number: 40, 
    tags: ['triangulation', 'heart', 'triangles', 'pulse'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/main',
  },
  20210206: {
    number: 39, 
    tags: ['pull', 'diagonal'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-06',
  },
  20210205: {
    number: 38, 
    tags: ['lines', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-05',
  },
  20210204: {
    number: 37, 
    tags: ['dots', 'sine'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-04',
  },
  20210203: {
    number: 36, 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-03',
  },
  20210202: {
    number: 35, 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-02',
  },
  20210201: {
    number: 34, 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-01',
  },
  20210131: {
    number: 33, 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-31',
  },
  20210130: {
    number: 32, 
    tags: ['waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-30',
  },
  20210129: {
    number: 31, 
    tags: ['pyramid', 'triangle', 'square', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-29',
  },
  20210128: {
    number: 30, 
    tags: ['square', 'dots', 'rect', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-28',
  },
  20210127: {
    number: 29, 
    tags: ['square', 'dots', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-27',
  },
  20210126: {
    number: 28, 
    tags: ['square'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-26',
  },
  20210125: {
    number: 27, 
    tags: ['numbers', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-25',
  },
  20210124: {
    number: 26, 
    tags: ['scatter', 'balls'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-24',
  },
  20210123: {
    number: 25, 
    tags: ['move', 'circle', 'trail'], 
    credits: () => article("https://www.kirupa.com/canvas/creating_motion_trails.htm"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-23',
  },
  20210122: {
    number: 24, 
    tags: ['waves', 'sine', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-22',
  },
  20210121: {
    number: 23, 
    tags: ['triangulation', 'heart', 'triangles'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-21',
  },
  20210120: {
    number: 22, 
    tags: ['pulse', 'heart', 'jelly'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-20',
  },
  20210119: {
    number: 21, 
    tags: ['circles', 'jelly', 'move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-19',
  },
  20210118: {
    number: 20, 
    tags: ['particles', 'tunnel', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=5MUsKgU6i0I"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-18',
  },
  202101172: {
    number: 19, 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_2',
  },
  202101171: {
    number: 18, 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_1',
  },
  20210116: {
    number: 17, 
    tags: ['rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-16',
  },
  20210115: {
    number: 16, 
    tags: ['swirl', 'particles', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-15',
  },
  202101141: {
    number: 15, 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_1',
  },
  202101142: {
    number: 14, 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_2',
  },
  20210113: {
    number: 13, 
    tags: ['draw', 'ornament', 'sine', 'circle'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-13',
  },
  20210112: {
    number: 12, 
    tags: ['particles', 'scale', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-12',
  },
  20210111: {
    number: 11, 
    tags: ['jelly', 'move', 'gooey'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-11',
  },
  202101102: {
    number: 10, 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_2',
  },
  202101101: {
    number: 9, 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_1',
  },
  20210109: {
    number: 8, 
    tags: ['draw', 'circle', 'rotate'], 
    credits: () => video("https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-09',
  },
  20210108: {
    number: 7, 
    tags: ['jelly', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-08',
  },
  20210107: {
    number: 6, 
    tags: ['particles', 'circle', 'burst'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-07',
  },
  20210106: {
    number: 5, 
    tags: ['squares', 'flickering', 'grid'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-06',
  },
  20210105: {
    number: 4, 
    tags: ['sky', 'flickering', 'fall'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-05',
  },
  20210104: {
    number: 3, 
    tags: ['balls'], 
    credits: () => video("https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-04',
  },
  20210103: {
    number: 2, 
    tags: ['circle', 'rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=D_BPilf_F8k"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-03',
  },
  20210102: {
    number: 1, 
    tags: ['firework', 'burst', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-02',
  },
};

function article(link) {
  return  <Fragment>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >article</a> .
    </div>
  </Fragment>
}
function photoUnsplash(name, link) {
  return  <Fragment>
    <div className="inner">
      <span>Photo by <a target="_blank" rel="noreferrer" href={link}>{name}</a> on <a target="_blank" rel="noreferrer" href="https://unsplash.com/">Unsplash</a></span>
    </div>
  </Fragment>
}
function video(link) {
  return  <Fragment>
    <div className="inner">
      Inspired by the&nbsp;<a target="_blank" rel="noreferrer" href={link} >video</a> .
    </div>
  </Fragment>
}
function codesandbox(link) {
  return  <Fragment>
    <div className="inner">
      Inspired by the &nbsp;<a target="_blank" rel="noreferrer" href={link} >codesandbox</a> .
    </div>
  </Fragment>
}
function codepen(link) {
  return  <Fragment>
    <div className="inner">
      Inspired by the &nbsp;<a target="_blank" rel="noreferrer" href={link} >codepen</a> .
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