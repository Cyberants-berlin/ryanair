import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const flights = new Array(10).fill({
  flight: "FR 1234",
  departure: "DUB",
  arrival: "STN",
  price: "19.99€"
});

export function FlightTable() {
  return (
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Flight</TableHead>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights.map((flight, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{flight.flight}</TableCell>
            <TableCell>{flight.departure}</TableCell>
            <TableCell>{flight.arrival}</TableCell>
            <TableCell className='text-right'>{flight.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
