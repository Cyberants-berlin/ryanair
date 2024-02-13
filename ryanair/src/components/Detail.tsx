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
