import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [propertycompare, setPropertycompare] = useState(() => {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("propertycompare");
      
          try {
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            console.warn("Invalid JSON in localStorage for 'propertycompare':", stored);
            return [];
          }
        }
        return [];
      });
      

  useEffect(() => {
    localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
  }, [propertycompare]);

  return (
    <CompareContext.Provider value={{ propertycompare, setPropertycompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
