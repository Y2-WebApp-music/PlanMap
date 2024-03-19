// API Key=> AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE
// https://visgl.github.io/react-google-maps/docs/get-started

import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './map.css';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const MapAPIkey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE";

function GoogleMap(){
    const Position = { lat: 14.00,lng:100.26}
    const [mapCenter, setMapCenter] = useState({ lat: 14.0, lng: 100.26 });


    return(
        <div className="Map-container">
            <APIProvider apiKey={MapAPIkey}>
                <Map
                    defaultZoom={11}
                    defaultCenter={mapCenter}
                    mapId={"db5fd8712a8218b5"}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >

                </Map>
            </APIProvider>
        </div>
    )
}

export default GoogleMap