import { URLSearchParams } from "url"
import { CONFIG_API } from "./config"
import axios from "axios"
import { Coord, ForecastData, GeocodingData, WeatherData } from "./types"

class WeatherAPI{
   private createURL(endpoint: string , params: Record<string  , string|number>){
      const SearchParams = new URLSearchParams({
        appid: CONFIG_API.API_KEY,
        ...params,
      })
      return `${endpoint}?${SearchParams}`
   }
   

    private async fetchData<T>(url: string): Promise<T> {

        try{
          const response = await axios.get<T>(url);
          return response.data;
        }catch(error){
             console.log(`Weather API error: ${error}`);
             throw new Error("Failed to fetch data");
        }
    }

    async getCurrentWeather({lon , lat}: Coord): Promise<WeatherData>{
             const  url = this.createURL(`${CONFIG_API.BASE_URL}/weather`,{
                lat: lat.toString(),
                lon: lon.toString(),
                units: CONFIG_API.DEFAULT_PARAMS.units,
             });

             return this.fetchData<WeatherData>(url);
    }

    async getForecast({lon , lat}: Coord):Promise<ForecastData>{
           const url = this.createURL(`${CONFIG_API.BASE_URL}/forecast`,{
            lat: lat.toString(),
            lon: lon.toString(),
            units: CONFIG_API.DEFAULT_PARAMS.units
           });

           return this.fetchData<ForecastData>(url);
    }

    async reverseGeocode({lon , lat}:Coord):Promise<GeocodingData>{
      const url = this.createURL(`${CONFIG_API.GEO}/reverse`,{
           lat: lat.toString(),
           lon: lon.toString(),
           limit: 1
      });

      return this.fetchData<GeocodingData>(url);
    }

    
}

export const weatherApi = new WeatherAPI();