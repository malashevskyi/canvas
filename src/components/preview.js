import React from 'react';

const Preview = ({ name, preview }) => {
  // const logoSrc = `https://fir-images-fad02.web.app/${name}.png`;
  return (
    <div className="image">
      <img src={preview} alt={name} />
    </div>
  );
};

export default Preview;
