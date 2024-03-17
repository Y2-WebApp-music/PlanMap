import React, { useState, useEffect } from "react";

const api = {
    key: "f691e7c3239c23d19b0ee9ae9972f6b8",
    base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherAPI({place}){

    const [weather, setWeather] = useState({});

    useEffect(() => {
        fetchWeatherData();
    }, [place]);

    const fetchWeatherData = () => {
        console.log("Searching weather for:", place);
        fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    return (
        <div>
        {weather && weather.main && (
            <div>
                <h2>Weather in {place}</h2>
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Description: {weather.weather[0].description}</p>
            </div>
        )}
        {!weather.main && <p>No weather data available</p>}
    </div>
    );
}

export default WeatherAPI

