import {  useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { fetchWeatherApi } from 'openmeteo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { useTheme } from '../Theme';


interface WeatherData {
  time: string;
  temperature: number;
}

export function CardsMetric() {
  const { theme } = useTheme();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        "latitude": 52.5244,
        "longitude": 13.4105,
        "hourly": ["temperature_2m"],
        "timezone": "Europe/Berlin",
        "forecast_days": 7
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const hourly = response.hourly()!;
      const temperatureData = hourly.variables(0)!.valuesArray()!;
      const timeData = range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date(t * 1000)
      );

      const chartData = timeData.map((time, index) => ({
        time: time.toLocaleTimeString(),
        temperature: temperatureData[index]
      }));
      setWeatherData(chartData);
    };

    fetchData();
  }, []);
  const getLineColor = () => {
    // Define how you want to determine the line color based on the theme
    return theme === 'dark' ? '#someDarkThemeColor' : '#someLightThemeColor';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Data</CardTitle>
        <CardDescription>
          Hourly temperature data from Open Meteo API.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weatherData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                formatter={(value, _name, props) => [
                  `${value}°C`, 
                  `Date: ${props.payload.time.toLocaleString()}`
                ]}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                strokeWidth={2}
                dot={false}
                style={{ stroke: getLineColor() }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
