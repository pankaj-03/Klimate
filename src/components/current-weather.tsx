import type { GeocodingData, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData,
  locationName?: GeocodingData
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  //  console.log(locationName);
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: {speed},
  } = data;

  //function to format temperature
  const formatTemp = (data: number) => {
    return `${Math.round(data)}°`;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              {/* Location  */}
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (<span className="text-muted-foreground">
                  ,{locationName.state}
                </span>)}
              </div>

              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-7xl font-bold tracking-tighter">
                <p>{formatTemp(temp)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(feels_like)}</p>

                <div className="flex ">
                  <span className="flex items-center gap-1 text-blue-600">
                    <ArrowDown />{formatTemp(temp_max)}
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <ArrowUp />{formatTemp(temp_min)}
                  </span>
                </div>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500"></Droplet>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-col justify-center items-center">
              <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img src = {`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}  
                     alt={CurrentWeather.description}
                     className="w-full h-full object-contain"/>
                <div className="absolute bottom-0 text-center">
                    <p className="text-sm font-medium">
                      {CurrentWeather.description}
                    </p>
                </div>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

export default CurrentWeather;