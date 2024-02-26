/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import app from "../firebaseConfig";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useEffect, useState } from "react";

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

async function getFlightDetailsByCity(city: string): Promise<FlightDetails[]> {
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

export const FlightCard = ({
  flightDetail,
}: {
  flightDetail: FlightDetails;
}) => (
  <div>
    <Card className="grid  gap-4  md:grid-cols-2  lg:grid-cols-4">
      <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
        <CardTitle>{`Flight from BER to ${flightDetail.cityCode}`}</CardTitle>
      </CardHeader>
      <CardContent className="flex  flex-row  items-center  justify-between  space-y-0  pb-1 pt-18">
        <svg
          fill="blue"
          width="80px"
          height="80px"
          viewBox="0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
          strokeWidth="0.00024000000000000003"
        >
          <g id="SVGRepo_iconCarrier">
            <path d="M3 18h18v2H3zm18.509-9.473a1.61 1.61 0 0 0-2.036-1.019L15 9 7 6 5 7l6 4-4 2-4-2-1 1 4 4 14.547-5.455a1.611 1.611 0 0 0 .962-2.018z" />
          </g>
        </svg>
        <p>{`Departure: ${flightDetail.departure.departureDate}`}</p>
        <svg
          fill="gold"
          width="80px"
          height="80px"
          viewBox="0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            <path d="M18.842 15.296a1.61 1.61 0 0 0 1.892-1.189v-.001a1.609 1.609 0 0 0-1.177-1.949l-4.576-1.133L9.825 4.21l-2.224-.225 2.931 6.589-4.449-.449-2.312-3.829-1.38.31 1.24 5.52 15.211 3.17zM3 18h18v2H3z" />
          </g>
        </svg>
        <p className=" flex  flex-row  items-center  justify-between pt-18 pb-2">{`Return:${flightDetail.return.departureDate}`}</p>
      </CardContent>
      <CardFooter className="flex  flex-row  items-center  justify-between pb-2">
        <Button>
          <Link to={"https://www.ryanair.com/de/de"}>Book Now</Link>
        </Button>
      </CardFooter>
      <p className=" flex  flex-row  items-center  justify-between  pt-18 pb-2 text-la  font-large">{`Total Price: ${flightDetail.price} ${flightDetail.departure.price.currencySymbol}`}</p>
    </Card>
  </div>
);

export default function DetailComponent() {
  const { city } = useParams();
  const [flightDetails, setFlightDetails] = useState<FlightDetails[]>([]);

  useEffect(() => {
    if (city) {
      getFlightDetailsByCity(city)
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
  const flightCards = flightDetails.map((flightDetail) => {
    return <FlightCard flightDetail={flightDetail} />;
  });
}
