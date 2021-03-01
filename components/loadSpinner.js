import { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { LoadSpinnerContext } from '../context/loadSpinnerContext';
import Preview from './preview';
import classNames from 'classnames';

const Card = ({ }) => {
  const [isActive] = useContext(LoadSpinnerContext);

  return (
    <div className={classNames({
      loadSpinner: true,
      isActive
    })}>
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Card;
