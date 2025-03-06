import React, { useEffect, useState, useRef } from 'react';
import '/src/global.css';
import '/src/components/GoogleMap/map.css';

import { Loader } from "@googlemaps/js-api-loader"
import { Directions } from '../GoogleMap/MapService/DirectionSevice';
import { BusinessDetail } from '../GoogleMap/MapService/BusinessDetail';
import {PlaceView} from './PlaceView'
import {DetailPlace} from './DetailPlace'

function MapPlan({pathway, setDuration, setDistance}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placeInfo, setPlaceInfo] = useState([])
    const [placeInfoPhoto, setPlaceInfoPhoto] = useState([])
    const [placePin, setPlacePin] = useState([])
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    useEffect(()=>{
        setFilteredPathway(pathway.filter(point => point.lat !== null && point.lng !== null))
        return;
    },[pathway])

    const loader = new Loader({
        apiKey: import.meta.env.VITE_APP_MapAPI,
        version: "weekly",
        language: "th",
    });

    useEffect(() => {
        if (filteredPathway.length === 0) {
            return;
        }
        loader.load()
        .then(maps => {
            let map;
            async function initMap() {
                const { Map } = await google.maps.importLibrary("maps");
                const { Place } = await google.maps.importLibrary("places");

                map = new Map(document.getElementById("map"), {
                    center: { lat: 13.7734, lng: 100.5202 },
                    zoom: 10,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
                Directions({map, filteredPathway, setDistance, setDuration})
                BusinessDetail({ map, filteredPathway, setPlaceInfo, setPlaceInfoPhoto})
            }
            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway]);

    const clickMoreInfo = (Pin, Photo) => {
        setPlacePin(Pin);
        setPlacePhoto(Photo);
        setDetail(true);
    };
    const [isTranslated, setIsTranslated] = useState(false);

    const handleToggleTranslate = () => {
        setIsTranslated(!isTranslated);
    };
    const containerStyle = {
        transform: isTranslated ? 'translateY(0)' : 'translateY(28.5vh)',
        transition: 'transform 0.3s ease-in-out'
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
            {detail && (
                <>
                    <DetailPlace
                        placePin={placePin}
                        placePhoto={placePhoto}
                        setDetail={setDetail}
                    />
                    <div className='bg-Information-pop'></div>
                </>
            )}
            <div className='SeeDetailOfPlace' style={containerStyle}>
                <div className='DetailButton'>
                    <button onClick={handleToggleTranslate}>ดูสถานที่ทั้งหมด</button>
                </div>
                <div className='placeInfo-scroll'
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <div className='placeInfo-contain-all'>
                        {placeInfo.length != 0? (
                            placeInfo.map((placeL,index)=>(
                                <PlaceView
                                    key={index}
                                    place={placeL}
                                    placePhoto={placeInfoPhoto[index]}
                                    onSelectPlace={clickMoreInfo}
                                />
                            ))
                            ) : (<></>)
                        }
                    </div>
                </div>
            </div>
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

export default MapPlan;