import React, { useState, useEffect } from "react";
import '/src/global.css';
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as holdCircle} from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
    apiKey: import.meta.env.VITE_APP_MapAPI,
    version: "weekly",
    language: "th",
});

async function SearchPlace(id, setPlaceName, pathway, setPathway) {
    const [{ Map }] = await Promise.all([google.maps.importLibrary("places")]);
    const input = document.getElementById(`pathpoint-input-${id}`);
    const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ["formatted_address", "geometry", "name","place_id"],
        strictBounds: false,
    });
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            let newLat = place.geometry.location.lat();
            let newLng = place.geometry.location.lng();
            setPlaceName(place.name);
            let updatedPathway = pathway.map(item =>
                item.id === id ? { ...item, displayName: place.name, lat: newLat, lng: newLng , place_id: place.place_id} : item
            );
            setPathway(updatedPathway);
        }
    });
}

export function PathPoint({id, displayName, pathway, setPathway, setListLength, ListLength}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loader.load().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
    }, [id, setPlaceName]);

    const handleDelete = () => {
        const updatedPathway = pathway.filter(item => item.id !== id);
        setPathway(updatedPathway);
        setListLength(ListLength-1)
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

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
                onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark" onClick={handleDelete}/>
        </div>
    )
}
export function PathDestination({id, displayName, pathway, setPathway, setListLength, ListLength}){
    const [placeName, setPlaceName] = useState(`${displayName}`);

    useEffect(() => {
        loader.load().then(maps => SearchPlace(id, setPlaceName, pathway, setPathway))
    }, [id, setPlaceName]);

    const handleDelete = () => {
        const updatedPathway = pathway.filter(item => item.id !== id);
        setPathway(updatedPathway);
        setListLength(ListLength-1)
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

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
                onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faCircleXmark} size="lg" id="faCircleXmark" onClick={handleDelete}/>
        </div>
    )
}