import React, { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import ErrorBoundary from "./ErrorBoundary";
import "../main.css";
import Header from "../components/Header";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import app from "./firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

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
  macCode?: string; //  Optional
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

     <div className="App">
       <Header />
       {/* Weitere Komponenten und Inhalt hier einfügen */}
     </div>;

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      try {
        const querySnapshot = await getDocs(collection(db, "allFlights"));
        const citiesData: ArrivalAirport[] = querySnapshot.docs.map(
          (doc) => doc.data().arrivalAirport as ArrivalAirport
        );
        setCities(citiesData);
      } catch (error) {
        console.error("Error  fetching  data:", error);
        setError("Failed  to  fetch  data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      
      <div className="grid  grid-cols-4  gap-10  px-10">
        {Array.from({ length: 4 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-800 to-blue-500">
        <Header />
        <ErrorBoundary>
          <div className="grid  grid-cols-4  gap-10  px-3 min-[320px]:text-center max-[600px]:grid-cols-1">
            {isLoading
              ? Array(4)
                  .fill(null)
                  .map((_, index) => <SkeletonCard key={index} />)
              : cities.map((city, index) => (
                  <Card
                    key={index}
                    className="flex  flex-col  justify-between text-center "
                  >
                    <CardHeader className="flex-row  gap-4  items-center">
                      <Avatar>
                        <AvatarImage
                          src={`https://raw.githubusercontent.com/HatScripts/circle-flags/gh-pages/flags/${city.country.code}.svg`}
                          alt="@shadcn"
                        />
                      </Avatar>
                      <div className="flex flex-col justify-center items-start">
                        <CardTitle>{city.city.name}</CardTitle>
                        <CardDescription>{city.country.name}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                    <img
                        className="object-cover h-48 w-96 rounded-lg"
                        src={`/cityImages/${city.city.name.toLowerCase()}/${city.city.name.toLowerCase()}_1.jpg`}
                        alt={city.city.name}
                      />

                      <p>
                        A beautiful city in {city.region.name}. In the{"  "}
                        {city.timeZone} Timezone.
                      </p>
                    </CardContent>
                    <CardFooter className="flex  justify-between">
                      <Button asChild>
                        <Link
                          to={`/${city.city.name.toLocaleLowerCase()}`}
                        >
                          Visit {city.city.name}
                        </Link>
                      </Button>

                      {city.country.schengen && (
                        <Badge variant="secondary">🇪🇺</Badge>
                      )}
                      <Link to={`/chatroom/${city.city.name.toLowerCase()}`}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              opacity="0.1"
                              d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
                              fill="gold"
                            ></path>{" "}
                            <path
                              d="M8 10H8.01"
                              stroke="blue"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M12 10H12.01"
                              stroke="blue"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M16 10H16.01"
                              stroke="blue"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
                              stroke="blue"
                              stroke-width="2"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default DestinationCitiesCard;
