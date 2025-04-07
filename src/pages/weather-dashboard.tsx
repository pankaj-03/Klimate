import { Button } from "@/components/ui/button";
import useGeolocation from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw} from "lucide-react";
import { WeatherSkeleton } from "@/components/loading-skeleton";
import { Alert , AlertTitle , AlertDescription} from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import CurrentWeather from '../components/current-weather'


const WeatherDashboard = () => {

  const {coordinates , 
         error: locationError , 
         getLocation, 
         isLoading: locationLoading} = useGeolocation();

  // console.log(locationError);
  const weatherQuery = useWeatherQuery(coordinates);
  // console.log(weatherQuery);
  const forecastQuery = useForecastQuery(coordinates);
  // console.log(forecastQuery);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  // console.log(locationQuery);

  const handleRefresh = () => {
      getLocation();

    
      if(coordinates){
        //reload the weather data
        weatherQuery.refetch();
        forecastQuery.refetch();
        locationQuery.refetch();
      }
    };


      if(locationLoading){
        return <WeatherSkeleton/>
      }

      if(locationError){
       return  ( <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
           <p>{locationError}</p>
           <Button onClick={getLocation} variant="outline" className="w-fit">
              <MapPin className="mr-2 h-4 w-4"></MapPin>
              Enable Location
           </Button>
        </AlertDescription>
      </Alert>)
      }
      

      if(!coordinates){
        return  ( <Alert variant="destructive">
         <AlertTitle>Location Required</AlertTitle>
         <AlertDescription className="flex flex-col gap-4">
            <p>Please enable location access to see your local weather.</p>
            <Button onClick={getLocation} variant="outline" className="w-fit">
               <MapPin className="mr-2 h-4 w-4"></MapPin>
               Enable Location
            </Button>
         </AlertDescription>
       </Alert>)
       }
   
       const locationName = locationQuery.data?.[0];

       if(weatherQuery.error || forecastQuery.error){
        return (
          <Alert variant="destructive">
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
             <p>Fail to fetch weather data. Please try again.</p>
             <Button onClick={handleRefresh} variant="outline" className="w-fit">
                <RefreshCcw className="mr-2 h-4 w-4"></RefreshCcw>
                Retry 
             </Button>
          </AlertDescription>
        </Alert>
        )
       }

       if(!weatherQuery.data || !forecastQuery.data){
        return <WeatherSkeleton></WeatherSkeleton>
       }


  return (
    <div className="space-y-4">
        {/* Favourites */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button size = {'icon'} 
            variant = {"outline"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            >
            <RefreshCcw className = {`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : "" }`}/>
          </Button>
          
        </div>

        <div className = "grid gap-6">
            <div>
                 <CurrentWeather data={weatherQuery.data} locationName={locationName}></CurrentWeather>
                 {/* current weather */}
                 {/* hourly temperature */}
            </div>

            <div>
                 {/* details */}
                 {/* forecast */}
            </div>

        </div>

    </div>
  )
}

export default WeatherDashboard;
