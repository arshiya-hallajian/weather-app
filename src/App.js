import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backgrounds from './assets/images';
import ButtomLeft from './components/onscreen/ButtomLeft';
import Logo from './components/onscreen/Logo';
import Side from './components/Side';


function App() {
    const [location, setLocation] = useState();
    const [locData, setLocData] = useState();

    useEffect(() => {
        const fetchfunc = async() =>{
            //if lat and long by search was available 
            if (location) {
                const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHERID}`
                const response = await axios.get(apiurl)
                    if (await response.status === 200) {
                        setLocData(response);
                    }else {
                        console.log(response);
                    }
            }else {
                //take lat and long from api and get weather information
                const ipapi2 = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEO}`;
                 const fresponse = await axios.get(ipapi2)
                    // setLocData(response)
                    if (await fresponse.status === 200) {
                        const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${fresponse.data.latitude}&lon=${fresponse.data.longitude}&appid=${process.env.REACT_APP_WEATHERID}`
                        
                            const response = await axios.get(apiurl)
    
                                if (response.status === 200) {
                                    setLocData(response)
                                    setLocation({
                                        name: `${fresponse.data.city}`,
                                        latitude: `${fresponse.data.latitude}`,
                                        longitude: `${fresponse.data.longitude}`
                                    })
                                }else {
                                    console.log(response);
                                }
                        
                    }else {
                        console.log(fresponse);
                    }
            }
        }


        fetchfunc();
    }, [location]);

    //change wallpaper by weatherdata
    function select_wallpaper() {
        var id;
        if (locData) {
            id = locData.data.weather[0].id;
        }
        if (id >= 200 && id <= 232) {
            return Backgrounds.storm;
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            return Backgrounds.rainy;
        } else if (id >= 600 && id <= 622) {
            return Backgrounds.snow;
        } else if (id >= 701 && id <= 781) {
            return Backgrounds.foggy;
        } else if (id === 800) {
            return Backgrounds.clear;
        } else if (id >= 801 && id <= 804) {
            if (id === 801) {
                return Backgrounds.sunny;
            } else {
                return Backgrounds.cloudy;
            }
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-900 md:px-16 px-0 p-0 md:py-20">
            <div className="h-full w-full bg-cover bg-bottom relative shadow-[0px_0px_25px_0px_#2d3748] overflow-hidden"
                 style={{backgroundImage: `url(${select_wallpaper()})`}}>
                <Logo/>
                {locData && <ButtomLeft weatherdetail={locData && locData} cityname={location && location}/>}
                <Side getlocation={loc => setLocation(loc)} weatherdetail={locData && locData}/>
            </div>
        </div>
    );
}

export default App;
