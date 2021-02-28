import { Fragment } from 'react';

const postsData = {
  "2021-02-26": {
    number: 58,
    tags: ['text', 'blend', 'gradient'],
    credits: () => video("https://www.youtube.com/watch?v=qP2pJdOb-i8"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-26',
    codePen: 'https://codepen.io/shevsky/pen/JjbpBeW'
  },
  "2021-02-25": {
    number: 57,
    tags: ['image', 'split'],
    credits: () => photoUnsplash("Ivana Cajina", "https://unsplash.com/@von_co"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-25',
    codePen: 'https://codepen.io/shevsky/pen/vYypQaj'
  },
  "2021-02-24": {
    number: 56,
    tags: ['particles', 'chase', 'move'],
    credits: () => codepen('https://codepen.io/osublake/pen/qNPBpJ'),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-24',
    codePen: 'https://codepen.io/shevsky/pen/XWNVMVE'
  },
  "2021-02-23": {
    number: 55,
    tags: ['circle', 'rotate', 'gradient', 'button'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-23',
    codePen: 'https://codepen.io/shevsky/pen/WNoXzzN'
  },
  "2021-02-22": {
    number: 54,
    tags: ['rects', 'rotate', 'gradient'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-22',
    codePen: 'https://codepen.io/shevsky/pen/poNWvEa'
  },
  "2021-02-20": {
    number: 53,
    tags: ['join', 'burst', 'particles'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-20',
    codePen: 'https://codepen.io/shevsky/pen/NWbvawm'
  },
  "2021-02-19": {
    number: 52,
    tags: ['move', 'image', 'push', 'creation', 'particles'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4&t=17s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-19',
    codePen: 'https://codepen.io/shevsky/pen/RwoZWYN'
  },
  "2021-02-18": {
    number: 51,
    tags: ['pixels', 'blow', 'destruction', 'image'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-18',
    codePen: 'https://codepen.io/shevsky/pen/JjbJWVE'
  },
  "2021-02-17": {
    number: 50,
    tags: ['pixels', 'transformation', 'destruction'],
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-17',
    codePen: 'https://codepen.io/shevsky/pen/jOVmBOe'
  },
  "2021-02-16": {
    number: 49,
    tags: ['image', 'split'],
    credits: () => photoUnsplash("Jake Hills", "https://unsplash.com/@jakehills?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-16',
    codePen: 'https://codepen.io/shevsky/pen/oNYWLWv'
  },
  "2021-02-15": {
    number: 48,
    tags: ['move', 'particles', 'connect', 'push', 'grid'],
    credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-15',
  },
  "2021-02-13-2": {
    number: 47, 
    tags: ['move', 'particles', 'connect', 'attraction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_2',
  },
  "2021-02-13-1": {
    number: 46, 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-13_1',
  },
  "2021-02-12-2": {
    number: 45, 
    tags: ['move', 'particles', 'connect', 'push'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_2',
  },
  "2021-02-12-1": {
    number: 44, 
    tags: ['move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-12_1',
  },
  "2021-02-10": {
    number: 43, 
    tags: ['dots', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-10',
  },
  "2021-02-09": {
    number: 42, 
    tags: ['pull', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-09',
  },
  "2021-02-08": {
    number: 41, 
    tags: ['touch', 'fight', 'color'], 
    credits: () => video("https://www.youtube.com/watch?v=FOPw03-jNrs&t=24s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-08',
  },
  "2021-02-06": {
    number: 40, 
    tags: ['pull', 'diagonal'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-06',
  },
  "2021-02-05": {
    number: 39, 
    tags: ['lines', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-05',
  },
  "2021-02-04": {
    number: 38, 
    tags: ['dots', 'sine'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-04',
  },
  "2021-02-03": {
    number: 37, 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-03',
  },
  "2021-02-02": {
    number: 36, 
    tags: ['gradient', 'waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-02',
  },
  "2021-02-01": {
    number: 35, 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-02-01',
  },
  "2021-01-31": {
    number: 34, 
    tags: ['neons', 'sine'], 
    credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-31',
  },
  "2021-01-30": {
    number: 33, 
    tags: ['waves'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-30',
  },
  "2021-01-29": {
    number: 32, 
    tags: ['pyramid', 'triangle', 'square', 'dots'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-29',
  },
  "2021-01-28": {
    number: 31, 
    tags: ['square', 'dots', 'rect', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-28',
  },
  "2021-01-27": {
    number: 30, 
    tags: ['square', 'dots', 'circle', 'destruction'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-27',
  },
  "2021-01-26": {
    number: 29, 
    tags: ['square'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-26',
  },
  "2021-01-25": {
    number: 28, 
    tags: ['numbers', 'scale'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-25',
  },
  "2021-01-24": {
    number: 27, 
    tags: ['scatter', 'balls'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-24',
  },
  "2021-01-23": {
    number: 26, 
    tags: ['move', 'circle', 'trail'], 
    credits: () => article("https://www.kirupa.com/canvas/creating_motion_trails.htm"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-23',
  },
  "2021-01-22": {
    number: 25, 
    tags: ['waves', 'sine', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-22',
  },
  "2021-01-21_1": {
    number: 24, 
    tags: ['triangulation', 'heart', 'triangles', 'pulse'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-21_1',
  },
  "2021-01-21_2": {
    number: 23, 
    tags: ['triangulation', 'heart', 'triangles'], 
    credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-21_2',
  },
  "2021-01-20": {
    number: 22, 
    tags: ['pulse', 'heart', 'jelly'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-20',
  },
  "2021-01-19": {
    number: 21, 
    tags: ['circles', 'jelly', 'move'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-19',
  },
  "2021-01-18": {
    number: 20, 
    tags: ['particles', 'tunnel', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=5MUsKgU6i0I"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-18',
  },
  "2021-01-17-2": {
    number: 19, 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_2',
  },
  "2021-01-17-1": {
    number: 18, 
    tags: ['burst', 'firework', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-17_1',
  },
  "2021-01-16": {
    number: 17, 
    tags: ['rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-16',
  },
  "2021-01-15": {
    number: 16, 
    tags: ['swirl', 'particles', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-15',
  },
  "2021-01-14-1": {
    number: 15, 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_1',
  },
  "2021-01-14-2": {
    number: 14, 
    tags: ['orbit'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-14_2',
  },
  "2021-01-13": {
    number: 13, 
    tags: ['draw', 'ornament', 'sine', 'circle'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-13',
  },
  "2021-01-12": {
    number: 12, 
    tags: ['particles', 'scale', 'draw'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-12',
  },
  "2021-01-11": {
    number: 11, 
    tags: ['jelly', 'move', 'gooey'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-11',
  },
  "2021-01-10-2": {
    number: 10, 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_2',
  },
  "2021-01-10-1": {
    number: 9, 
    tags: ['draw', 'sine', 'circle', 'rotate'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-10_1',
  },
  "2021-01-09": {
    number: 8, 
    tags: ['draw', 'circle', 'rotate'], 
    credits: () => video("https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-09',
  },
  "2021-01-08": {
    number: 7, 
    tags: ['jelly', 'move'], 
    credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-08',
  },
  "2021-01-07": {
    number: 6, 
    tags: ['particles', 'circle', 'burst'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-07',
  },
  "2021-01-06": {
    number: 5, 
    tags: ['squares', 'flickering', 'grid'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-06',
  },
  "2021-01-05": {
    number: 4, 
    tags: ['sky', 'flickering', 'fall'], 
    credits: () => '',
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-05',
  },
  "2021-01-04": {
    number: 3, 
    tags: ['balls'], 
    credits: () => video("https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-04',
  },
  "2021-01-03": {
    number: 2, 
    tags: ['circle', 'rotate', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=D_BPilf_F8k"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-03',
  },
  "2021-01-02": {
    number: 1, 
    tags: ['firework', 'burst', 'particles'], 
    credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s"),
    github: 'https://github.com/malashevskyi/canvas/tree/master/src/canvas/2021-01-02',
  }
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