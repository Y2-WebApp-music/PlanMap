import React, { useEffect, useState } from 'react';
import '/src/global.css';
import './map.css';
import { Loader } from "@googlemaps/js-api-loader"
import Information from './Information';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faUtensils, faGasPump, faMugHot } from '@fortawesome/free-solid-svg-icons'

function MapPlan({pathway, setDuration, setDistance, setPathway, setListLength, ListLength}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placePin, setPlacePin] = useState([])
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    const [marker, setMarker] = useState(null);

    const loader = new Loader({
        apiKey: "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE",
        version: "weekly",
        language: "th",
    });
    useEffect(()=>{
        setFilteredPathway(pathway.filter(point => point.lat !== null && point.lng !== null))
        return;
    },[pathway])

    useEffect(() => {
        const inputSe = document.getElementById("googleSearch");
            inputSe.addEventListener("click", () => {
            inputSe.select();
        });
        loader.load()
        .then(maps => {
            let map;

            async function initMap() {
                const { Map } = await google.maps.importLibrary("maps");
                const { Place } = await google.maps.importLibrary("places");
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                const position = { lat: 13.7734, lng: 100.5202 };
                const center = { lat: 13.7734, lng: 100.5202 };

                map = new Map(document.getElementById("map"), {
                    center: center,
                    zoom: 10,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
                const defaultBounds = {
                    north: center.lat + 2,
                    south: center.lat - 2,
                    east: center.lng + 2,
                    west: center.lng - 2,
                };

                const input = document.getElementById("googleSearch");
                const options = {
                    bounds: defaultBounds,
                    strictBounds: false,
                };
                const autocomplete = new google.maps.places.Autocomplete(input, options);
                autocomplete.bindTo("bounds", map);

                const marker = new google.maps.Marker({
                    map,
                    anchorPoint: new google.maps.Point(0, -29),
                });

                autocomplete.addListener("place_changed", () => {
                    marker.setVisible(false);
                    console.log(">>>> autocomplete <<<<")
                    const place = autocomplete.getPlace();
                    const photoUrl = place.photos[0].getUrl({maxWidth:1000})
                    const passPlace = place;

                    if (!place.geometry || !place.geometry.location) {
                        window.alert("No details available for input: '" + place.name + "'");
                        return;
                    }
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                        console.log('passPlace ==> ',passPlace)
                        setPlacePin(passPlace)
                        setPlacePhoto(photoUrl)
                        setDetail(true)
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }

                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);
                });

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: '#2E6FED',strokeWeight: 6 } });
                if (filteredPathway.length < 2) {
                    map.setCenter({ lat: 13.7734, lng: 100.5202 });
                    console.log(">>>> directionsRenderer <<<<")
                    return;
                } else{
                    const start = { lat: filteredPathway[0].lat, lng: filteredPathway[0].lng };
                    const end = { lat: filteredPathway[filteredPathway.length - 1].lat, lng: filteredPathway[filteredPathway.length - 1].lng };
                    const waypoints = [];

                    for (let i = 1; i < filteredPathway.length - 1; i++) {
                        waypoints.push({
                        location: new window.google.maps.LatLng(filteredPathway[i].lat, filteredPathway[i].lng),
                        stopover: true,
                        });
                    }
                    directionsService.route({
                        origin: new window.google.maps.LatLng(start.lat, start.lng),
                        destination: new window.google.maps.LatLng(end.lat, end.lng),
                        waypoints: waypoints,
                        optimizeWaypoints: true,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (response, status) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(response);
                            const route = response.routes[0];
                            let distance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0);
                            let duration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0);
                            setDistance(distance/1000)
                            setDuration(duration/60)

                        } else {
                        window.alert("Directions request failed due to " + status);
                        }
                    });
                    directionsRenderer.setMap(map);
                }
            }

            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway]);

    const [selectedFil, setSelectedFil] = useState(null);

    const handleFilterClick = (category) => {
        setSelectedFil(category === selectedFil ? null : category);
    };

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
                    <GoogleFilterBTN text={" โรงแรม"} icon={faHotel} category="hotels" isSelected={selectedFil === "hotels"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" สถานีน้ำมัน"} icon={faGasPump} category="gasStations" isSelected={selectedFil === "gasStations"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านอาหาร"} icon={faUtensils} category="restaurants" isSelected={selectedFil === "restaurants"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านกาแฟ"} icon={faMugHot} category="coffeeShops" isSelected={selectedFil === "coffeeShops"} Click={handleFilterClick} />
                </div>
            </div>
            {detail && (<Information placePin={placePin} placePhoto={placePhoto} setDetail={setDetail} marker={marker} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>)}
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
