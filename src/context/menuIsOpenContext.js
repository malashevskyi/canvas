import React, { createContext, useState } from 'react';

export const MenuIsOpenContext = createContext();

const MenuIsOpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuIsOpenContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </MenuIsOpenContext.Provider>
  );
};

export default MenuIsOpenProvider;
