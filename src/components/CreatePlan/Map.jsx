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
            const map = new Map(document.getElementById("map"), {
                center: { lat: 13.7734, lng: 100.5202 },
                zoom: 10,
                mapId: "4504f8b37365c3d0",
                mapTypeControl: false,
                disableDefaultUI: true,
            });
            // const marker = new AdvancedMarkerElement({
            //     map,
            //     position: { lat: 37.4239163, lng: -122.0947209 },
            // });
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
