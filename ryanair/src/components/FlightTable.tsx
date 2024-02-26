/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import app from "./firebaseConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FlightInfo {
  inbound: FlightData;
  outbound: FlightData;
  totalPrice: number;
}

interface FlightData {
  currency: string;
  departureTime: string;
  destination: string;
  destinationFull: string;
  flightNumber: string;
  origin: string;
  originFull: string;
  price: number;
}


async function getFlightDetails(city: string): Promise<FlightInfo[]> {
  const db = getFirestore(app);
  const flightsCollectionRef = collection(db, "allFlights");
  const queryConstraint = query(
    flightsCollectionRef,
    where("arrivalAirport.seoName", "==", city),
    limit(1)
  );
  const querySnapshot = await getDocs(queryConstraint);
  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  let flightDetailsArray: FlightInfo[] = [];

  // Ab hier anders in der Dashboard.tsx
  for (const flightDoc of querySnapshot.docs) {
    const flightDetailsCollectionRef = collection(flightDoc.ref, "flightsInfo");

    const flightDetailsSnapshot = await getDocs(flightDetailsCollectionRef);
    // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
    console.log("Len of objects",flightDetailsSnapshot.size);
    const details = flightDetailsSnapshot.docs.map(
      (doc) => doc.data() as FlightInfo
    );
    flightDetailsArray = flightDetailsArray.concat(details);
console.log(flightDetailsArray);
  }

  return flightDetailsArray;
}
export function FlightTable() {
  const { city } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightInfo[]>([]);

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

  // log the flight details
  console.log(flightDetails);
  // create cards for every flight
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  function kjnhbgvfd(dateString: string) {
    const myDate: Date = new Date(dateString);
    const hours: string = myDate.getHours().toString();
    const minutes: string = myDate.getMinutes().toString();
    const time: string = `${hours}:${minutes.padStart(2, "0")}`;

    return time;
  }

  function jhgbfcvd(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure Airport</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Departure Date</TableHead>
          <TableHead>Price</TableHead>

          <TableHead>Return Airport</TableHead>
          <TableHead>Return Time</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>

          <TableHead>Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flightDetails
          .filter(
            (flight) =>
              new Date(flight.outbound.departureTime) > new Date() &&
              new Date(flight.inbound.departureTime) > new Date()
          )
          .sort((a, b) => a.totalPrice - b.totalPrice)
          .map((flight, index) => (
            <TableRow key={index}>
              <TableCell>{flight.outbound.origin}</TableCell>

              <TableCell>{kjnhbgvfd(flight.outbound.departureTime)}</TableCell>
              <TableCell>{flight.outbound.destination}</TableCell>
              <TableCell>{ jhgbfcvd(flight.outbound.departureTime)}</TableCell>
              <TableCell>{flight.outbound.price} €</TableCell>


              <TableCell>{flight.inbound.origin}</TableCell>
              <TableCell>{kjnhbgvfd(flight.inbound.departureTime)}</TableCell>
              <TableCell>{flight.inbound.destination}</TableCell>
              <TableCell>{jhgbfcvd(flight.inbound.departureTime) }</TableCell>
              <TableCell>{flight.inbound.price} €</TableCell>
              <TableCell>{flight.totalPrice} €</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
