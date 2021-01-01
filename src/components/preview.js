import React from 'react';

const Preview = ({ name }) => {
  const logoSrc = `https://fir-images-fad02.web.app/${name.toLowerCase()}.jpeg`;
  return (
    <div className="image">
      <img src={logoSrc} alt={name} />
    </div>
  );
};

export default Preview;
