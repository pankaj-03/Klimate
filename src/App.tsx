import './App.css'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Layout  from './components/layout';
import { ThemeProvider } from './context/theme-provider';
import CityPage from './pages/city-page';
import WeatherDashboard from './pages/weather-dashboard';
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();
function App() {
  
 
return (
    <QueryClientProvider client = {queryClient}>
           <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
    <Layout>
        <Routes>
            <Route path='/' element = {<WeatherDashboard/>}></Route>
            <Route path="/city/:cityName" element={<CityPage/>}></Route>
        </Routes>
    </Layout>
    </ThemeProvider>
    
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    
  )
}

export default App;
