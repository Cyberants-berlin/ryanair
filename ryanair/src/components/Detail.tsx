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
            <CardTitle className="text-la  font-large">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  font-medium">+12,234</div>
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
    </>
  );
}
