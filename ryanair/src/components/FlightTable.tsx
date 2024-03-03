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

//Funktion die Fluginfos aus  Firestore abruft basierend auf Stadtnamen
async function getFlightDetails(city: string): Promise<FlightInfo[]> {
  const db = getFirestore(app);
  const flightsCollectionRef = collection(db, "allFlights");
  // (Query) wird erstellt um Flüge zu finden deren Ankunftsflughafen dem angegebenen Stadtnamen entsprich
  const queryConstraint = query(
    flightsCollectionRef,
    where("arrivalAirport.seoName", "==", city),
    limit(1)
  );
  // Wenn keine Dokumente gefunden werden gibt die Funktion ein leeres Array
  const querySnapshot = await getDocs(queryConstraint);
  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  // jedes gefundene Flugdokument werden zusä Details aus Unter-Kollektion "flightsInfo" geholt und im array gespeich.
  let flightDetailsArray: FlightInfo[] = [];


  for (const flightDoc of querySnapshot.docs) {
    const flightDetailsCollectionRef = collection(flightDoc.ref, "flightsInfo");


    const flightDetailsSnapshot = await getDocs(flightDetailsCollectionRef);
    // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
    console.log("Len of objects", flightDetailsSnapshot.size);
    const details = flightDetailsSnapshot.docs.map(
      (doc) => doc.data() as FlightInfo
    );
    flightDetailsArray = flightDetailsArray.concat(details);
    console.log(flightDetailsArray);
  }

  return flightDetailsArray;
}
//zeigt fluginfos
export function FlightTable() {
  //nimmt stadtnamen aus url
  const { city } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightInfo[]>([]);
  //wenn sich stadtwert ändert rufe getflightdetails

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
  //formatiert uhrzeit eines datums
  function kjnhbgvfd(dateString: string) {
    const myDate: Date = new Date(dateString);
    const hours: string = myDate.getHours().toString();
    const minutes: string = myDate.getMinutes().toString();
    const time: string = `${hours}:${minutes.padStart(2, "0")}`;

    return time;
  }
  //formatiert das datum
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
  //berechnet stunden zwischen zwei daten
  function getHoursBetweenDates(date1: Date, date2: Date) {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return diff / (1000 * 60 * 60);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* Header rearranged as per the requested order */}
          <TableHead>Departure Airport</TableHead>
          <TableHead>Arrival Airport</TableHead>
          <TableHead>Departure Date</TableHead>
          <TableHead>Departure Time</TableHead>
          <TableHead>Outbound Price</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Return Time</TableHead>
          <TableHead>Return Price</TableHead>
          <TableHead>Total Hours between takeoffs </TableHead>
          <TableHead>Total Price</TableHead> {/* Total Price column */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Flugdetails werden gefiltert & sortiert um nur zukünftige Flüge nach Gesamtpreis zu zeigen */}
        {flightDetails
          .filter(
            (flight) =>
              new Date(flight.outbound.departureTime) > new Date() &&
              new Date(flight.inbound.departureTime) > new Date()
          )
          .sort((a, b) => a.totalPrice - b.totalPrice)
          .map((flight, index) => (
            <TableRow key={index}>
              {/* Displaying Departure Airport (origin of outbound flight) */}
              <TableCell>{flight.outbound.origin}</TableCell>

              {/* Displaying Arrival Airport (destination of outbound flight) */}
              <TableCell>{flight.outbound.destination}</TableCell>

              {/* Departure Date and Time for Outbound Flight */}
              <TableCell>{jhgbfcvd(flight.outbound.departureTime)}</TableCell>
              <TableCell>{kjnhbgvfd(flight.outbound.departureTime)}</TableCell>

              {/* Outbound Flight Price */}
              <TableCell>{flight.outbound.price.toFixed(2)} €</TableCell>

              {/* Return Date and Time for Inbound Flight */}
              <TableCell>{jhgbfcvd(flight.inbound.departureTime)}</TableCell>
              <TableCell>{kjnhbgvfd(flight.inbound.departureTime)}</TableCell>

              {/* Inbound Flight (Return) Price */}
              <TableCell>{flight.inbound.price.toFixed(2)} €</TableCell>

              {/* Total Hours between takeoffs */}
              <TableCell>
                {getHoursBetweenDates(
                  new Date(flight.outbound.departureTime),
                  new Date(flight.inbound.departureTime)
                ).toFixed(1)}{" "}
                h
              </TableCell>

              {/* Total Price, formatted in bold */}
              <TableCell style={{ fontWeight: "bold" }}>
                {flight.totalPrice.toFixed(2)} €
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
