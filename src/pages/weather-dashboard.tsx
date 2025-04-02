import { Button } from "@/components/ui/button";
import useGeolocation from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw} from "lucide-react";
import { WeatherSkeleton } from "@/components/loading-skeleton";
import { Alert , AlertTitle , AlertDescription} from "@/components/ui/alert";
const WeatherDashboard = () => {

  const {coordinates , 
         error: locationError , 
         getLocation, 
         isLoading: locationLoading} = useGeolocation();

  // console.log(locationError);

  const handleRefresh = () => {
      getLocation();

    
      if(coordinates){
        //reload the weather data
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
   


  return (
    <div className="space-y-4">
        {/* Favourites */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button size = {'icon'} 
            variant = {"outline"}
            onClick={handleRefresh}
            // disabled={}
            >
            <RefreshCcw/>
          </Button>
          
        </div>

    </div>
  )
}

export default WeatherDashboard;
