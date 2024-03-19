import React, { useContext, useState, useEffect, useRef } from "react";
import '/src/global.css';
import './map.css';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
// import { faMagnifyingGlass as searchICON} from '@fortawesome/free-solid-svg-icons'

const MapAPIkey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE";

const loadScript = (url, callback)=> {
    let script = document.createElement('script')
    script.type= 'text/javascript'
    script.async = true;
    script.onload = callback;
    if(script.readState){
        script.onreadystatechange = function(){
            if(script.readyState === 'loaded' || script.readyState === 'complete'){
                script.onreadystatechange = null
                callback()
            }
        }
    }else {
        script.onload = ()=> callback();
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

let autoComplete;

function GoogleMap(){

    const [mapCenter, setMapCenter] = useState({ lat: 13.7734, lng: 100.5202 });

    const [query, setQuery] = useState("")
    const autoCompleteRef = useRef()

    // Handle Search query (address, town, country , cities)
    const handleScriptLoad =(updateQuery, autoCompleteRef)=>{
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {types: ['establishment']}
        )
        autoComplete.addListener('place_changed', ()=>{
            handlePlaceSelect(updateQuery, setMapCenter);
        })
    }

    const handlePlaceSelect = async (updateQuery, setMapCenter) =>{
        const addressObject = await autoComplete.getPlace()
        const query = addressObject.formatted_address
        updateQuery(query)
        const latLng = {
            lat: addressObject?.geometry?.location?.lat(),
            lng: addressObject?.geometry?.location?.lng()
        }
        setMapCenter(latLng);
        console.log('latLng',latLng)
    }

    useEffect(()=>{
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${MapAPIkey}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        )
    }, [])

    useEffect(() => {
        console.log("Updated map center:", mapCenter);
    }, [mapCenter]);

    return(
        <div className="Map-container">
            <div className="SearchArea">
                <div className="google-searchBox">
                    <label htmlFor="google-search" id="google-searchLabel">
                        <input type="text"
                                placeholder="ค้นหาใน google map"
                                id="google-search"
                                onChange={(event) => setQuery(event.target.value)}
                                value={query}
                                ref={autoCompleteRef}/>
                        {/* <FontAwesomeIcon icon={searchICON} size="lg" style={{ color: 'var(--color-text)' }}/> */}
                    </label>
                </div>
                <div className="FilterBTN-class">
                    <GoogleFilterBTN text={"🏬 โรงแรม"}/>
                    <GoogleFilterBTN text={"⛽️ สถานีน้ำมัน"}/>
                    <GoogleFilterBTN text={"🍽️ ร้านอาหาร"}/>
                    <GoogleFilterBTN text={"☕️ ร้านกาแฟ"}/>
                </div>
            </div>
            <APIProvider apiKey={MapAPIkey}>
                <Map
                    defaultZoom={10}
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
function GoogleFilterBTN({text}) {
    return(
        <div>
            <input type="submit" value={text} id="GoogleFilterBTN" />
        </div>
    )
}

export default GoogleMap