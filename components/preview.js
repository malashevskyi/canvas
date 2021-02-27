
import Image from 'next/image';

const Preview = ({ title, name }) => {
  const imageSrc = `/images/previews/${name}`;
  
  return (
    <div className="image">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
      />
    </div>
  );
};

export default Preview;
