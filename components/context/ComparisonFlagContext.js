"use client";
import React, { createContext, useContext, useState } from "react";

const ComparisionFlagContext = createContext();

export const useComparisionFlag = () => useContext(ComparisionFlagContext);

export const ComparisionFlagProvider = ({ children }) => {
  const [comparisonFlag, setComparisonFlag] = useState(false);

  return (
    <ComparisionFlagContext.Provider
      value={{ comparisonFlag, setComparisonFlag }}
    >
      {children}
    </ComparisionFlagContext.Provider>
  );
};
