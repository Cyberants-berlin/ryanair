import { useEffect, useState } from "react";

// Import components from your UI library with types
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/seperator";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import app from "../firebaseConfig";

interface FlightDetails {
  departure: FlightSegment;
  return: FlightSegment;
  cityCode: string;
  price: number;
}
interface FlightSegment {
  day: string; // Format: "YYYY-MM-DD"
  arrivalDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  departureDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  price: PriceDetails;
  soldOut: boolean;
  unavailable: boolean;
}
interface PriceDetails {
  value: number;
  valueMainUnit: string;
  valueFractionalUnit: string;
  currencyCode: string; // ISO 4217 currency codes
  currencySymbol: string;
}

async function getFlightDetails(city: string): Promise<FlightDetails[]> {
  const db = getFirestore(app);
  const flightsCollectionRef = collection(db, "allFlights");
  const queryConstraint = query(
    flightsCollectionRef,
    where("arrivalAirport.seoName", "==", city),
    limit(1) // Limit the results to one
  );
  const querySnapshot = await getDocs(queryConstraint);
  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  let flightDetailsArray: FlightDetails[] = [];

  // Ab hier anders in der Dashboard.tsx
  for (const flightDoc of querySnapshot.docs) {
    const flightDetailsCollectionRef = collection(
      flightDoc.ref,
      "flightDetails"
    );
    const q = query(flightDetailsCollectionRef);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const snapshot = await getDocs(q);
    // In der Dashboard.tsx gibt es hier eine Schleife, die über die flightDetailsCollectionRef iteriert limit auf 1 setzt und dann die flightDetailsArray mit den details.concat(details) füllt

    const flightDetailsSnapshot = await getDocs(flightDetailsCollectionRef);
    // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
    const details = flightDetailsSnapshot.docs.map(
      (doc) => doc.data() as FlightDetails
    );
    flightDetailsArray = flightDetailsArray.concat(details);
    // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
  }

  return flightDetailsArray;
}
export function FlightCard() {
  const { city } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetails[]>([]);

  useEffect(() => {
    if (city) {
      getFlightDetails(city)
        .then((data) => {
          setFlightDetails(data);
        })
        .catch((error) => {
          console.error("Failed to fetch flight details:", error);
        });
    }
  }, [city]);

  // find the cheapest flight and save it in a variable
  const cheapestFlight = flightDetails.reduce((prev, current) => {
    return prev.price < current.price ? prev : current;
  }, flightDetails[0]);

  console.log("cheapestFlight", cheapestFlight);

  if (flightDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{`Departure: ${cheapestFlight.departure.day}`}</CardTitle>
          <CardDescription>
            {`From: ${cheapestFlight.departure.departureDate}`}
          </CardDescription>
        </CardHeader>
        <CardContent>{/* You can add more details here */}</CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>{`Return: ${cheapestFlight.return.day}`}</CardTitle>
          <CardDescription>
            {`To: ${cheapestFlight.return.arrivalDate}`}
          </CardDescription>
        </CardHeader>
        <CardContent>{/* You can add more details here */}</CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>
            {`${cheapestFlight.price} ${cheapestFlight.departure.price.currencySymbol}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Book now</Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default FlightCard;
