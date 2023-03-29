import React, {useState, useEffect} from 'react';
import {HiX, HiSearch} from 'react-icons/hi';
import Search from './Search';
import axios from 'axios';



function Side(props) {
    //first part 
    const [toggleside, setToggleside] = useState(false);
    const [citySuggest, setCitySuggest] = useState('');
    const [cityList, setCityList] = useState();
    //second part
    const [searchInformation, setSearchInformation] = useState({
        name: '',
        latitude: 0,
        longitude: 0,
    });
    

    

    useEffect(() => {
        const fetchC = async() => {

            const apicore = axios.create({
                baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_CITY,
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            });
    
            if (citySuggest) {
                const response = await apicore.get(`?namePrefix=${citySuggest}&types=CITY&minPopulation=3500&limit=6`)
                    if(await response.status === 200) {
                        setCityList(response.data.data);
                    }else if(response.status === 429){
                        return console.log("");
                    }else{
                        console.log(response)
                    }
            }
        }
        fetchC();

    }, [citySuggest]);

    function SuggestHandler(name, lat, long) {
        setSearchInformation({
            name: `${name}`,
            latitude: lat,
            longitude: long
        });
        props.getlocation(searchInformation)
    }


    return (<>
            <button onClick={() => setToggleside(!toggleside)}
                    className="absolute top-0 right-0 text-white w-16 h-16 flex justify-center items-center hover:bg-gray-500 z-10">
                {toggleside ? <HiX size={25}/> : <HiSearch size={25}/>}
            </button>

            <div className={!toggleside ? 'absolute top-0 right-[-100%] w-screen md:w-2/5 h-full bg-black/10 backdrop-blur-md duration-500' : 'absolute top-0 right-0 w-screen md:w-2/5 h-full bg-black/30 backdrop-blur-md duration-500 overflow-y-auto scrollbar-hide'}>
                <div className="mx-6 md:mx-14 my-10 text-gray-300">
                    <Search onSearchHandler={scity => setCitySuggest(scity)}/>
                    {cityList && <div className="h-1 border-t border-gray-400/60 my-10"></div>}
                    <div>
                        {cityList && cityList.map((city, i) =>
                            <div key={i} className="text-sm mb-4 hover:bg-gray-700/50 hover:rounded-xl hover:pointer px-5"
                                 onClick={() => SuggestHandler(city.name, city.latitude, city.longitude)}
                            >{city.name}, {city.region}, {city.countryCode}</div>
                        )}
                    </div>
                    {props.weatherdetail && <div className="h-1 border-t border-gray-400/60 my-10"></div>}
                    {props.weatherdetail && <div>
                        <h1 className="text-lg text-gray-200 mb-6">Weather details</h1>
                        <div className="flex justify-between mb-4 w-full">
                            <p>cloudy</p>
                            <p>{props.weatherdetail.data.clouds.all}%</p>
                        </div>
                        <div className="flex justify-between mb-4 w-full">
                            <p>Humidity</p>
                            <p>{props.weatherdetail.data.main.humidity}%</p>
                        </div>
                        <div className="flex justify-between mb-4 w-full">
                            <p>Wind</p>
                            <p>{props.weatherdetail.data.wind.speed}m/s</p>
                        </div>
                        <div className="flex justify-between mb-4 w-full">
                            <p>Pressure</p>
                            <p>{props.weatherdetail.data.main.pressure}</p>
                        </div>
                        {props.weatherdetail.data.rain && <>
                        <div className="flex justify-between mb-4 w-full">
                            <p>Rain</p>
                            <p>{props.weatherdetail.data.rain['1h']}mm</p>
                        </div>
                        </>}
                        {props.weatherdetail.data.snow && <>
                        <div className="flex justify-between mb-4 w-full">
                           <p>Snow</p>
                           <p>{props.weatherdetail.data.snow['1h']}mm</p>
                        </div>
                        </>}
                    </div>
                    }

                </div>
            </div>

        </>
    )
}

export default Side;