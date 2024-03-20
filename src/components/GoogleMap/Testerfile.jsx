import React, { useEffect } from 'react';
import '/src/global.css';
import './map.css';
// AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE
const MapAPIkey = "";


function Map() {
    useEffect(() => {
        const input = document.getElementById("google-search");
            input.addEventListener("click", () => {
            input.select();
        });
        function initMap() {
            const map = new window.google.maps.Map(
                document.getElementById("map"),
                {
                center: { lat: 13.7734, lng: 100.5202 },
                zoom: 10,
                mapTypeControl: false,
                disableDefaultUI: true,
                }
            );
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

            const marker = new window.google.maps.Marker({
                map,
                anchorPoint: new window.google.maps.Point(0, -29),
            });

            autocomplete.addListener("place_changed", () => {
                marker.setVisible(false);

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

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
            });
        }

        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${MapAPIkey}&libraries=places`;
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        } else {
            initMap();
        }
    }, []);

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
