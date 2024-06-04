import React, { useEffect, useState, useRef } from 'react';
import '/src/global.css';
import './map.css';
import { Directions } from './DirectionSevice';
import { Loader } from "@googlemaps/js-api-loader"
import {Information, PlaceList} from './Information';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faHotel, faUtensils, faGasPump, faMugHot } from '@fortawesome/free-solid-svg-icons'

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
                const { Place } = await google.maps.importLibrary("places");
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

                map = new Map(document.getElementById("map"), {
                    center: { lat: 13.7734, lng: 100.5202 },
                    zoom: 12,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });

                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);

                const input = document.getElementById("googleSearch");
                const options = {
                    strictBounds: false,
                };
                const autocomplete = new google.maps.places.Autocomplete(input, options);
                autocomplete.bindTo("bounds", map);

                const marker = new google.maps.Marker({
                    map,
                    anchorPoint: new google.maps.Point(0, -29),
                });

                autocomplete.addListener("place_changed", () => {
                    setDetail(false)
                    marker.setVisible(false);
                    console.log(">>>> autocomplete <<<<")
                    const place = autocomplete.getPlace();
                    console.log('search place:',place)

                    if (!place.geometry || !place.geometry.location) {
                        window.alert("No details available for input: '" + place.name + "'");
                        return;
                    }
                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => {
                        marker.setAnimation(null);
                    }, 700);
                    setMarker(marker)

                    const photoUrl = place.photos[0].getUrl({maxWidth:1000})
                    const passPlace = place;
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }

                    console.log('passPlace ==> ',passPlace)
                    setPlacePin(passPlace)
                    setPlacePhoto(photoUrl)
                    setDetail(true)
                });

                Directions({map, filteredPathway, setDistance, setDuration})
                // Near by search Here
                let markers = [];
                if (selectedFil != null) {
                    let places;
                    const handleMapDrag = () => {
                        let center = map.getCenter();
                        const search = {
                            location: center ,
                            radius: 10000,
                            types: [selectedFil],
                            rating: 4,
                        };
                        places = new google.maps.places.PlacesService(map);
                        places.nearbySearch(search, (results, status, pagination) => {
                            let filterRe = [];
                            let filterPhoto = [];
                            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                                clearMarkers();
                                let promises = results.map(result => {
                                    return new Promise((resolve, reject) => {
                                        let request = {
                                            placeId: result.place_id,
                                            fields: ['name', 'formatted_address', 'geometry', 'rating', 'photos', 'opening_hours', 'reviews', 'formatted_phone_number', 'website','types','user_ratings_total'],
                                        };
                                        places.getDetails(request, (place, status) => {
                                            if (status === google.maps.places.PlacesServiceStatus.OK && place.photos) {
                                                let thumbnailPlace = place.photos[0].getUrl({ maxWidth: 1000 });
                                                let marker = new google.maps.Marker({
                                                    map,
                                                    anchorPoint: new google.maps.Point(0, -29),
                                                    position: place.geometry.location,
                                                });
                                                marker.placeResult = place;
                                                markers.push(marker);
                                                resolve({ place, thumbnailPlace });
                                            } else {
                                                resolve(null);
                                            }
                                        });
                                    });
                                });
                                Promise.all(promises).then(results => {
                                    results.forEach(result => {
                                        if (result) {
                                            filterRe.push(result.place);
                                            filterPhoto.push(result.thumbnailPlace);
                                        }
                                    });
                                    setNearbyPlace(filterRe);
                                    setNearbyPhoto(filterPhoto);
                                }).catch(error => {
                                    console.error("Error fetching place details:", error);
                                });
                            }
                        });
                    };
                    map.addListener('dragend', handleMapDrag);
                } else {
                    return;
                }
                function clearMarkers() {
                    for (let i = 0; i < markers.length; i++) {
                        if (markers[i]) {
                            markers[i].setMap(null);
                        }
                    }
                    markers = [];
                }
            }
            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway, selectedFil]);

    const ClosePlaceList = () => {
        setSelectedFil(null)
    };

    const clickMoreInfo = (placePin, placePhoto) => {
        setPlacePin(placePin);
        setPlacePhoto(placePhoto);
        setDetail(true);
    };

    return (
        <div className="Map-container">
            <div className="SearchArea">
                <div className="google-searchBox">
                    <label id="google-searchLabel">
                        <input type="text"
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
                    <Information placePin={placePin} placePhoto={placePhoto} setDetail={setDetail} marker={marker} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>
                    <div className='bg-Information-pop'></div>
                </>
            )}
            {nearbyPlace.length != 0 && selectedFil != null ?  (
                <>
                    <button className='close-placeList' onClick={ClosePlaceList}><FontAwesomeIcon icon={faXmark} size="sm" id="faXmark"/> <p>ปิดหน้าต่างนี้</p> </button>
                    <div className='placeList-scroll' id='horizon-wheel'>
                        <div className='placeList-contain-all'>
                            {nearbyPlace.map((item,index) =>(
                                <PlaceList key={index} placePin={item} placePhoto={nearbyPhoto[index]} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength} onSelectPlace={clickMoreInfo}/>
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
