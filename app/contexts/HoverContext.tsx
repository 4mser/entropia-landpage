// contexts/HoverContext.tsx
'use client'
import React, { createContext, useState, useContext, ReactNode } from "react";

interface HoverContextType {
  hoverInfo: string | null;
  setHoverInfo: (info: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoverInfo, setHoverInfo }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = (): HoverContextType => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover debe usarse dentro de un HoverProvider");
  }
  return context;
};
