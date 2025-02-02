import { createContext, useState, useContext } from "react";

// Create a Context
const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom Hook for using Loading Context
export const useLoading = () => useContext(LoadingContext);
