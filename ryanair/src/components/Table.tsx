import React, { useState, useEffect } from "react";

function Table() {
  const [flights, setFlights] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/BER"
      );
      if (response.ok) {
        const data = await response.json();

        setFlights(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
}

export default Table;
