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

// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";






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


await new Promise((resolve) => setTimeout(resolve,3000))



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
            {/* <Avatar>
              <AvatarImage src={` /img/${city.city}`} alt="city image" />
              <AvatarFallback>
                
              </AvatarFallback>
            </Avatar> */}
            <div>
              <CardTitle>{city.city.name}</CardTitle>
              <CardDescription>{city.country.name}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <img
              src={`https://source.unsplash.com/random/800x600?${city.city.name}`}
              alt="City Image"
            />
            <p>
              A beautiful city in {city.region.name}. In the {city.timeZone}{" "}
              Timezone.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="secondary">Visit {city.city.name}</Button>

            {city.country.schengen && <Badge variant="secondary">🇪🇺</Badge>}
          </CardFooter>
        </Card>
      ))}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DestinationCitiesCard;
