import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <h1 className="title">
      <Link to="/">Canvas Every Day</Link>
    </h1>
  );
};

export default Logo;
