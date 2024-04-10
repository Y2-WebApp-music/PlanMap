import React, { useEffect } from 'react';
import '/src/global.css';
import './map.css';

import { loadGoogleMapsScript } from '/src/components/MapLoader.js'


function Map({pathway}) {
    useEffect(() => {
        console.log('pathway',pathway)

        const input = document.getElementById("google-search");
            input.addEventListener("click", () => {
            input.select();
        });
        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();

            const start = { lat: pathway[0].lat, lng: pathway[0].lng };
            const end = { lat: pathway[pathway.length - 1].lat, lng: pathway[pathway.length - 1].lng };
            const waypoints = [];
            for (let i = 1; i < pathway.length - 1; i++) {
                waypoints.push({
                    location: new window.google.maps.LatLng(pathway[i].lat, pathway[i].lng),
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
                } else {
                window.alert("Directions request failed due to " + status);
                }
            });

            const map = new Map(document.getElementById("map"), {
                center: { lat: 13.7734, lng: 100.5202 },
                zoom: 10,
                mapId: "4504f8b37365c3d0",
                mapTypeControl: false,
                disableDefaultUI: true,
            });

            directionsRenderer.setMap(map);

            pathway.forEach((pathway)=>{
                const marker = new AdvancedMarkerElement({
                    map,
                    position: { lat: pathway.lat, lng: pathway.lng },
                });
            })
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
