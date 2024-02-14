import {
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
  [x: string]: any;
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
      const response = await fetch(
        "https://www.ryanair.com/api/views/locate/5/airports/en/BER"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error", error);
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
