import React from 'react';

const Preview = ({ name, preview }) => {
  return (
    <div className="image">
      <img src={preview} alt={name} />
    </div>
  );
};

export default Preview;
