import { Link } from "react-router-dom";
import dlogo from "../assets/logo.png"
import llogo from "../assets/logo2.png"
import { useTheme } from "@/context/theme-provider";
import { Sun , Moon } from "lucide-react";
import CitySearch from "./city-search";
const Header = () => {
  const {theme , setTheme} = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-16 flex items-center justify-between px-4">
          <Link to={"/"}>
          <img src = {theme === 'dark' ? dlogo : llogo} alt = "LightMode" className="h-14"></img></Link>

          <div className="flex gap-4">
            {/* search */}
            <CitySearch/>
            {/* theme toggle */}
            <div onClick = {()=>{setTheme(isDark ? 'light' : 'dark')}}
              className = {`flex items-center cursor-pointer transition-transform  duration-500
              ${isDark ? "rotate-180" : "rotate-0"}`}>
              {isDark ? (<Sun className = "h-6 w-6 rotate-0 text-yellow-500 transition-all"></Sun>
              ) : (
               <Moon className="h-6 w-6 rotate-0 text-green-700 transition-all"></Moon>
              )}
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header;
