import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import app from './firebaseConfig';
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
  const [cities, setCities] = useState<ArrivalAirport[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const db = getFirestore(app);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "routes"));
        const citiesData: ArrivalAirport[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as RouteDocument; // Cast to RouteDocument
          citiesData.push(data.arrivalAirport);

    
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
    <div className="grid grid-cols-4 gap-10 px-10">
      {cities.map((city) => (

        <Card key={city.city.name} className="flex flex-col justify-between">
           <CardHeader className="flex-row gap-4 items-center">
           <div>
                <CardTitle>{city.city.name}</CardTitle>
                <CardDescription>{city.country.name}</CardDescription>
              </div>
           </CardHeader>
           <CardContent>
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wegwijsnaarparijs.nl%2Fwp-content%2Fuploads%2F2014%2F01%2Farc_de_triomphe_parijs_bezienswaardigheden.jpg&f=1&nofb=1&ipt=fce4b8dacfa6161b2b6f16989530578b859fc77b5366d683ca6bf5e306a7479f&ipo=images"/>
            <p>A beautiful city in {city.region.name}. In the {city.timeZone} Timezone.</p>
           </CardContent>
           <CardFooter className="flex justify-between">
            <button>Visit {city.city.name}</button>
            {city.country.schengen &&<h3>🇪🇺</h3>}
           </CardFooter>
        </Card>

      ))}
    </div>
  );
};

export default DestinationCitiesCard;
