import { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { LoadSpinnerContext } from '../context/loadSpinnerContext';
import Preview from './preview';
import classNames from 'classnames';

const LoadSpinner = () => {
  const [spinner] = useContext(LoadSpinnerContext);

  return (
    <div
      className={classNames({
        loadSpinner: true,
        isActive: spinner.active,
      })}
    >
      <h4 className="loader-title">
        <pre>{spinner.text}</pre>
      </h4>
      <div className="loader">Loading...</div>
    </div>
  );
};

export default LoadSpinner;
