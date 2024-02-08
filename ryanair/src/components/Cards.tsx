import React, { useEffect, useState } from "react";

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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cities.map((city: City) => (
          <div key={city.id} style={{ margin: 10, textAlign: "center" }}>
            <img
              src={city.imageUrl}
              alt={city.name}
              style={{ width: 200, height: 200, borderRadius: "10px" }}
            />
            <h3>{city.name}</h3>
          </div>
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ImageGridExample;
