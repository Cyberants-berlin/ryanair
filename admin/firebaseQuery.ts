// stellt e. Verbindung zu Firebase her und zeigt Fluginfos für eine bestimmte Stadt aus einer Firestore-Datenbank an.


import { getFirestore, collection, getDocs, query, where, limit } from "firebase/firestore";

import  {  initializeApp  }  from  "firebase/app";
//  TODO:  Add  SDKs  for  Firebase  products  that  you  want  to  use
//  https://firebase.google.com/docs/web/setup#available-libraries


const  firebaseConfig  =  {
    apiKey:  "AIzaSyCFm7uYs6DMHFWi3en4_m2Jiio5194eS7w",
    authDomain:  "ryanair-4cd15.firebaseapp.com",
    databaseURL:  "https://ryanair-4cd15-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:  "ryanair-4cd15",
    storageBucket:  "ryanair-4cd15.appspot.com",
    messagingSenderId:  "937464188569",
    appId:  "1:937464188569:web:360934dc26bff912d57208",
    measurementId:  "G-KPYQGYGSZS"
};


const  app  =  initializeApp(firebaseConfig);


interface FlightDetails {
    departure: FlightSegment;
    return: FlightSegment;
    cityCode: string;
    price: number;
  }
  
  interface FlightSegment {
    day: string; 
    arrivalDate: string; 
    departureDate: string; 
    price: PriceDetails;
    soldOut: boolean;
    unavailable: boolean;
  }
  
  interface PriceDetails {
    value: number;
    valueMainUnit: string;
    valueFractionalUnit: string;
    currencyCode: string; 
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
  
  
      const details = flightDetailsSnapshot.docs.map(doc => doc.data() as FlightDetails);
      flightDetailsArray = flightDetailsArray.concat(details);
    }
   
    
    return flightDetailsArray;
  }



  const myCity= "venice"

  getFlightDetailsByCity(myCity).then(flights => {
    if (flights.length > 0) {
      flights.forEach((flight) => {
        console.log(flight.departure.price.value, flight.departure.price.currencyCode);
      });
    } else {
      console.log("No flights found for this city.");
    }
  }).catch(error => {
    console.error("Failed to fetch flight details:", error);
  });


  



