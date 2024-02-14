import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type DataType = {
  id: number;
  name: string;
};

type DataContextType = {
  data: DataType[];
  fetchData: () => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("URL");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};