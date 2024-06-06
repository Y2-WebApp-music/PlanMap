import React, { useEffect, useState, useRef } from 'react';
import { faGasPump, faHotel, faMugHot, faUtensils, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from "@googlemaps/js-api-loader";
import { DetailCard } from './DetailCard';
import { NearbyList } from './NearbyList';
import { Autocomplete } from './MapService/Autocomplete';
import { Directions } from './MapService/DirectionSevice';
import { NearbyPlace } from './MapService/NearbyPlace';
import './map.css';
import '/src/global.css';

function MapPlan({pathway, setDuration, setDistance, setPathway, setListLength, ListLength}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placePin, setPlacePin] = useState([])
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    const [marker, setMarker] = useState(null)
    const [selectedFil, setSelectedFil] = useState(null)
    const [nearbyPlace, setNearbyPlace] = useState([])
    const [nearbyPhoto, setNearbyPhoto] = useState([])

    const handleFilterClick = (category) => {
        setSelectedFil(category === selectedFil ? null : category);
    };
    useEffect(()=>{
        console.log('pathway = >',pathway)
        setFilteredPathway(pathway.filter(point => point.lat !== null && point.lng !== null))
        return;
    },[pathway])

    const loader = new Loader({
        apiKey: "AIzaSyC7UkiV3QbtcQdklInc_osWD0arPm8cQVA",
        version: "weekly",
        language: "th",
    });

    useEffect(() => {
        const inputSe = document.getElementById("googleSearch");
            inputSe.addEventListener("click", () => {
            inputSe.select();
        });
        loader.load()
        .then(maps => {
            let map;

            async function initMap( ) {
                const { Map } = await google.maps.importLibrary("maps");

                map = new Map(document.getElementById("map"), {
                    center: { lat: 13.7734, lng: 100.5202 },
                    zoom: 12,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);

                inputSe.addEventListener("click", () => {
                    Autocomplete({map, setMarker, setPlacePin, setPlacePhoto, setDetail})
                })
                Directions({map, filteredPathway, setDistance, setDuration})
                NearbyPlace({ map, selectedFil, setNearbyPlace, setNearbyPhoto })
            }
            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway, selectedFil]);

    const clickMoreInfo = (placePin, placePhoto) => {
        setPlacePin(placePin);
        setPlacePhoto(placePhoto);
        setDetail(true);
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="Map-container">
            <div className="SearchArea">
                <div className="google-searchBox">
                    <label id="google-searchLabel">
                        <input  type="text"
                                placeholder="ค้นหาใน google map"
                                id="googleSearch"/>
                    </label>
                </div>
                <div className="FilterBTN-class">
                    <GoogleFilterBTN text={" โรงแรม"} icon={faHotel} category="lodging" isSelected={selectedFil === "lodging"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" สถานีน้ำมัน"} icon={faGasPump} category="gas_station" isSelected={selectedFil === "gas_station"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านอาหาร"} icon={faUtensils} category="restaurant" isSelected={selectedFil === "restaurant"} Click={handleFilterClick} />
                    <GoogleFilterBTN text={" ร้านกาแฟ"} icon={faMugHot} category="cafe" isSelected={selectedFil === "cafe"} Click={handleFilterClick} />
                </div>
            </div>
            {detail && (
                <>
                    <DetailCard
                        placePin={placePin}
                        placePhoto={placePhoto}
                        setDetail={setDetail}
                        marker={marker}
                        pathway={pathway}
                        setPathway={setPathway}
                        setListLength={setListLength}
                        ListLength={ListLength}
                    />
                    <div className='bg-Information-pop'></div>
                </>
            )}
            {nearbyPlace.length != 0 && selectedFil != null ?  (
                <>
                    <button className='close-placeList' onClick={()=>setSelectedFil(null)}><FontAwesomeIcon icon={faXmark} size="sm" id="faXmark"/> <p>ปิดหน้าต่างนี้</p> </button>
                    <div className='placeList-scroll'
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <div className='placeList-contain-all'>
                            {nearbyPlace.map((item,index) =>(
                                <NearbyList
                                    key={index}
                                    placePin={item}
                                    placePhoto={nearbyPhoto[index]}
                                    pathway={pathway}
                                    setPathway={setPathway}
                                    setListLength={setListLength}
                                    ListLength={ListLength}
                                    onSelectPlace={clickMoreInfo}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='bg-placeList-pop'></div>
                </>
            ):
            <></>}
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

function GoogleFilterBTN({ text, category, isSelected, Click, icon }) {
    return(
        <div>
            <button className={`GoogleFilterBTN ${isSelected ? "selected" : ""}`} onClick={() => Click(category)}>
                <FontAwesomeIcon icon={icon} size="sm" id='GoogleFilter-icon'/>
                {text}
            </button>
        </div>
    );
}

export default MapPlan;
