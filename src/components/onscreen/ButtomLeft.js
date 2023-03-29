import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ButtomLeft(props){
    const [time, setTime] = useState();
    const [iconurl, setIconurl] = useState('');

    useEffect(() => {
        const fetchge = async() => {
            //if wether data was available 
            if (props.weatherdetail) {
                var iconcode = props.weatherdetail.data.weather[0].icon;
                setIconurl(`https://openweathermap.org/img/wn/${iconcode}@2x.png`);
                const url =`https://timezone.abstractapi.com/v1/current_time?api_key=${process.env.REACT_APP_TIME}&location=${props.cityname.name}`
                const response = await axios.get(url)
                    if (response.status === 200){
                        setTime(response.data);
                    }else{
                        console.log('error');
                    }
            }
        }
        fetchge()
        // eslint-disable-next-line
    }, [props.weatherdetail]);

    console.log(props.cityname.name)

    return(
        <div className="flex flex-col mt-28 sm:ml-10 md:m-0 md:absolute md:bottom-16 md:left-16 text-white md:flex-row font-sans">
            <div className="text-6xl md:text-9xl">{props.weatherdetail && Math.round(props.weatherdetail.data.main.temp)}&#176;</div>
            <div className="flex">
                <div className="flex flex-col justify-end items-center ">
                    {props.cityname.name.length<6 ? <h1 className="text-6xl">{props.cityname.name}</h1> : <h1 className="text-4xl md:text-4xl">{props.cityname.name}</h1> }
                    {time && <p className="flex justify-center w-screen absolute bottom-0 right-0 text-center md:block md:w-auto md:static text-1xl px-10 pb-2">{time.datetime}</p>}
                </div>
                <div className="absolute top-20 origin-right -rotate-90 right-2 md:righ-0 md:left-0 md:static md:origin-center md:rotate-0 md:flex md:flex-col md:justify-end md:items-center">
                    {iconurl && <img className="hidden md:block w-14 h-14" src={iconurl} alt="test"/>}
                    <p className="text-1xl px-5 pb-2">{props.weatherdetail && props.weatherdetail.data.weather[0].description}</p>
                </div>
            </div>
        </div>
    )
}
export default ButtomLeft;