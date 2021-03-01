import { useContext } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { List, AutoSizer } from 'react-virtualized';

import Preview from './preview';
import Search from './search';
import { MenuIsOpenContext } from '../context/menuIsOpenContext';
import postsData from '../data/postsData';
import GithubLink from './githubLink';
import CodePenLink from './codePenLink';

const Navbar = ({
  onEnteredFilter,
  filteredCanvasNames,
}) => {
  const location = useRouter();
  const [isOpen] = useContext(MenuIsOpenContext);

  const mainIndex = filteredCanvasNames.findIndex((i) => i === 'Main');
  if (mainIndex !== -1) filteredCanvasNames.splice(mainIndex, 1);

  const thisNavbarIndex = filteredCanvasNames.findIndex((el) => el === location.query.id);

  function rowRenderer({ key, index, style }) {
    const name = filteredCanvasNames[index];
    if (!name) return;

    const postData = postsData[name];

    const date = `${name?.slice(0, 4)}-${name?.slice(5, 7)}-${name?.slice(8, 10)}`;
    let imgTitle = '';
    let titleTags = '';

    const githubLink = postData.github;
    const codePenLink = postData.codePen;

    postData.tags.forEach(tag => {
      titleTags += `/ ${tag} `;
      imgTitle += `${tag} `;
    });
    titleTags = titleTags.slice(1);

    return name === 'Main' ? null : (
      <div
        style={style}
        key={key}
        className={classNames({
          'navbar-menu--item': true,
          active: location.query.id === name,
        })}
      >
        {codePenLink && <CodePenLink link={codePenLink} />}
        {githubLink && <GithubLink link={githubLink} />}
        <Link href={`/post/${name}`}>
          <a>
            <h2 className="navbar-menu--title">
              {titleTags}
            </h2>
            <Preview title={imgTitle} name={name} />
            <time dateTime={date}>
              <span>{date}</span>
            </time>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={classNames({
        navbar: true,
        open: isOpen,
      })}
    >
      <div className="navbar--inner">
        <Search onEnteredFilter={onEnteredFilter} />
        <nav className="navbar-menu">
          <div className="navbar-menu--list">
            <AutoSizer>
              {({ height }) => {
                return (
                  <List
                    width={300}
                    height={height}
                    rowCount={filteredCanvasNames.length}
                    rowHeight={125}
                    rowRenderer={rowRenderer}
                    overscanRowCount={3}
                    scrollToIndex={thisNavbarIndex}
                    scrollToAlignment="start"
                  />
                );
              }}
            </AutoSizer>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;