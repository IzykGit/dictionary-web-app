import React, { createContext, useState, useEffect } from 'react';

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('sans-serif');

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};