import { createContext, useState, useEffect } from 'react';

export const MenuIsOpenContext = createContext();

const MenuIsOpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  return (
    <MenuIsOpenContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </MenuIsOpenContext.Provider>
  );
};

export default MenuIsOpenProvider;
