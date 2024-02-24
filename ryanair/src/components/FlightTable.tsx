import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '../../ui/table';

const flights = new Array(10).fill({
  flight: "FR 1234",
  departure: "DUB",
  arrival: "STN",
  price: "€19.99"
});
  
  export function FlightTable() {
    return (
      <Table>

        <TableHead>
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight, index) => (
            <TableRow key={index}>
              <TableCell>{flight.flight}</TableCell>
              <TableCell>{flight.departure}</TableCell>
              <TableCell>{flight.arrival}</TableCell>
              <TableCell>{flight.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* If you need a TableFooter, it can be added here */}
      </Table>
    );
  }
  