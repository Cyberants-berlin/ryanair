import React, { useState, useEffect } from "react";

interface Flight {
  arrivalAirport: {
    name: string;
  };
}

const Table: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string>("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/BER"
      );
      if (!response.ok) {
        throw new Error(`HTTP   error!   status:   ${response.status}`);
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error(error);
      setError("Failed   to   load   flights");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Flights from BER</h1>
      <div>
        {flights.map((flight, index) => (
          <div key={index}>
            <p>{flight.arrivalAirport.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
