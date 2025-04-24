export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Clouds {
  all: number;
}
export interface Rain {
  '1h': number;
}
export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: (List | List2 | string)[];
  city: City;
}

export interface GeocodingData {
  name: string;
  local_names: Localnames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface List2 {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}



export  interface Localnames {
  ar?: string;
  ascii: string;
  bg?: string;
  ca?: string;
  de?: string;
  el?: string;
  en?: string;
  fa?: string;
  feature_name: string;
  fi?: string;
  fr: string;
  gl?: string;
  he?: string;
  hi?: string;
  id?: string;
  it?: string;
  ja?: string;
  la?: string;
  lt?: string;
  pt?: string;
  ru?: string;
  sr?: string;
  th?: string;
  tr?: string;
  vi?: string;
  zu?: string;
  af?: string;
  az?: string;
  da?: string;
  eu?: string;
  hr?: string;
  hu?: string;
  mk?: string;
  nl?: string;
  no?: string;
  pl?: string;
  ro?: string;
  sk?: string;
  sl?: string;
}






