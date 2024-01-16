import React, { createContext, useState } from "react";

export const SettingContext = createContext();

export const SettingContextProvider = ({ children }) => {
  const [setting, setSetting] = useState(false);
  return (
    <SettingContext.Provider value={{ setting, setSetting }}>
      {children}
    </SettingContext.Provider>
  );
};
