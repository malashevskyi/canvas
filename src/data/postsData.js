import { Fragment } from 'react';

const postsData = {
  20210219: {
    tags: ['move', 'image', 'push', 'creation'],
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
  20210215: { tags: ['move', 'particles', 'connect', 'push', 'grid'], credits: () => video("https://www.youtube.com/watch?v=XGioNBHrFU4") },
  202102132: { tags: ['move', 'particles', 'connect', 'attraction'], credits: () => '' },
  202102131: { tags: ['move', 'particles', 'connect', 'push'], credits: () => '' },
  202102122: { tags: ['move', 'particles', 'connect', 'push'], credits: () => '' },
  202102121: { tags: ['move'], credits: () => '' },
  20210210: { tags: ['dots', 'scale'], credits: () => '' },
  20210209: { tags: ['pull', 'dots'], credits: () => '' },
  20210208: { tags: ['touch', 'fight', 'color'], credits: () => video("https://www.youtube.com/watch?v=FOPw03-jNrs&t=24s") },
  Main: { tags: ['pull', 'dots'], credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg") },
  20210206: { tags: ['pull', 'diagonal'], credits: () => '' },
  20210205: { tags: ['lines', 'waves'], credits: () => '' },
  20210204: { tags: ['dots', 'sine'], credits: () => '' },
  20210203: { tags: ['gradient', 'waves'], credits: () => '' },
  20210202: { tags: ['gradient', 'waves'], credits: () => '' },
  20210201: { tags: ['neons', 'sine'], credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235") },
  20210131: { tags: ['neons', 'sine'], credits: () => codesandbox("https://codesandbox.io/s/proton-emitter-h2y9z?from-embed=&file=/package.json:222-235") },
  20210130: { tags: ['waves'], credits: () => '' },
  20210129: { tags: ['pyramid', 'triangle', 'square', 'dots'], credits: () => '' },
  20210128: { tags: ['square', 'dots', 'rect', 'circle', 'destruction'], credits: () => '' },
  20210127: { tags: ['square', 'dots', 'circle', 'destruction'], credits: () => '' },
  20210126: { tags: ['square'], credits: () => '' },
  20210125: { tags: ['numbers', 'scale'], credits: () => '' },
  20210124: { tags: ['scatter', 'balls'], credits: () => '' },
  20210123: { tags: ['move', 'circle', 'trail'], credits: () => article("https://www.kirupa.com/canvas/creating_motion_trails.htm") },
  20210122: { tags: ['waves', 'sine', 'draw'], credits: () => '' },
  20210121: { tags: ['triangulation', 'heart', 'triangles'], credits: () => video("https://www.youtube.com/watch?v=LNSvO-jJhKg") },
  20210120: { tags: ['pulse', 'heart', 'jelly'], credits: () => '' },
  20210119: { tags: ['circles', 'jelly', 'move'], credits: () => '' },
  20210118: { tags: ['particles', 'tunnel', 'move'], credits: () => video("https://www.youtube.com/watch?v=5MUsKgU6i0I") },
  202101172: { tags: ['burst', 'firework', 'particles'], credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s") },
  202101171: { tags: ['burst', 'firework', 'particles'], credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s") },
  20210116: { tags: ['rotate', 'particles'], credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s") },
  20210115: { tags: ['swirl', 'particles', 'rotate'], credits: () => '' },
  202101141: { tags: ['orbit'], credits: () => '' },
  202101142: { tags: ['orbit'], credits: () => '' },
  20210113: { tags: ['draw', 'ornament', 'sine', 'circle'], credits: () => '' },
  20210112: { tags: ['particles', 'scale', 'draw'], credits: () => '' },
  20210111: { tags: ['jelly', 'move', 'gooey'], credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w") },
  202101102: { tags: ['draw', 'sine', 'circle', 'rotate'], credits: () => '' },
  202101101: { tags: ['draw', 'sine', 'circle', 'rotate'], credits: () => '' },
  20210109: { tags: ['draw', 'circle', 'rotate'], credits: () => video("https://www.youtube.com/watch?v=LHzgW9aQUV8&t=74s") },
  20210108: { tags: ['jelly', 'move'], credits: () => video("https://www.youtube.com/watch?v=XqB_Ulfpd0w") },
  20210107: { tags: ['particles', 'circle', 'burst'], credits: () => '' },
  20210106: { tags: ['squares', 'flickering', 'grid'], credits: () => '' },
  20210105: { tags: ['sky', 'flickering', 'fall'], credits: () => '' },
  20210104: { tags: ['balls'], credits: () => video("https://www.youtube.com/watch?v=yq2au9EfeRQ&t=415s") },
  20210103: { tags: ['circle', 'rotate', 'particles'], credits: () => video("https://www.youtube.com/watch?v=D_BPilf_F8k") },
  20210102: { tags: ['firework', 'burst', 'particles'], credits: () => video("https://www.youtube.com/watch?v=R_CnWF3a_ks&t=1290s") },
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