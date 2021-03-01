import { createContext, useState, useEffect} from 'react';

export const LoadSpinnerContext = createContext();

const LoadSpinnerProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <LoadSpinnerContext.Provider value={[isActive, setIsActive]}>
      {children}
    </LoadSpinnerContext.Provider>
  );
};

export default LoadSpinnerProvider;