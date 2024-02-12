import React, { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard"; //  Stellen  Sie  sicher,  dass  der  Importpfad  korrekt  ist
import ErrorBoundary from "./ErrorBoundary";

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

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      try {
        const querySnapshot = await getDocs(collection(db, "routes"));
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
    <ErrorBoundary>
      <div className="grid  grid-cols-4  gap-10  px-3">
        {isLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : cities.map((city, index) => (
              <Card key={index} className="flex  flex-col  justify-between">
                <CardHeader className="flex-row  gap-4  items-center">
                  <div>
                    <CardTitle>{city.city.name}</CardTitle>
                    <CardDescription>{city.country.name}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src={`https://source.unsplash.com/random/800x600?${city.city.name}`}
                    alt={city.city.name}
                  />
                  <p>
                    A beautiful city in {city.region.name}. In the{" "}
                    {city.timeZone}
                    {"  "}
                    Timezone.
                  </p>
                </CardContent>
                <CardFooter className="flex  justify-between">
                  {/*  <Link  to={`/${city.city.name}`}>
                                {city.city.name}
                            </Link>  */}
                  <Button asChild>
                    <Link to={`/detail/${city.city.name.toLocaleLowerCase()}`}>
                      Visit {city.city.name}
                    </Link>
                  </Button>

                  {city.country.schengen && (
                    <Badge variant="secondary">🇪🇺</Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
      </div>
    </ErrorBoundary>
  );
};

export default DestinationCitiesCard;
