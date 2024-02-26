import { getFirestore, collection, query, where, limit, getDocs } from 'firebase/firestore';
import app from './firebaseConfig';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { FlightCard } from './Detail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    limit(1)
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

    const flightDetailsSnapshot = await getDocs(flightDetailsCollectionRef);
    // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
    const details = flightDetailsSnapshot.docs.map(
      (doc) => doc.data() as FlightDetails
    );
    flightDetailsArray = flightDetailsArray.concat(details);
  }

  return flightDetailsArray;
}
export function FlightTable() {
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

  // log the flight details
  console.log(flightDetails);
  // create cards for every flight
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const flightCards = flightDetails.map((flightDetail) => {
    return <FlightCard flightDetail={flightDetail} />;
  });

  function kjnhbgvfd(dateString: string) {
    const myDate: Date = new Date(dateString);
    const hours: string = myDate.getHours().toString();
    const minutes: string = myDate.getMinutes().toString();
    const time: string = `${hours}:${minutes.padStart(2, '0')}`;

    return time;
  }

  function jhgbfcvd(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }

  const computeDuration = (departureDate: string, arrivalDate: string) => {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure Airport</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead >Departure Date</TableHead>
          <TableHead >Dauer</TableHead>
          <TableHead >Price</TableHead>


          <TableHead>Return Airport</TableHead>
          <TableHead>Return Time</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead >Date</TableHead>
          <TableHead >Dauer</TableHead>
          <TableHead>Price</TableHead>

          <TableHead>Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flightDetails
          .filter(flight =>
            new Date(flight.departure.departureDate) > new Date() &&
            new Date(flight.return.departureDate) > new Date()
          )
          .sort((a, b) => a.price - b.price)
          .map((flight, index) => (
            <TableRow key={index}>
              <TableCell>BER</TableCell>
              <TableCell>{kjnhbgvfd(flight.departure.departureDate)}</TableCell>
              <TableCell>{flight.cityCode}</TableCell>
              <TableCell>{kjnhbgvfd(flight.departure.arrivalDate)}</TableCell>
              <TableCell>{jhgbfcvd(flight.departure.day)}</TableCell>
              <TableCell>{computeDuration(flight.departure.departureDate, flight.departure.arrivalDate)}</TableCell>
              <TableCell>{flight.departure.price.value}
                {flight.return.price.currencySymbol}</TableCell>

              <TableCell >{flight.cityCode}</TableCell>
              <TableCell>{kjnhbgvfd(flight.return.departureDate)}</TableCell>
              <TableCell>BER</TableCell>
              <TableCell>{kjnhbgvfd(flight.return.arrivalDate)}</TableCell>
              <TableCell>{jhgbfcvd(flight.return.departureDate)}</TableCell>
              <TableCell>{computeDuration(flight.return.departureDate, flight.return.arrivalDate)}</TableCell>
              <TableCell>
                {flight.return.price.value}
                {flight.return.price.currencySymbol}</TableCell>
              <TableCell>{flight.price}{flight.return.price.currencySymbol}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}


