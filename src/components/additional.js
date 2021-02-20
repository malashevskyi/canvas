import React, { useEffect, useState, Fragment } from 'react';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import postsData from '../data/postsData';
import * as previews from '../images/loadImages';
import GithubLink from './githubLink';
import CodePenLink from './codePenLink';

import ArrowInfo from './arrowInfo';

const Additional = () => {
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const location = useLocation();
  const canvasName = location.pathname === '/' ? 'Main' : location.pathname.slice(1);
  const post = postsData[canvasName];
  const preview = location.pathname === '/' ? previews["_20210121"] : previews["_" + canvasName];
  const tags = post.tags.map((tag, i) => <span>{`${i === 0 ? '' : '/ '}` + tag}</span>);
  const githubLink = post.github;
  const codePenLink = post.codePen;
  const credits = post.credits();
  // const [additionalHeight, setAdditionalHeight] = useState(0);
  // const containerRef = useRef();

  function onResize() {
    setAdditionalOpen(false);
    // setAdditionalHeight(containerRef.current.offsetHeight);
  }
  
  useEffect(() => {
    console.log(canvasName, postsData);
    console.log(canvasName, preview);
    // setAdditionalOpen(containerRef.current.offsetHeight);
    // console.log(additionalOpen);
    // console.log(containerRef.current.offsetHeight);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);


  const onArrowInfoClickHandler = () => {
    setAdditionalOpen(!additionalOpen);
  }

  // additionalOpen={additionalOpen}

  return (
    <div className={
      classnames({
        'additional': true,
        'open': additionalOpen
      })}
      style={{
        // transform: `translate(0, ${additionalOpen ? -additionalHeight : 0}px)`
        // height: additionalHeight
      }}
      // ref={containerRef}
    >
      <ArrowInfo onClickHandler={onArrowInfoClickHandler} additionalOpen={additionalOpen} />
      <div className="inner">
        <img src={preview} alt={`Canvas animation${post.tags.map(tag => ' ' + tag)}`}/>
        <div className="text">
          <h1 className="title">Canvas animation №{post.number} <br/> {tags}</h1>
          <div className="links">
            {codePenLink && <CodePenLink link={codePenLink} />}
            {githubLink && <GithubLink link={githubLink} />}
          </div>
        </div>
      </div>
      {credits && (
        <div className="credits">
          <h3 className="credits-title">Credits:</h3>
          <p>{credits}</p>
        </div>
      )}
    </div>
  );
};

export default Additional;
