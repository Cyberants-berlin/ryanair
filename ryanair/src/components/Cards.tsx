import React, { useEffect, useState } from "react";
import app from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';




// Firestore data converter to parse the documents into strongly typed objects



interface RouteDocument {
  arrivalAirport: ArrivalAirport;
  recent: boolean;
  seasonal: boolean;
  operator: string;
  tags: string[];
}

interface ArrivalAirport {
  code: string;
  name: string;
  seoName: string;
  aliases: string[];
  base: boolean;
  city: City;
  region: Region;
  country: Country;
  coordinates: Coordinates;
  timeZone: string;
}

interface City {
  name: string;
  code: string;
  macCode?: string; // Optional, as macCode may not be available for all entries
}

interface Region {
  name: string;
  code: string;
}

interface Country {
  code: string;
  iso3code: string;
  name: string;
  currency: string;
  defaultAirportCode: string;
  schengen: boolean;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}





const DestinationCitiesCard: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const db = getFirestore(app);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "routes"));
        const citiesData: City[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as RouteDocument; // Cast to RouteDocument
          citiesData.push(data.arrivalAirport.city);
        });
        setCities(citiesData);
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
        {cities.map((city, index) => (
          <div key={city.code || index} style={{ margin: 10, textAlign: "center" }}>
            {/* Replace the placeholder image URL with your actual image URL if available */}
            <img
              src={`https://picsum.photos/200/200?random=${index}`}
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

export default DestinationCitiesCard;
