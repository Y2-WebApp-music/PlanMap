import React, { useEffect, useState } from 'react';
import '/src/global.css';
import './map.css';
import { Loader } from "@googlemaps/js-api-loader"
import { Information, PlaceList } from './Information';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faUtensils, faGasPump, faMugHot } from '@fortawesome/free-solid-svg-icons'

function MapPlan({ pathway, setDuration, setDistance, setPathway, setListLength, ListLength }) {
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE",
            version: "weekly",
            language: "th",
        });

        loader.load().then(() => {
            const { Place } = google.maps.importLibrary("places");
            const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 40.7128, lng: -74.0060 },
                zoom: 12,
            });
            setMap(mapInstance);
            setMapLoaded(true);

            // Add event listener for dragging the map
            mapInstance.addListener('dragend', handleMapDrag);
        });

    }, []);

    const handleMapDrag = () => {
        // if (mapLoaded && map !== null) {
            const { lat, lng } = map.getCenter();
            console.log('Map center changed:', lat(), lng());
            // You can add markers dynamically here based on the map center
            // Example: addMarker(lat(), lng());
        // }
    };

    const addMarker = (lat, lng) => {
        if (mapLoaded && map !== null) {
            const marker = new window.google.maps.Marker({
                position: { lat, lng },
                map,
            });
            setMarkers(prevMarkers => [...prevMarkers, marker]);
        }
    };

    return (
        <div className="Map-container">
            {/* Add a button or UI to allow adding markers */}
            <button onClick={() => addMarker(40.7128, -74.0060)}>Add Marker</button>
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

export default MapPlan;
