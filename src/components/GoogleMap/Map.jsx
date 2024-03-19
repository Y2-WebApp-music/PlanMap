// API Key=> AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE

import React, { useContext, useState, useEffect } from "react";
import '/src/global.css';
import './map.css';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

function GoogleMap(){
    const Position = { lat: 14.00,lng:100.26}
    return(
        <div className="Map-container">
            <APIProvider apiKey={""}>
                <Map zoom={9} center={Position} mapId={"db5fd8712a8218b5"}></Map>
            </APIProvider>
        </div>
    )
}

export default GoogleMap