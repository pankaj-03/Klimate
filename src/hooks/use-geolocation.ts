import { Coord } from '@/api/types';
import { useState  , useEffect} from 'react';
interface GeolocationState{
  coordinates: Coord | null;
  error: string | null;
  isLoading: boolean;
}
export function useGeolocation() {

  const [locationData , setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true
  });

    const  getLocation = ()=>{
      setLocationData((prev) => ({...prev , isLoading: true , error: null}));

      //user have not given permission for accessing location
      if(!navigator.geolocation){
        setLocationData({
          coordinates: null,
          error: "Geolocation is not supported by your browser",
          isLoading: false,
        });
        return;
      }

      // if given

      navigator.geolocation.getCurrentPosition((position)=>{
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false
        })
      },
    (error)=>{

      let errorMessage: string;
      switch (error.code){
        case error.PERMISSION_DENIED:
          errorMessage = "Location permission denied. Please enable location access.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage="Location request is timeout.";
          break;
        default:
           errorMessage = "The unknown error occured.";

      } 

      setLocationData({
        coordinates: null,
        error: errorMessage,
        isLoading: false,
      })
    },{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
    }


    useEffect(()=>{
      getLocation();
    } , [])

  return (
    {
      ...locationData,
      getLocation,
    }
   
  )
}

export default useGeolocation;
