import React, { useState, useEffect } from "react";
import './weatherAPI.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'

const api = {
    key: "f691e7c3239c23d19b0ee9ae9972f6b8",
    base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherAPI({place}){

    // const [weather, setWeather] = useState({});

    // useEffect(() => {
    //     fetchWeatherData();
    // }, [place]);

    // const fetchWeatherData = () => {
    //     console.log("Searching weather for:", place);
    //     fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             setWeather(result);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching weather data:", error);
    //         });
    // }

    const [weather, setWeather] = useState({
        "coord": {
            "lon": 100.5167,
            "lat": 13.75
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 34.44,
            "feels_like": 41.44,
            "temp_min": 33.28,
            "temp_max": 39.39,
            "pressure": 1009,
            "humidity": 57,
            "sea_level": 1009,
            "grnd_level": 1008
        },
        "visibility": 10000,
        "wind": {
            "speed": 5.34,
            "deg": 178,
            "gust": 4.49
        },
        "clouds": {
            "all": 3
        },
        "dt": 1710745025,
        "sys": {
            "type": 2,
            "id": 2032756,
            "country": "TH",
            "sunrise": 1710717807,
            "sunset": 1710761313
        },
        "timezone": 25200,
        "id": 1609350,
        "name": "Bangkok",
        "cod": 200
    });

    return (
        <div className="weatherReport">
            {weather && weather.main && (
                <div className="weatherReport-Grid">
                        <WeatherIcon
                            description={weather.weather[0].description}
                        />
                    <div className="WeatherDetail-Grid">
                        <div>
                            <div className="WeatherPlace">
                                <FontAwesomeIcon icon={faLocationDot} size="lg" style={{color : 'var(--color-red)'}}/>
                                <h2>{place}</h2>
                            </div>
                            <h1>{Math.round(weather.main.temp)} °C</h1>
                            <p>วันที่ 23 มี.ค. 2567</p>
                        </div>
                        <div>
                            <p>Weather : {weather.weather[0].main}</p>
                            <span>{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</span>
                            <p>Feels like {Math.round(weather.main.feels_like)}°</p>
                        </div>
                    </div>
                </div>
            )}
            {!weather.main && <p>No weather data available</p>}
        </div>
    );
}

function WeatherIcon({description}){

    const getIconUrl = (description) => {
        switch (description.toLowerCase()) {
            case 'clear sky':
                return '/public/icons/Clear.png';
            case 'few clouds':
                return '/public/icons/Partly-cloudy.png';
            case 'scattered clouds':
            case 'broken clouds':
                return '/public/icons/Cloudy.png';
            case 'shower rain':
            case 'rain':
            case 'light rain':
            case 'moderate rain':
            case 'light intensity shower rain':
                return '/public/icons/Rain.png';
            case 'extreme rain':
            case 'heavy intensity rain':
            case 'very heavy rain':
            case 'heavy intensity shower rain':
            case 'ragged shower rain':
                return '/public/icons/Heavy-rain.png';
            case 'thunderstorm':
            case 'thunderstorm with light rain':
            case 'thunderstorm with rain':
            case 'thunderstorm with heavy rain':
            case 'light thunderstorm':
            case 'heavy thunderstorm':
            case 'ragged thunderstorm':
            case 'thunderstorm with light drizzle':
            case 'thunderstorm with drizzle':
            case 'thunderstorm with heavy drizzle':
                return '/public/icons/Thunderstorm.png';
            case 'snow':
            case 'light snow':
            case 'heavy snow':
                return '/public/icons/Snow.png';
            case 'sleet':
            case 'light shower sleet':
            case 'shower sleet':
                return '/public/icons/Blizzard.png';
            case 'freezing rain':
            case 'light rain and snow':
            case 'rain and snow':
            case 'light shower snow':
            case 'shower snow':
            case 'heavy shower snow':
                return '/public/icons/Freezing-rain.png';
            case 'haze':
            case 'mist':
            case 'smoke':
            case 'sand/dust whirls':
            case 'sand':
            case 'dust':
            case 'volcanic ash':
            case 'squalls':
            case 'tornado':
                return '/public/icons/Haze.png';
            case 'fog':
                return '/public/icons/Fog.png';
            case 'light intensity drizzle':
            case 'drizzle':
            case 'heavy intensity drizzle':
            case 'light intensity drizzle rain':
            case 'drizzle rain':
            case 'heavy intensity drizzle rain':
            case 'shower rain and drizzle':
            case 'heavy shower rain and drizzle':
            case 'shower drizzle':
                    return '/public/icons/Drizzle.png';
            default:
                return '';
        }
    };

    const iconUrl = getIconUrl(description);

    return(
        <div>
            {iconUrl && <img src={iconUrl} alt={description} style={{ maxWidth: '100px' }} />}
        </div>
    )
}

export default WeatherAPI

