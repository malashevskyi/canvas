import Link from 'next/link';
import Preview from './preview';

const Card = ({ index, width, height, date, margin, link, id, title }) => (
  <div
    key={index}
    className="card"
    style={{ width, height, margin }}
  >
    <Link href={link}>
      <a>
        <time dateTime={date}>
          <span>{date}</span>
        </time>
        <Preview name={id} title={title} />
      </a>
    </Link>
  </div>
);

export default Card;