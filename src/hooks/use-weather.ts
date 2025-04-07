import type { Coord } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS = {
    weather: (coords: Coord)=> { 
              return ["weather" , coords] as const;
            },
    forecast: (coords: Coord)=> {
        return ["forecast" , coords] as const;
    },
    location: (coords: Coord)=>{
        return ["location" , coords] as const;
    }
} as const;
export function useWeatherQuery(coordinates: Coord | null){
     return  useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? ({lat: 0 , lon:0})),
        queryFn: ()=>{
           return   coordinates? weatherApi.getCurrentWeather(coordinates):null;
        },
        enabled: !!coordinates,
      });
}

export function useForecastQuery(coordinates: Coord | null){
    return useQuery({
        //?? is NULLISH COALESCING which is used when the lefthand side is null or undefined then the righthand side content is used
        queryKey: WEATHER_KEYS.forecast(coordinates ?? ({lat: 0 , lon: 0})),
        queryFn: ()=>{
            return coordinates? weatherApi.getForecast(coordinates):null;
        },
        //enable is used to prevent unneccesary API calls due to null values which can lead to the crash of app
        enabled: !!coordinates
    });
}

export function useReverseGeocodeQuery(coordinates: Coord | null){
     return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? ({lat: 0 , lon: 0})),
        queryFn: ()=>{
            return coordinates ? weatherApi.reverseGeocode(coordinates):null;
        },
        enabled: !!coordinates
     })
} 