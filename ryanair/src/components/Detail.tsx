import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function DetailComponent() {
  const { city } = useParams();
  const firstletter = city?.charAt(0);
  const firstLetterCap = firstletter?.toUpperCase();
  const remainingletters = city?.slice(1);
  const capitalizedWord = (firstLetterCap as string) + (remainingletters as string);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Flight Costs
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capitalizedWord}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjojMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJoLWZ1bGwgdy1mdWxsIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgcng9IjAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIwJSIgcGFpbnQtb3JkZXI9InN0cm9rZSI+PC9yZWN0Pjxzdmcgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSIjMDAwMDAwIiB4PSIyMzEiIHk9IjIzMSIgcm9sZT0iaW1nIiBzdHlsZT0iZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9ImJsYWNrIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00LjYxIDE2Ljg4YzAtMS4xNS4zNi0yLjE3IDEuMDgtMy4wN2MuNzItLjkgMS42My0xLjQ4IDIuNzQtMS43M2MuMzEtMS4zNyAxLjAyLTIuNDkgMi4xMS0zLjM3czIuMzUtMS4zMiAzLjc2LTEuMzJjMS4zOCAwIDIuNjEuNDMgMy42OSAxLjI4czEuNzggMS45NSAyLjEgMy4yOWguMzNjLjkgMCAxLjczLjIyIDIuNDkuNjVzMS4zNyAxLjAzIDEuODEgMS43OWMuNDQuNzYuNjcgMS41OC42NyAyLjQ4YTQuOTQgNC45NCAwIDAgMS0yLjM2IDQuMjVjLS43My40NS0xLjU0LjY5LTIuNDEuNzJIOS40MWMtMS4zNC0uMDYtMi40Ny0uNTctMy40LTEuNTNjLS45My0uOTUtMS40LTIuMS0xLjQtMy40NHptMS43MSAwYzAgLjg3LjMgMS42Mi45IDIuMjZzMS4zMy45OCAyLjE5IDEuMDNIMjAuNmMuODYtLjA0IDEuNTktLjM5IDIuMTktMS4wM2MuNjEtLjY0LjkxLTEuNC45MS0yLjI2YzAtLjg4LS4zMy0xLjYzLS45OC0yLjI3Yy0uNjUtLjY0LTEuNDItLjk2LTIuMzItLjk2aC0xLjZjLS4xMSAwLS4xNy0uMDYtLjE3LS4xOGwtLjA3LS41N2MtLjExLTEuMDgtLjU4LTEuOTktMS40LTIuNzJjLS44Mi0uNzMtMS43Ny0xLjEtMi44Ni0xLjFjLTEuMDkgMC0yLjA1LjM3LTIuODUgMS4xYy0uODEuNzMtMS4yNyAxLjY0LTEuMzcgMi43MmwtLjA4LjU3YzAgLjEyLS4wNy4xOC0uMi4xOGgtLjUzYy0uODQuMS0xLjU0LjQ2LTIuMSAxLjA3cy0uODUgMS4zMy0uODUgMi4xNnoiPjwvcGF0aD48L2c+PC9zdmc+PC9zdmc+"
              alt="cloud"
            ></img>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Liked by Travelers
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Departure Flight Costs
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              The Price for Departure Flights is{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <style type="text/css">
                .st0 opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;
                .st1 fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;
              </style>
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M15,16.6V5c0-0.8-0.3-1.6-0.9-2.1C13.6,2.3,12.8,2,12,2c-1.7,0-3,1.3-3,3v11.6c-0.1,0.1-0.2,0.2-0.3,0.4   C8.2,17.5,8,18.2,8,19c0,1.7,1.1,3,2.5,3h3c0.7,0,1.4-0.4,1.8-1c0.4-0.5,0.7-1.3,0.7-2C16,18,15.6,17.2,15,16.6z M12,4   c0.3,0,0.5,0.1,0.7,0.3C12.9,4.5,13,4.7,13,5v11h-2v-1c0.6,0,1-0.4,1-1s-0.4-1-1-1v-2c0.6,0,1-0.4,1-1s-0.4-1-1-1V7   c0.6,0,1-0.4,1-1s-0.4-1-1-1C11,4.4,11.4,4,12,4z M13.8,19.8c0,0-0.1,0.2-0.3,0.2h-3c-0.2,0-0.5-0.4-0.5-1c0-0.3,0.1-0.6,0.3-0.8   c0,0,0.1-0.2,0.3-0.2h3c0.2,0,0.5,0.4,0.5,1C14,19.3,13.9,19.6,13.8,19.8z" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Liked by Travelers
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Arrival Flight Costs
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              The Price for Arrival Flights is{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <style type="text/css">
                .st0 opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;
                .st1 fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;
              </style>
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M15,16.6V5c0-0.8-0.3-1.6-0.9-2.1C13.6,2.3,12.8,2,12,2c-1.7,0-3,1.3-3,3v11.6c-0.1,0.1-0.2,0.2-0.3,0.4   C8.2,17.5,8,18.2,8,19c0,1.7,1.1,3,2.5,3h3c0.7,0,1.4-0.4,1.8-1c0.4-0.5,0.7-1.3,0.7-2C16,18,15.6,17.2,15,16.6z M12,4   c0.3,0,0.5,0.1,0.7,0.3C12.9,4.5,13,4.7,13,5v11h-2v-1c0.6,0,1-0.4,1-1s-0.4-1-1-1v-2c0.6,0,1-0.4,1-1s-0.4-1-1-1V7   c0.6,0,1-0.4,1-1s-0.4-1-1-1C11,4.4,11.4,4,12,4z M13.8,19.8c0,0-0.1,0.2-0.3,0.2h-3c-0.2,0-0.5-0.4-0.5-1c0-0.3,0.1-0.6,0.3-0.8   c0,0,0.1-0.2,0.3-0.2h3c0.2,0,0.5,0.4,0.5,1C14,19.3,13.9,19.6,13.8,19.8z" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Liked by Travelers
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4"></Card>
      </div>
    </>
  );
}
