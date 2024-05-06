import React, { useEffect, useState } from 'react';
import '/src/global.css';
import './map.css';
import { Directions } from './DirectionSevice';
import { Loader } from "@googlemaps/js-api-loader"
import {Information, PlaceList} from './Information';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faUtensils, faGasPump, faMugHot } from '@fortawesome/free-solid-svg-icons'

function MapPlan({pathway, setDuration, setDistance, setPathway, setListLength, ListLength}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placePin, setPlacePin] = useState([])
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    const [marker, setMarker] = useState(null)
    const [selectedFil, setSelectedFil] = useState(null)
    const [nearbyPlace, setNearbyPlace] = useState(null)

    const handleFilterClick = (category) => {
        setSelectedFil(category === selectedFil ? null : category);
    };

    const loader = new Loader({
        apiKey: "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE",
        version: "weekly",
        language: "th",
    });

    useEffect(()=>{
        setFilteredPathway(pathway.filter(point => point.lat !== null && point.lng !== null))
        return;
    },[pathway])

    useEffect(() => {
        const inputSe = document.getElementById("googleSearch");
            inputSe.addEventListener("click", () => {
            inputSe.select();
        });
        console.log('selectedFil =>',selectedFil)
        loader.load()
        .then(maps => {
            let map;

            async function initMap() {
                const { Map } = await google.maps.importLibrary("maps");
                const { Place } = await google.maps.importLibrary("places");
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                const position = { lat: 13.7734, lng: 100.5202 };
                const defaultCenter = { lat: 13.7734, lng: 100.5202 };

                map = new Map(document.getElementById("map"), {
                    center: defaultCenter,
                    zoom: 10,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });

                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
                const defaultBounds = {
                    north: defaultCenter.lat + 2,
                    south: defaultCenter.lat - 2,
                    east: defaultCenter.lng + 2,
                    west: defaultCenter.lng - 2,
                };

                const input = document.getElementById("googleSearch");
                const options = {
                    bounds: defaultBounds,
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
                    console.log(detail)
                    marker.setVisible(false);
                    console.log(">>>> autocomplete <<<<")
                    const place = autocomplete.getPlace();

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

                // Near by search Here
                let places;
                let markers = [];
                if (selectedFil != null) {
                    const handleMapDrag = () => {
                        let center = map.getCenter();
                        const search = {
                            location: center ,
                            radius: 10000,
                            types: [selectedFil],
                            minRating: 4,
                        };
                        console.log('search is => ',search)
                        places = new google.maps.places.PlacesService(map);
                        places.nearbySearch(search, (results, status, pagination) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                                clearMarkers()
                                for (let i = 0; i < results.length; i++) {
                                    markers[i] = new google.maps.Marker({
                                        map,
                                        anchorPoint: new google.maps.Point(0, -29),
                                        position:results[i].geometry.location,
                                    });
                                    markers[i].placeResult = results[i];
                                }
                            }
                            setNearbyPlace(results)
                            console.log("results of NearBySearch is ==> ",results)
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

                // Directions({map, filteredPathway, setDistance, setDuration})
            }

            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway, selectedFil]);

    const photoTest ='https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATplDJYECdg62FdzOqPPgRI6fkg6vvTHwjNch8tilBtMLoSOik4koYowvdwcmCRUagGZW1saPQdnPkvODdC26q9VLlOkAtPB5BBjxEirCTm4onR5vri2L7RpwLd0ZHOPWciaY79WBDMUZUT5-zXmIS7pm3tYh5F1GdiORUZcJ1B_J7qiQzQe&3u1000&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2FcreatePlan&key=AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE&token=47904'
    const placeTest = {name : 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี', rating: 4.5,user_ratings_total : 2354, types: ['shopping_mall']}

    useEffect(() => {
        console.log('useEffect Drag use')

        if (nearbyPlace != null) {
            const placeListsScroll = document.getElementById("horizon-wheel");
            let isDragging = false;
            let startPosition = 0;
            let startScrollLeft = 0;

            placeListsScroll.addEventListener("wheel", function (e) {
                if (e.deltaY > 0) {
                    placeListsScroll.scrollLeft += 100;
                    e.preventDefault();
                } else {
                    placeListsScroll.scrollLeft -= 100;
                    e.preventDefault();
                }
            });

            placeListsScroll.addEventListener("mousedown", function(event) {
                isDragging = true;
                startPosition = event.clientX;
                startScrollLeft = placeListsScroll.scrollLeft;
                document.body.style.userSelect = "none";
            });

            document.addEventListener("mousemove", function(event) {
                if (isDragging) {
                    const deltaX = event.clientX - startPosition;
                    placeListsScroll.scrollLeft = startScrollLeft - deltaX;
                }
            });

            document.addEventListener("mouseup", function() {
                isDragging = false;
            });
        } else { return;}
    }, []);

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
            {detail && (<Information placePin={placePin} placePhoto={placePhoto} setDetail={setDetail} marker={marker} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>)}
            {nearbyPlace != null && selectedFil != null ?  (
                <div className='placeList-scroll' id='horizon-wheel'>
                    <div className='placeList-contain-all'>
                        {nearbyPlace.map((item,index) =>(
                            <PlaceList key={index} placePin={item} placePhoto={photoTest} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>
                        ))}
                    </div>
                </div>
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
