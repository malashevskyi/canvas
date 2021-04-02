import { useContext } from 'react';
import classNames from 'classnames';

import { LoadSpinnerContext } from '../context/loadSpinnerContext';

const LoadSpinner = () => {
  const [spinner] = useContext(LoadSpinnerContext);

  return (
    <div
      className={classNames({
        loadSpinner: true,
        isActive: spinner.active,
      })}
    >
      {spinner.text && (
        <h4 className="loader-title">
          {spinner.text}
          {/* <pre>{spinner.text}</pre> */}
        </h4>
      )}
      <div className="loader">Loading...</div>
    </div>
  );
};

export default LoadSpinner;
