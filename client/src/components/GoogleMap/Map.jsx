import React, { useEffect, useState, useRef } from 'react';
import '/src/global.css';
import './map.css';
import { Directions } from './MapService/DirectionSevice';
import { Loader } from "@googlemaps/js-api-loader"
import {Information, PlaceList} from './Information';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faUtensils, faGasPump, faMugHot } from '@fortawesome/free-solid-svg-icons'

function MapPlan({pathway, setDuration, setDistance, setPathway, setListLength, ListLength}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placePin, setPlacePin] = useState([])
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    const [selectedFil, setSelectedFil] = useState(null)
    const [nearbyPlace, setNearbyPlace] = useState([])
    const mapRef = useRef(null);

    const handleFilterClick = (category) => {
        setSelectedFil(category === selectedFil ? null : category);
    };
    useEffect(()=>{
        setFilteredPathway(pathway.filter(point => point.lat !== null && point.lng !== null))
        return;
    },[pathway])

    const loader = new Loader({
        apiKey: "AIzaSyC7UkiV3QbtcQdklInc_osWD0arPm8cQVA",
        version: "weekly",
        language: "th",
    });

    useEffect(() => {
        loader.load()
        .then(maps => {
            let map;
            let activeMarker = null;

            async function initMap( {mapRef} ) {
                const { Map } = await google.maps.importLibrary("maps");
                const { Place } = await google.maps.importLibrary("places");
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

                map = new Map(document.getElementById("map"), {
                    center: { lat: 13.7734, lng: 100.5202 },
                    zoom: 12,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });
                map.addListener("click", (event) => {
                    if (activeMarker) {
                        activeMarker.setMap(null);
                    }
                    addMarker(event.latLng, map);
                });
            }
            initMap(mapRef);
            function addMarker(location, map) {
                activeMarker = new google.maps.Marker({
                    map: map,
                });
                activeMarker.setVisible(false);
                activeMarker.setPosition(location);
                activeMarker.setVisible(true);
                getPlaceDetails(location, map);
            }
            function getPlaceDetails(location, map) {
                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                    location: location,
                    radius: 20,
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const place = results[0];
                        // for (let i = 0; i < results.length; i++) {
                        //     addMarker(results[i].geometry.location,map)
                        // }
                        console.log("Place details:", results);
                    } else {
                        console.error("Error fetching place details:", status);
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway, selectedFil]);

    return (
        <div className="Map-container">
            <div className="SearchArea">
                <div className="google-searchBox">
                    <label id="google-searchLabel">
                        <input type="text"
                                placeholder="ค้นหาใน google map"
                                id="googleSearch"/>
                    </label>
                </div>
                <div className="FilterBTN-class">
                    <GoogleFilterBTN text={" โรงแรม"} icon={faHotel} category="lodging" isSelected={selectedFil === "lodging"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" สถานีน้ำมัน"} icon={faGasPump} category="gas_station" isSelected={selectedFil === "gas_station"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านอาหาร"} icon={faUtensils} category="restaurant" isSelected={selectedFil === "restaurant"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านกาแฟ"} icon={faMugHot} category="cafe" isSelected={selectedFil === "cafe"} Click={handleFilterClick} />
                </div>
            </div>
            {detail && (<Information placePin={placePin} placePhoto={placePhoto} setDetail={setDetail} marker={marker} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>)}
            {nearbyPlace != null && selectedFil != null ?  (
                <div className='placeList-scroll' id='horizon-wheel'>
                    <div className='placeList-contain-all'>
                        {nearbyPlace.map((item,index) =>(
                            <PlaceList key={index} placePin={item} placePhoto={photoTest} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>
                        ))}
                    </div>
                </div>
            ):
            <></>}
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

function GoogleFilterBTN({ text, category, isSelected, Click, icon }) {
    return(
        <div>
            <button className={`GoogleFilterBTN ${isSelected ? "selected" : ""}`} onClick={() => Click(category)}>
                <FontAwesomeIcon icon={icon} size="sm" id='GoogleFilter-icon'/>
                {text}
            </button>
        </div>
    );
}

export default MapPlan;
