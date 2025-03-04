import { Button } from "@/components/ui/button";
import { RefreshCcw} from "lucide-react";

const WeatherDashboard = () => {
  return (
    <div className="space-y-4">
        {/* Favourites */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button size = {'icon'} 
            variant = {"outline"}
            // onClick={handleRefresh}
            // disabled={}
            >
            <RefreshCcw/>
          </Button>
          
        </div>

    </div>
  )
}

export default WeatherDashboard;
