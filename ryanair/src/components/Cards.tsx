import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";


interface Airport {
  arrivalAirport: {
    iataCode: string;
    city: {
      name: string;
    };
  };
}

interface City {
  id: string;
  name: string;
  imageUrl: string;
}

const ImageGridExample: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/BER"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: Airport[] = await response.json();
        const cityNames: City[] = data.map((item: Airport, index: number) => ({
          id: item.arrivalAirport.iataCode || `city-${index}`,
          name: item.arrivalAirport.city.name,
          imageUrl: `https://picsum.photos/200/200?random=${index}`,
        }));
        setCities(cityNames);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Cities you can reach from BER</h2>
      <div className="grid grid-cols-3 gap-8">
        {cities.map((city: City) => (

          <Card key={city.id} className="flex flex-col justify-between">
          <CardHeader className="flex-row gap-4 items-center">
            
              <div>
                <CardTitle>{city.name}</CardTitle>
                <CardDescription>Country
                </CardDescription>
              </div>

            </CardHeader>
            <CardContent>city information</CardContent>
            <CardFooter><button>View city</button></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGridExample;
