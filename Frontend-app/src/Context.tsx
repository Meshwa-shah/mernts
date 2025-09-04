import React, { createContext, useState, type ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export interface AppContextType {
  data: string | null;
  setdata: (value: string | null) => void;
}


export const AppContext = createContext<AppContextType | null>(null);


export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setdata] = useState<boolean | null>(false);

  return (
    <AppContext.Provider value={{ data, setdata }}>
      {children}
    </AppContext.Provider>
  );
};
