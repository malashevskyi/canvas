import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import classnames from 'classnames';
import Image from 'next/image';

import postsData from '../data/postsData';
import GithubLink from './githubLink';
import CodePenLink from './codePenLink';

import ArrowInfo from './arrowInfo';

const Additional = (props) => {
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const location = useRouter();

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  const canvasName = location.query.id === '/' ? 'Main' : location.query.id;
  const post = postsData[canvasName];

  const tags = post.tags.map((tag, i) => <span key={tag}>{`${i === 0 ? '' : '/ '}` + tag}</span>);
  const githubLink = post.github;
  const codePenLink = post.codePen;
  const credits = post.credits();
  const imageSrc = location.pathname === '/' ? '/images/previews/2021-01-21.png' : `/images/previews/${canvasName}.png`;

  const onResize = () => {
    setAdditionalOpen(false);
  }

  const onArrowInfoClickHandler = () => {
    setAdditionalOpen(!additionalOpen);
  }

  return (
    <div className={
      classnames({
        'additional': true,
        'open': additionalOpen
      })}
    >
      <ArrowInfo onClickHandler={onArrowInfoClickHandler} additionalOpen={additionalOpen} />
      <div className="inner">
        <div className="additional-image">
          <Image 
            src={imageSrc}
            alt={`Canvas animation,${post.tags.map(tag => ' ' + tag)}`}
            layout="fill"
          />
        </div>
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
          <div>{credits}</div>
        </div>
      )}
    </div>
  );
};

// Additional.getStaticProps = (context) => {
//   return {
//     props: { }, 
//   }
// }

export default Additional;
