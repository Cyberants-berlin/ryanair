import { useParams } from "react-router-dom";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import app from "./firebaseConfig";
import { getFirestore, collection, getDocs, query, where, limit } from "firebase/firestore";


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
    const flightsCollectionRef = collection(db, 'allFlights');
  
    const queryConstraint = query(flightsCollectionRef, where('arrivalAirport.seoName', '==', city), limit(1));
    const querySnapshot = await getDocs(queryConstraint);
  
  
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return [];
    }
  
    let flightDetailsArray: FlightDetails[] = [];
    
    for (const flightDoc of querySnapshot.docs) {
  
      const flightDetailsCollectionRef = collection(flightDoc.ref, 'flightDetails');
      const flightDetailsSnapshot = await getDocs(flightDetailsCollectionRef);
  
      // Assuming each flightDoc only contains a single flightDetails document, or you want to aggregate them all
      const details = flightDetailsSnapshot.docs.map(doc => doc.data() as FlightDetails);
      flightDetailsArray = flightDetailsArray.concat(details);
    }
   
    
    return flightDetailsArray;
  }










export const FlightCard = ({ flightDetail }: { flightDetail: FlightDetails }) => (
  <Card>
    <CardHeader>
      <CardTitle>{`Flight from BER to ${flightDetail.cityCode}`}</CardTitle>
      <CardDescription>{`Total Price: ${flightDetail.price} ${flightDetail.departure.price.currencySymbol}`}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{`Departure: ${flightDetail.departure.day} at ${flightDetail.departure.departureDate}`}</p>
      <p>{`Return: ${flightDetail.return.day} at ${flightDetail.return.departureDate}`}</p>
    </CardContent>
    <CardFooter>
      <p>Book now!</p>
    </CardFooter>
  </Card>
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
          .catch(error => {
            console.error("Failed to fetch flight details:", error);
          });
      }
    }, [city]);


  // log the flight details  
  console.log(flightDetails);
  // create cards for every flight 
  const flightCards = flightDetails.map(flightDetail => {
    return <FlightCard flightDetail={flightDetail} />;
  });

  const firstletter = city?.charAt(0);
  const firstLetterCap = firstletter?.toUpperCase();
  const remainingletters = city?.slice(1);
  const capitalizedWord =
    (firstLetterCap as string) + (remainingletters as string);
  return (
    <>

<div>
      {flightDetails.length > 0 ? (
        <div className="flight-cards-container">
          {flightCards}
        </div>
      ) : (
        <p>No flights found for {capitalizedWord}.</p>
        
      )}
      
    </div>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-4">
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Overall Flight Costs
            </CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-darkreader-inline-stroke=""
                />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">
              The Overall Flight costs are 100€
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Population</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0  0  24  24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4  w-4  text-muted-foreground"
            >
              <path d="M16  21v-2a4  4  0  0  0-4-4H6a4  4  0  0  0-4  4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22  21v-2a4  4  0  0  0-3-3.87M16  3.13a4  4  0  0  1  0  7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+2350</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Weather</CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0  0  24  24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.381  9.02721C14.9767  8.81911  15.6178  8.70588  16.2857  8.70588C16.9404  8.70588  17.5693  8.81468  18.1551  9.01498M7.11616  11.6089C6.8475  11.5567  6.56983  11.5294  6.28571  11.5294C3.91878  11.5294  2  13.4256  2  15.7647C2  18.1038  3.91878  20  6.28571  20H16.2857C19.4416  20  22  17.4717  22  14.3529C22  11.8811  20.393  9.78024  18.1551  9.01498M7.11616  11.6089C6.88706  10.9978  6.7619  10.3369  6.7619  9.64706C6.7619  6.52827  9.32028  4  12.4762  4C15.4159  4  17.8371  6.19371  18.1551  9.01498M7.11616  11.6089C7.68059  11.7184  8.20528  11.9374  8.66667  12.2426"
                  stroke="#1C274C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+12,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Liked by Travelers
            </CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--noto"
              preserveAspectRatio="xMidYMid meet"
              fill="#e01b24"
              data-darkreader-inline-fill=""
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01c6.98 29.87 58.56 67.08 58.56 67.08s51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z"
                  fill="#e01b24"
                  data-darkreader-inline-fill=""
                ></path>
                <g fill="#e01b24" data-darkreader-inline-fill="">
                  <path d="M30.65 11.2c17.2 0 25.74 18.49 28.5 25.98c.39 1.07 1.88 1.1 2.33.06L64 31.35C60.45 20.01 50.69 8.97 34.03 8.97c-6.9 0-14.19 2.28-19.86 7.09c5.01-3.29 10.88-4.86 16.48-4.86z"></path>
                  <path d="M93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47c2.64-1.02 5.91-1.24 9.15-1.24c16.21 0 30.72 12.29 24.17 40.7c-5.62 24.39-38.46 53.98-48.49 65.27c-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z"></path>
                </g>
                <path
                  d="M17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09c3.07 2.41 1.73 7.35-1.02 9.43c-4 3.04-7.48 4.87-9.92 9.63c-1.46 2.86-2.34 5.99-2.79 9.18c-.18 1.26-1.83 1.57-2.45.46c-4.22-7.48-5.42-17.78.05-24.61z"
                  fill="#e01b24"
                  data-darkreader-inline-fill=""
                ></path>
                <path
                  d="M77.16 34.66c-1.76 0-3-1.7-2.36-3.34c1.19-3.02 2.73-5.94 4.58-8.54c2.74-3.84 7.95-6.08 11.25-3.75c3.38 2.38 2.94 7.14.57 9.44c-5.09 4.93-11.51 6.19-14.04 6.19z"
                  fill="#e01b24"
                  data-darkreader-inline-fill=""
                ></path>
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+573</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-4">
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Departure Flight Costs
            </CardTitle>
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24.00 24.00"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
              stroke-width="0.00024000000000000003"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="0.192"
              />

              <g id="SVGRepo_iconCarrier">
                <path d="M3 18h18v2H3zm18.509-9.473a1.61 1.61 0 0 0-2.036-1.019L15 9 7 6 5 7l6 4-4 2-4-2-1 1 4 4 14.547-5.455a1.611 1.611 0 0 0 .962-2.018z" />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">
              The Price for Departure Flights is 100€
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Hostel</CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--emojione-monotone"
              preserveAspectRatio="xMidYMid meet"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M63 60h-6V41.758c3.656 1.955 3.766 5.918 3.766 5.918c.697-5.52-1.842-7.643-3.823-8.463a5.888 5.888 0 0 0-.128-.666C60.835 35.27 64 36.633 64 36.633c-3.598-4.347-6.668-2.432-8.414-.492A5.983 5.983 0 0 0 51 34h-5v-8c0-3.308-2.691-6-6-6h-1v-6c0-1.077-.531-2.36-1.293-3.121l-1.586-1.587C35.36 8.532 34.076 8 33 8V6.558c2.666 1.533 3.332-1.534 6 0V1.443c-2.668-1.533-3.334 1.534-6 0V1c0-.55-.451-1-1-1c-.551 0-1 .45-1 1v7c-1.076 0-2.36.532-3.121 1.292l-1.586 1.587C25.531 11.64 25 12.923 25 14v6h-1c-3.309 0-6 2.692-6 6v8h-5a5.99 5.99 0 0 0-4.588 2.141c-1.744-1.94-4.815-3.856-8.412.492c0 0 3.164-1.363 7.186 1.916a5.811 5.811 0 0 0-.128.664c-1.981.82-4.521 2.943-3.823 8.463c0 0 .109-3.965 3.766-5.918V60H1c-.551 0-1 .451-1 1v2c0 .551.449 1 1 1h62c.549 0 1-.449 1-1v-2c0-.549-.451-1-1-1m-8.972-18.961c.167-.047.316-.102.493-.143c.336.063.646.145.947.234c.075.635.159 1.443.234 2.449h-1.727c.027-.821.044-1.673.053-2.54m-.061 2.889c.757.959 1.393.625 1.774.215c.057.836.104 1.781.139 2.834h-2.055c.056-.979.105-1.989.142-3.049M53 41.365a.13.13 0 0 0 .025-.01c-.025 1.818-.09 3.537-.177 5.15A.988.988 0 0 0 52 46h-3.639c.23-.936.75-2.023 1.832-3H52c.549 0 1-.449 1-1v-.635m-42 .002V42c0 .551.449 1 1 1h1.807c1.081.977 1.601 2.064 1.831 3H12a.989.989 0 0 0-.849.504c-.088-1.611-.151-3.33-.177-5.148l.026.011m-2.469-.236c.3-.09.61-.172.945-.234c.178.043.327.096.495.143c.01.867.026 1.719.051 2.541H8.296c.076-1.007.159-1.815.235-2.45m-.273 3.012c.383.41 1.019.744 1.775-.217c.035 1.061.084 2.07.142 3.051H8.117c.035-1.053.084-1.998.141-2.834m-.156 3.326c.434.424 1.187.828 2.098-.047c.063 1.037.135 2.018.213 2.949H8.07c-.002-1.035.008-2.008.032-2.902m-.03 3.367c.462.467 1.322.947 2.356-.266c.1 1.158.206 2.227.313 3.197H8.136a115.904 115.904 0 0 1-.064-2.931m.075 3.217c.43.451 1.414 1.174 2.647.182c.068.596.138 1.139.205 1.652V56c0 .078.027.148.045.223c.046.336.088.648.132.941H8.303a118.62 118.62 0 0 1-.156-3.111M8.512 60c-.078-.914-.143-1.795-.198-2.652c.382.443 1.497 1.441 2.91.139c.24 1.613.419 2.513.419 2.513H8.512M22 48.063L20.764 49l.469-1.525L20 46.529l1.525-.006L22 45l.475 1.523l1.525.006l-1.232.945l.468 1.526L22 48.063M24 63l1.333-1h13.334L40 63H24m4.236-14L27 48.063L25.764 49l.469-1.525L25 46.529l1.525-.006L27 45l.475 1.523l1.525.006l-1.232.945l.468 1.526M28 50v10h-3V50h3m5.236-1L32 48.063L30.764 49l.469-1.525L30 46.529l1.525-.006L32 45l.475 1.523l1.525.006l-1.232.945l.468 1.526M33 50v10h-2V50h2m5.236-1L37 48.063L35.764 49l.469-1.525L35 46.529l1.525-.006L37 45l.475 1.523l1.525.006l-1.232.945l.468 1.526M39 50v10h-3V50h3m1.764-1l.469-1.525L40 46.529l1.525-.006L42 45l.475 1.523l1.525.006l-1.232.945l.468 1.526L42 48.063L40.764 49M52 53h-4c-.551 0-1 .451-1 1v2c0 .551.449 1 1 1h3.833a62.876 62.876 0 0 1-.458 2.805l-.04.195H43V50h2v-6H19v6h2v10h-8.338l-.039-.195A61.86 61.86 0 0 1 12.166 57H16c.549 0 1-.449 1-1v-2c0-.549-.451-1-1-1h-4a.945.945 0 0 0-.324.066a122.284 122.284 0 0 1-.31-3.311A.98.98 0 0 0 12 50h4c.549 0 1-.449 1-1v-2c0-.414-.258-.771-.618-.922c.177-1.191.021-2.213-.352-3.084c.534-.017.97-.455.97-.994v-2c0-.549-.451-1-1-1h-4a.959.959 0 0 0-.409.094c-.11-.047-.222-.096-.327-.139c4.877-4.582 8.736-1.15 8.736-1.15A8.378 8.378 0 0 0 18.179 36H20V26c0-2.2 1.799-4 4-4h3v-8c0-.55.318-1.318.707-1.708l1.586-1.585C29.682 10.318 30.449 10 31 10h2c.549 0 1.318.318 1.707.708l1.586 1.585c.389.389.707 1.157.707 1.707v8h3c2.199 0 4 1.8 4 4v10h1.82A8.353 8.353 0 0 0 44 37.805s3.858-3.432 8.734 1.15c-.105.043-.217.092-.326.139A.95.95 0 0 0 52 39h-4c-.551 0-1 .451-1 1v2a1 1 0 0 0 .969.994c-.373.871-.528 1.893-.353 3.084c-.36.151-.616.508-.616.922v2c0 .551.449 1 1 1h4a.985.985 0 0 0 .633-.244a127.106 127.106 0 0 1-.309 3.311A.933.933 0 0 0 52 53m3.486 7h-3.131s.179-.9.418-2.512c1.414 1.301 2.528.303 2.911-.141c-.055.858-.12 1.739-.198 2.653m.209-2.836h-2.873l.129-.926c.021-.078.049-.154.049-.238v-.123c.067-.51.136-1.051.205-1.645c1.232.994 2.216.271 2.646-.18c-.037.993-.087 2.026-.156 3.112m.167-3.396h-2.606c.109-.971.216-2.039.314-3.199c1.033 1.213 1.894.736 2.355.27c-.006.923-.028 1.899-.063 2.929m-2.276-3.397c.078-.932.151-1.912.215-2.951c.909.875 1.663.473 2.096.051c.023.893.033 1.865.03 2.9h-2.341"
                  fill="#000000"
                />

                <path
                  d="M21.119 42.422v-2.027h1.836v2.027h1.111V37.58h-1.111v1.859h-1.836V37.58H20v4.842z"
                  fill="#000000"
                />

                <path
                  d="M27.943 37.5c-1.455 0-2.398 1.086-2.398 2.535c0 1.381.855 2.465 2.318 2.465c1.44 0 2.422-.963 2.422-2.549c0-1.338-.828-2.451-2.342-2.451m-.021 4.131c-.746 0-1.199-.668-1.199-1.617c0-.939.438-1.645 1.191-1.645c.771 0 1.193.748 1.193 1.617c0 .942-.431 1.645-1.185 1.645"
                  fill="#000000"
                />

                <path
                  d="M31.17 38.498h1.324v3.924h1.117v-3.924h1.348v-.918H31.17z"
                  fill="#000000"
                />

                <path
                  d="M37.404 40.373h1.813v-.891h-1.813v-1.003h1.922v-.899h-3.045v4.842h3.147v-.899h-2.024z"
                  fill="#000000"
                />

                <path
                  d="M42.039 37.58H40.92v4.842H44v-.92h-1.961z"
                  fill="#000000"
                />

                <path
                  d="M34 24h-4c-.551 0-1 .45-1 1v8c0 .551.449 1 1 1h4c.549 0 1-.449 1-1v-8c0-.55-.451-1-1-1"
                  fill="#000000"
                />

                <path
                  d="M30 20c.549 0 1-.45 1-1v-4c0-.55-.451-1-1-1c-.551 0-1 .45-1 1v4c0 .55.449 1 1 1"
                  fill="#000000"
                />

                <path
                  d="M34 14c-.551 0-1 .45-1 1v4c0 .55.449 1 1 1c.549 0 1-.45 1-1v-4c0-.55-.451-1-1-1"
                  fill="#000000"
                />

                <path
                  d="M23 28h3c.549 0 1-.449 1-1v-2c0-.55-.451-1-1-1h-3c-.551 0-1 .45-1 1v2c0 .55.449 1 1 1"
                  fill="#000000"
                />

                <path
                  d="M27 33v-2c0-.549-.451-1-1-1h-3c-.551 0-1 .451-1 1v2c0 .551.449 1 1 1h3c.549 0 1-.449 1-1"
                  fill="#000000"
                />

                <path
                  d="M38 28h3c.549 0 1-.449 1-1v-2c0-.55-.451-1-1-1h-3c-.551 0-1 .45-1 1v2c0 .55.449 1 1 1"
                  fill="#000000"
                />

                <path
                  d="M38 34h3c.549 0 1-.449 1-1v-2c0-.549-.451-1-1-1h-3c-.551 0-1 .451-1 1v2c0 .551.449 1 1 1"
                  fill="#000000"
                />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+2350</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+12,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Safety</CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#2A6797"
                  d="M32 36.001V35c0-4-3.685-7-7-7H11c-3.313 0-7 3-7 7v1.001h28z"
                />
                <ellipse
                  fill="#2A6797"
                  cx="18.003"
                  cy="7.501"
                  rx="12"
                  ry="7.5"
                />
                <path
                  fill="#F7DECE"
                  d="M13.64 28.101s2.848 1.963 4.36 1.963c1.512 0 4.359-1.963 4.359-1.963V24.29h-8.72v3.811z"
                />
                <path
                  fill="#EEC2AD"
                  d="M13.632 25.702c1.216 1.374 2.724 1.746 4.364 1.746c1.639 0 3.146-.373 4.363-1.746v-3.491h-8.728v3.491z"
                />
                <path
                  fill="#292F33"
                  d="M9.002 8.5c-.372.702-1.092 1.47-1.193 2.288c-.425 3.448.522 5.05.86 7.643c.382 2.938 1.961 3.878 3.224 4.271c1.816 2.51 3.747 2.402 6.989 2.402c6.331 0 9.088-4.491 9.355-12.016c.061-1.722-.379-3.224-1.058-4.587H9.002z"
                />
                <path
                  fill="#F7DECE"
                  d="M25.16 13.47c-.613-.887-1.397-1.602-3.116-1.854c.645.309 1.263 1.377 1.343 1.967c.081.59.161 1.068-.349.478c-2.045-2.364-4.271-1.433-6.478-2.877c-1.541-1.009-2.011-2.124-2.011-2.124s-.188 1.489-2.525 3.007c-.677.44-1.486 1.419-1.934 2.866c-.322 1.04-.222 1.967-.222 3.551c0 4.625 3.644 8.514 8.14 8.514s8.14-3.923 8.14-8.514c-.002-2.879-.29-4.003-.988-5.014z"
                />
                <path
                  fill="#C1694F"
                  d="M18 24.467c-2.754 0-3.6-.705-3.741-.848a.655.655 0 0 1 .902-.95c.052.037.721.487 2.839.487c2.2 0 2.836-.485 2.842-.49a.638.638 0 0 1 .913.015a.669.669 0 0 1-.014.938c-.141.143-.987.848-3.741.848m.904-3.62h-1.809c-.25 0-.452-.212-.452-.473s.202-.473.452-.473h1.809c.25 0 .452.212.452.473a.462.462 0 0 1-.452.473z"
                />
                <path
                  fill="#662113"
                  d="M14.382 17.536c-.499 0-.904-.424-.904-.946v-.946c0-.522.405-.946.904-.946s.904.424.904.946v.946c.001.522-.404.946-.904.946zm7.236 0c-.499 0-.904-.424-.904-.946v-.946c0-.522.405-.946.904-.946s.904.424.904.946v.946c0 .522-.405.946-.904.946z"
                />
                <path
                  fill="#2A6797"
                  d="M8.5 8v1c0 1.105 4.253 2 9.5 2s9.5-.895 9.5-2V8h-19z"
                />
                <path
                  fill="#4289C1"
                  d="M27.001 8V6S23.251 3.75 18 3.75C12.752 3.75 9.002 6 9.002 6v2h17.999z"
                />
                <path
                  fill="#FDCB58"
                  d="M27.5 8h-19c-.275 0-.5.225-.5.5s.225.5.5.5h19c.275 0 .5-.225.5-.5s-.225-.5-.5-.5z"
                />
                <path
                  fill="#193D59"
                  d="M19.947 32.277c.886.622 1.812 1.245 2.147 1.379c.018.007.016-.11.012-.114c-1.958-2.292-4.084-3.534-4.084-3.534l.013-.009l-.014.001h-.03l.011.008s-2.09 1.225-4.035 3.48c.013.103.037.158.076.137c.297-.16 1.175-.766 2.03-1.368c.039.112.078.213.112.275c.156.281.528.906.528.906s-.753.562-1.035 2.563h4.667c-.281-1.595-1.031-2.563-1.031-2.563s.375-.625.531-.906c.031-.059.066-.151.102-.255z"
                />
                <path
                  fill="#4289C1"
                  d="M18.001 30.008s-.01-.006-.011-.008c-.124-.084-4.14-2.817-4.698-3.375c-.271-.271-.97.905-.958 1.208c.041 1.084 1.386 5.939 1.583 5.709l.049-.054c1.945-2.256 4.035-3.48 4.035-3.48zm.02 0s2.126 1.242 4.084 3.534c.004.005.011-.005.016-.005c.237.029 1.527-4.642 1.567-5.704c.012-.303-.688-1.479-.958-1.208c-.557.557-4.56 3.282-4.696 3.374l-.013.009z"
                />
                <path
                  fill="#1E4B6E"
                  d="M18.016 30.688c-.562.031-1.452.941-1.359 1.328c.427 1.785.779 1.312 1.391 1.312c.542 0 .93.437 1.391-1.391c.12-.478-1.034-1.272-1.423-1.249zm.026 3.145c-1.477 0-2.019 2.167-2.019 2.167h4.023c.001 0-.527-2.167-2.004-2.167z"
                />
                <path
                  fill="#FDCB58"
                  d="M20.25 1.501h-.002a.737.737 0 0 0-.57.282c-.281.069-.667.084-1.157-.071a.748.748 0 0 0-1.04.001c-.491.155-.877.14-1.157.071a.738.738 0 0 0-.571-.282h-.002a.749.749 0 1 0 0 1.5h.002c0 3 1.498 3.75 2.247 3.75c.751 0 2.248-.75 2.248-3.75h.002a.75.75 0 1 0 0-1.501z"
                />
                <path
                  fill="#4289C1"
                  d="M11.51 29.389l-5.738 1.754a.502.502 0 0 1-.625-.332l-.293-.957a.502.502 0 0 1 .332-.624l5.738-1.754a.501.501 0 0 1 .624.331l.292.957a.5.5 0 0 1-.33.625"
                />
                <circle fill="#FFF" cx="10.55" cy="28.616" r=".576" />
                <path
                  fill="#4289C1"
                  d="M24.502 29.389l5.738 1.754a.502.502 0 0 0 .625-.332l.293-.957a.502.502 0 0 0-.332-.624l-5.739-1.754a.501.501 0 0 0-.624.331l-.292.957a.502.502 0 0 0 .331.625"
                />
                <circle fill="#FFF" cx="25.268" cy="28.589" r=".576" />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+573</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>

      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-4">
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Arrival Flight Costs
            </CardTitle>
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path d="M18.842 15.296a1.61 1.61 0 0 0 1.892-1.189v-.001a1.609 1.609 0 0 0-1.177-1.949l-4.576-1.133L9.825 4.21l-2.224-.225 2.931 6.589-4.449-.449-2.312-3.829-1.38.31 1.24 5.52 15.211 3.17zM3 18h18v2H3z" />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">
              The Price for Arrival Flights is 100€
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">Country</CardTitle>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              data-darkreader-inline-fill=""
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M960 512c0 249.408-203.2 448-448 448-244.778667 0-448-198.592-448-448S262.592 64 512 64s448 198.592 448 448"
                  fill="#2196F3"
                  data-darkreader-inline-fill=""
                />

                <path
                  d="M507.52 718.08c0-8.96-4.48-13.44-13.44-17.92-26.88-8.96-53.76-8.96-76.16-31.381333-4.48-8.96-4.48-17.92-8.96-26.88-8.96-8.96-31.36-13.44-44.8-17.92h-89.6c-13.44-4.48-22.4-22.4-31.36-35.84 0-4.48 0-13.461333-8.96-13.461334-8.96-4.458667-17.92 4.501333-26.88 0-4.48-4.458667-4.48-8.96-4.48-13.418666 0-13.461333 8.96-26.901333 17.92-35.861334 13.44-8.96 26.88 4.48 40.32 4.48 4.48 0 4.48 0 8.96 4.48 13.44 4.48 17.92 22.4 17.92 35.861334v8.96c0 4.48 4.48 4.48 8.96 4.48 4.48-22.4 4.48-44.821333 8.96-67.2 0-26.88 26.88-53.781333 49.28-62.72 8.96-4.458667 13.44 4.501333 22.4 0 26.88-8.96 94.08-35.84 80.64-71.658667-8.96-31.381333-35.84-62.698667-71.68-58.24-8.96 4.501333-13.44 8.96-22.4 13.461333-13.44 8.96-40.32 35.84-53.76 35.84-22.4-4.48-22.4-35.84-17.92-49.301333 4.48-17.92 44.8-76.138667 71.68-67.178667l17.92 17.92c8.96 4.48 22.4 4.48 35.84 4.48 4.48 0 8.96 0 13.44-4.48 4.48-4.48 4.48-4.48 4.48-8.96 0-13.44-13.44-26.901333-22.4-35.861333s-22.4-17.92-35.84-22.378667c-44.8-13.461333-116.48 4.458667-152.32 35.84-35.84 31.36-62.72 85.12-80.64 129.92-8.96 26.88-17.92 62.698667-22.4 94.08-4.48 22.4-8.96 40.32 4.48 62.698667 13.44 26.88 40.32 53.781333 67.2 71.68 17.92 13.44 53.76 13.44 71.68 35.84 13.44 17.941333 8.96 40.32 8.96 62.72 0 26.88 17.92 49.28 26.88 71.658667 4.48 13.461333 8.96 31.381333 13.44 44.821333 0 4.48 4.48 31.36 4.48 35.84 26.88 13.44 49.28 26.901333 80.64 35.861333 4.48 0 22.4-26.901333 22.4-31.381333 13.44-13.44 22.4-31.36 35.84-40.32 8.96-4.48 17.92-8.96 26.88-17.941333 8.96-8.96 13.44-26.88 17.92-40.32 4.48-8.938667 8.96-26.858667 4.48-40.298667M516.48 305.92c4.48 0 8.96-4.48 17.92-8.96 13.44-8.96 26.901333-22.4 40.32-31.36 13.461333-8.96 26.901333-22.4 35.861333-31.36 13.44-8.96 22.4-26.88 26.88-40.341333 4.48-8.96 17.941333-26.88 13.44-40.32-4.48-8.96-26.88-13.44-35.84-17.92C579.2 126.698667 547.84 122.24 512 122.24c-13.44 0-31.36 4.458667-35.84 17.92-4.48 22.4 13.44 17.92 31.36 22.4 0 0 4.48 35.84 4.48 40.32 4.48 22.421333-8.96 35.84-8.96 58.24 0 13.44 0 35.84 8.96 44.8h4.48zM892.8 619.52c4.501333-8.96 4.501333-22.4 8.96-31.36 4.501333-22.421333 4.501333-44.8 4.501333-67.2 0-44.8-4.501333-89.578667-17.92-129.92-8.96-13.44-13.461333-26.88-17.941333-40.341333-8.96-22.378667-22.4-44.8-40.32-62.698667-17.92-22.4-40.341333-85.12-80.64-67.2-13.44 4.501333-22.4 22.421333-31.36 31.381333l-26.88 40.32c-4.501333 4.48-8.96 13.44-4.501333 17.92 0 4.48 4.501333 4.48 8.96 4.48 8.96 4.501333 13.461333 4.501333 22.421333 8.96 4.48 0 8.96 4.501333 4.48 8.96 0 0 0 4.501333-4.48 4.501334-22.421333 22.4-44.8 40.32-67.2 62.698666-4.48 4.48-8.96 13.44-8.96 17.92s4.48 4.48 4.48 8.96c0 4.501333-4.48 4.501333-8.96 8.96-8.96 4.501333-17.92 8.96-22.4 13.461334-4.48 8.96 0 22.4-4.48 31.36-4.48 22.4-17.941333 40.32-26.901333 62.72-8.96 13.418667-13.418667 26.88-22.378667 40.32 0 17.92-4.501333 31.36 4.458667 44.8 22.421333 31.36 62.72 13.44 94.08 26.901333 8.96 4.458667 17.92 4.458667 22.421333 13.418667 13.418667 13.461333 13.418667 35.861333 17.92 49.301333 4.458667 17.92 8.96 35.84 17.92 53.76 4.48 22.421333 13.44 44.821333 17.92 62.72 40.341333-31.36 76.16-67.178667 103.04-112 26.88-31.424 40.341333-67.242667 53.76-103.104"
                  fill="#CDDC39"
                  data-darkreader-inline-fill=""
                />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+2350</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">City</CardTitle>
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M10 4L10 20L2.9941406 20L3.1464844 46L17.046875 46L19.046875 46L33 46L47 46L47 8L31 8L31 9L31 28L25.996094 28L25.996094 4.0078125L10 4 z M 12 6L23.996094 6.0078125L23.996094 28L19.013672 28L18.998047 20L18 20L12 20L12 6 z M 15 8L15 10L17 10L17 8L15 8 z M 19.039062 8L19.039062 10L21 10L21 8L19.039062 8 z M 33 10L45 10L45 44L39.960938 44L39.960938 40L38 40L38 44L33 44L33 28L33 10 z M 15 12L15 14L17 14L17 12L15 12 z M 19 12L19 14L21 14L21 12L19 12 z M 36 12.003906L36 14L38 14L38 12.003906L36 12.003906 z M 40.019531 12.007812L40.019531 14.021484L41.980469 14.021484L41.980469 12.007812L40.019531 12.007812 z M 36 16.015625L36 18L38 18L38 16.015625L36 16.015625 z M 40.019531 16.015625L40.019531 18L41.980469 18L41.980469 16.015625L40.019531 16.015625 z M 36 20L36 22L38 22L38 20L36 20 z M 40 20L40 22L41.980469 22L41.980469 20L40 20 z M 5.0058594 22L17.001953 22L17.013672 28L16.998047 28L17.041016 44L11.980469 44L11.980469 40L10.019531 40L10.019531 44L5.1347656 44L5.0058594 22 z M 8 24L8 26.015625L10.039062 26.015625L10.039062 24L8 24 z M 12.039062 24L12.039062 26.015625L14 26.015625L14 24L12.039062 24 z M 36 24.007812L36 25.998047L38 25.998047L38 24.007812L36 24.007812 z M 40 24.007812L40 25.998047L41.980469 25.998047L41.980469 24.007812L40 24.007812 z M 8 27.984375L8 30L10.039062 30L10.039062 27.984375L8 27.984375 z M 12.039062 27.984375L12.039062 30L14 30L14 27.984375L12.039062 27.984375 z M 36 27.992188L36 30.007812L38 30.007812L38 27.992188L36 27.992188 z M 40.019531 27.992188L40.019531 30.007812L41.980469 30.007812L41.980469 27.992188L40.019531 27.992188 z M 19.017578 30L31 30L31 44L26 44L26 40L24 40L24 44L19.042969 44L19.017578 30 z M 8 32L8 34.015625L10.039062 34.015625L10.039062 32L8 32 z M 12.039062 32L12.039062 34.015625L14 34.015625L14 32L12.039062 32 z M 22 32L22 34.015625L24 34.015625L24 32L22 32 z M 26 32L26 34.015625L28 34.015625L28 32L26 32 z M 36 32L36 34.015625L38 34.015625L38 32L36 32 z M 40.019531 32L40.019531 34.015625L41.980469 34.015625L41.980469 32L40.019531 32 z M 22 35.984375L22 38L24 38L24 35.984375L22 35.984375 z M 26 35.984375L26 38L28 38L28 35.984375L26 35.984375 z M 36 35.984375L36 38L38 38L38 35.984375L36 35.984375 z M 40.019531 35.984375L40.019531 38L41.980469 38L41.980469 35.984375L40.019531 35.984375 z" />
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">{capitalizedWord}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Family Friendly
            </CardTitle>
            <svg
              fill="#000000"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 256 204"
              enable-background="new 0 0 256 204"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M65.833,110.349c-5.558,0-10.106-4.447-10.106-10.106c0-5.558,4.548-10.106,10.106-10.106s10.106,4.548,10.106,10.106 S71.392,110.349,65.833,110.349 M228.836,127.324c6.892,0,12.342-5.45,12.342-12.342c0-6.892-5.45-12.342-12.342-12.342 c-6.892,0-12.342,5.45-12.342,12.342C216.494,121.875,221.944,127.324,228.836,127.324z M241.819,130.53h-25.965 c-6.571,0.321-11.861,5.77-11.861,12.342v17.15c0,2.565,2.084,4.488,4.648,4.488s4.648-2.084,4.648-4.488v-14.425 c0-0.801,0.641-1.603,1.603-1.603c0.801,0,1.603,0.641,1.603,1.603v50.649c0,3.045,2.404,5.45,5.45,5.45s5.45-2.404,5.45-5.45V170.6 c0-0.801,0.641-1.603,1.603-1.603s1.603,0.641,1.603,1.603v25.645c0,3.045,2.404,5.45,5.449,5.45c3.046,0,5.45-2.404,5.45-5.45 v-50.489c0-0.801,0.641-1.603,1.603-1.603c0.801,0,1.603,0.641,1.603,1.603v14.425c0,2.565,2.084,4.488,4.648,4.488 c2.565,0,4.648-2.084,4.648-4.488v-17.31C253.519,136.3,248.39,130.851,241.819,130.53z M166.967,35.644 c9.136,0,16.669-7.373,16.669-16.669c0-9.136-7.373-16.669-16.669-16.669c-6.251,0-11.54,3.366-14.425,8.335 c-0.321,0.641-0.801,1.122-1.282,1.603c-3.206,3.206-8.495,3.206-11.7,0c-0.481-0.481-0.962-0.962-1.282-1.603 C140.361,24.905,152.382,35.644,166.967,35.644z M49.27,114.945V68.081C23.984,68.145,3.505,88.66,3.505,113.961 c0,0.33,0.016,0.656,0.024,0.984H49.27z M202.55,118.669c-4.007,0.481-7.533-2.404-8.014-6.411l-5.77-49.046 c-0.426-1.279-1.702-2.274-3.076-1.479c-0.693,0.401-1.092,1.173-1.092,1.974v0.146c0,0,4.167,34.781,4.328,35.422 c0.16,0.801,0.16,1.923,0.16,2.725v88.475c0,6.251-4.648,11.22-10.419,11.22c-5.77,0-10.418-4.969-10.418-11.22v-71.806 c0-1.434-1.571-2.606-3.039-1.844c-0.717,0.372-1.128,1.156-1.128,1.964v71.686c0,6.251-4.648,11.22-10.418,11.22 s-10.418-4.969-10.418-11.22V101.84c0-0.801,0-1.763,0.16-2.725c0-0.641,4.328-35.422,4.328-35.422v-0.211 c0-1.176-0.963-2.22-2.139-2.192c-1.093,0.026-1.87,0.817-2.028,1.762l-2.976,24.678c-0.555,4.602-4.46,8.064-9.095,8.064h-24.538 c-0.356-0.002-0.704-0.036-1.047-0.085c-0.255,0.422-0.596,0.801-1.021,1.107L79.892,119.96h18.983h8.386v7.21h-6.896v8.777 c0,6.896-5.642,12.538-12.538,12.538H61.733l14.349,19.603c2.17-0.962,4.567-1.501,7.089-1.501c9.679,0,17.553,7.874,17.553,17.553 s-7.874,17.553-17.553,17.553c-9.679,0-17.553-7.874-17.553-17.553c0-4.445,1.664-8.507,4.398-11.603L52.41,148.485H40.242 l-17.929,12.899v8.212c7.053,1.793,12.287,8.195,12.287,15.799c0,8.988-7.312,16.3-16.3,16.3S2,194.383,2,185.395 c0-7.783,5.484-14.305,12.79-15.915v-11.951l12.571-9.043H23.4c-6.896,0-12.538-5.642-12.538-12.538v-8.777H3.505v-7.21h8.846 h55.659l32.069-28.879c-0.282-0.768-0.442-1.597-0.438-2.473c0.021-4.036,3.279-7.681,7.314-7.661h20.007l2.819-23.186 c1.443-10.098,10.098-17.791,20.516-17.791h31.736c10.418,0,19.073,7.694,20.516,17.791l6.251,52.733 C209.121,114.502,206.397,118.028,202.55,118.669z M18.3,179.126c-3.457,0-6.269,2.812-6.269,6.269c0,3.457,2.812,6.269,6.269,6.269 c3.457,0,6.269-2.812,6.269-6.269C24.569,181.938,21.757,179.126,18.3,179.126z M75.648,184.141c0,4.148,3.375,7.523,7.522,7.523 s7.523-3.375,7.523-7.523s-3.375-7.523-7.523-7.523S75.648,179.993,75.648,184.141z" />{" "}
              </g>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+573</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>

      <div>


        
        <div>
          <h1>Flights</h1>
          {flightCards}
        </div>
    


      </div>
    </>


  );
}
