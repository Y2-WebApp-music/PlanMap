import React, { useState, useEffect } from "react";
import '/src/global.css';
import './FormInput.css'
import  loadGoogleMapsScript  from '/src/components/MapLoader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

async function SearchPlace(id, setPlaceName, pathway, setPathway) {
    const [{ Map }] = await Promise.all([google.maps.importLibrary("places")]);
    const input = document.getElementById(`pathpoint-input-${id}`);
    const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
    });
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            let newLat = place.geometry.location.lat();
            let newLng = place.geometry.location.lng();
            setPlaceName(place.name);
            let updatedPathway = pathway.map(item =>
                item.id === id ? { ...item, displayName: place.name, lat: newLat, lng: newLng } : item
            );
            setPathway(updatedPathway);
        }
    });
}

export function PathPoint({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loadGoogleMapsScript().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
    }, [id, setPlaceName]);

    return(
        <div className="Path-Point" >
            <div className="icon-Path-Point">
                <FontAwesomeIcon icon={holdCircle} size="sm" id="holdCircle"/>
                <div className="dot-connectPath">
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                    <FontAwesomeIcon icon={faCircle} size="2xs" id="faCircle"/>
                </div>
            </div>
            <input
                type="text"
                defaultValue={placeName}
                placeholder="เลือกจุดหมาย"
                name="PathPoint"
                id={`pathpoint-input-${id}`}
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}
export function PathDestination({id, displayName, pathway, setPathway}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loadGoogleMapsScript().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
    }, [id, setPlaceName]);

    return(
        <div className="Path-Destination" >
            <FontAwesomeIcon icon={faLocationDot} size="lg" id="faLocationDot"/>
            <input
                type="text"
                defaultValue={placeName}
                placeholder="เลือกจุดหมาย"
                name="PathPoint"
                id={`pathpoint-input-${id}`}
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark"/>
        </div>
    )
}