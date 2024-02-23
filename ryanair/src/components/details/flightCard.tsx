import React from "react";

// Import components from your UI library with types
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Separator } from "../ui/seperator";
import { Button } from "../ui/button";


const computeDuration = (departureDate: string, arrivalDate: string) => {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };
  






const FlightCard: React.FC = () => {
  // Hardcoded flight data



  const departure = {
    day: "2024-02-23",
    arrivalDate: "2024-02-23T09:45:00",
    departureDate: "2024-02-23T08:05:00",
    price: {
      value: 58.99,
      valueMainUnit: 58,
      valueFractionalUnit: 99,
      currencyCode: "EUR",
      currencySymbol: "€",
    },
    soldOut: false,
    unavailable: false,
    airport: "DUB",
  };

  const returnFlight = {
    day: "2024-02-25",
    arrivalDate: "2024-02-25T13:00:00",
    departureDate: "2024-02-25T11:15:00",
    price: {
      value: 79.99,
      valueMainUnit: 79,
      valueFractionalUnit: 99,
      currencyCode: "EUR",
      currencySymbol: "€",
    },
    soldOut: false,
    unavailable: false,
    airport: "DUB", // Add this property
  };

  const price = {
    currencySymbol: '$',
    valueMainUnit: 138.98
};

return (
//   ganze card 
<div>
    {/* Hinflug und Heimflug */}
    <div>
        {/* Hinflug */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Dublin (DUB) - London (LHR)</CardTitle>
                    <CardDescription>One way</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
        {/* Heimflug */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>London (LHR) - Dublin (DUB)</CardTitle>
                    <CardDescription>One way</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
        {/* Price  */}
        <div>
            <Separator orientation="vertical" />
            <Card>
                <CardHeader>
                    <CardTitle>Total</CardTitle>
                    <CardDescription>{price.currencySymbol} {price.valueMainUnit}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Book now</Button>
                </CardContent>
            </Card>
        </div>
    </div>

</div>
  );
};

export default FlightCard;