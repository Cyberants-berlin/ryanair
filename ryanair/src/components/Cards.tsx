import React, { useEffect, useState } from "react";

function ImageGridExample() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/BER"
        );
        const data = await response.json();
        const cityNames = data.map((item, index) => ({
          id: item.arrivalAirport.iataCode,
          name: item.arrivalAirport.city.name,
          imageUrl: `https://picsum.photos/200/200?random=${index}`, // random
        }));
        setCities(cityNames);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Cities you can reach from BER</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cities.map((city) => (
          <div key={city.id} style={{ margin: 10, textAlign: "center" }}>
            <img
              src={city.imageUrl}
              alt={city.name}
              style={{ width: 200, height: 200, borderRadius: "10px" }}
            />
            <h3>{city.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGridExample;
