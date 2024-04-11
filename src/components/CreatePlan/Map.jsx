import React, { useEffect,useState } from 'react';
import '/src/global.css';
import './map.css';

import { loadGoogleMapsScript } from '/src/components/MapLoader.js'


function Map({pathway, setDuration, setDistance}) {
    useEffect(() => {

        const input = document.getElementById("google-search");
            input.addEventListener("click", () => {
            input.select();
        });
        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            const map = new Map(document.getElementById("map"), {
                center: { lat: 13.7734, lng: 100.5202 },
                zoom: 10,
                mapId: "4504f8b37365c3d0",
                mapTypeControl: false,
                disableDefaultUI: true,
            });
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const card = document.getElementById("pac-card");
            const input = document.getElementById("google-search");
            const options = {
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: false,
            };

            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);

            const autocomplete = new window.google.maps.places.Autocomplete(
                input,
                options
            );

            autocomplete.bindTo("bounds", map);
            autocomplete.addListener("place_changed", () => {

                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    window.alert(
                        "No details available for input: '" + place.name + "'"
                );
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }


                map.panTo(place.geometry.location);
                map.setZoom(17);

                const marker = new AdvancedMarkerElement({
                    map,
                    position: place.geometry.location,
                });
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: '#2E6FED',strokeWeight: 6 } });
            const filteredPathway = pathway.filter(point => point.lat !== null && point.lng !== null);
            if (filteredPathway.length < 2) {
                map.setCenter({ lat: 13.7734, lng: 100.5202 });
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
        loadGoogleMapsScript(initMap);
    }, [pathway]);

    return (
        <div className="Map-container">
            <div className="SearchArea">
                <div className="google-searchBox">
                    <label htmlFor="google-search" id="google-searchLabel">
                        <input type="text"
                                placeholder="ค้นหาใน google map"
                                id="google-search"/>
                        {/* <FontAwesomeIcon icon={searchICON} size="lg" style={{ color: 'var(--color-text)' }}/> */}
                    </label>
                </div>
                <div className="FilterBTN-class">
                    <GoogleFilterBTN text={"🏬 โรงแรม"} category="hotels" />
                    <GoogleFilterBTN text={"⛽️ สถานีน้ำมัน"} category="gasStations" />
                    <GoogleFilterBTN text={"🍽️ ร้านอาหาร"} category="restaurants" />
                    <GoogleFilterBTN text={"☕️ ร้านกาแฟ"} category="coffeeShops" />
                </div>
            </div>

            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

function GoogleFilterBTN({ text, category }) {
    return(
        <div>
            <input
                type="button"
                className="GoogleFilterBTN"
                value={text}
                data-category={category}
            />
        </div>
    )
}

export default Map;
