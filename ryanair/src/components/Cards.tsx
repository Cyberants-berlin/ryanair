import React, { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

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

// Your interfaces...

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
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-10 px-10">
      {isLoading
        ? Array(4)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        : cities.map((city, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
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
    </div>
  );
};

export default DestinationCitiesCard;
