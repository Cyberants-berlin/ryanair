import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function DetailComponent() {
  const { city } = useParams();
  const firstletter = city?.charAt(0);
  const firstLetterCap = firstletter?.toUpperCase();
  const remainingletters = city?.slice(1);
  const capitalizedWord =
    (firstLetterCap as string) + (remainingletters as string);
  return (
    <>
      <div className="grid  gap-4  md:grid-cols-2  lg:grid-cols-4">
        <Card>
          <CardHeader className="flex  flex-row  items-center  justify-between  space-y-0  pb-2">
            <CardTitle className="text-la  font-large">
              Overall Flight Costs
            </CardTitle>
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
              <path d="M12  2v20M17  5H9.5a3.5  3.5  0  0  0  0  7h5a3.5  3.5  0  0  1  0  7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">{capitalizedWord}</div>
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0  0  24  24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4  w-4  text-muted-foreground"
            >
              <path d="M22  12h-4l-3  9L9  3l-3  9H2" />
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
            {/*  <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0  0  24  24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4  w-4  text-muted-foreground"
                        >
                            <style  type="text/css">
                                .st0  opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;
                                .st1  fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;
                            </style>
                            <rect  width="20"  height="14"  x="2"  y="5"  rx="2"  />
                            <path  d="M15,16.6V5c0-0.8-0.3-1.6-0.9-2.1C13.6,2.3,12.8,2,12,2c-1.7,0-3,1.3-3,3v11.6c-0.1,0.1-0.2,0.2-0.3,0.4      C8.2,17.5,8,18.2,8,19c0,1.7,1.1,3,2.5,3h3c0.7,0,1.4-0.4,1.8-1c0.4-0.5,0.7-1.3,0.7-2C16,18,15.6,17.2,15,16.6z  M12,4      c0.3,0,0.5,0.1,0.7,0.3C12.9,4.5,13,4.7,13,5v11h-2v-1c0.6,0,1-0.4,1-1s-0.4-1-1-1v-2c0.6,0,1-0.4,1-1s-0.4-1-1-1V7      c0.6,0,1-0.4,1-1s-0.4-1-1-1C11,4.4,11.4,4,12,4z  M13.8,19.8c0,0-0.1,0.2-0.3,0.2h-3c-0.2,0-0.5-0.4-0.5-1c0-0.3,0.1-0.6,0.3-0.8      c0,0,0.1-0.2,0.3-0.2h3c0.2,0,0.5,0.4,0.5,1C14,19.3,13.9,19.6,13.8,19.8z"  />
                        </svg>  */}
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0  0  24  24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4  w-4  text-muted-foreground"
            >
              <path d="M22  12h-4l-3  9L9  3l-3  9H2" />
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
    </>
  );
}
