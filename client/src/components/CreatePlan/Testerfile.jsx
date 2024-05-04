import React, { useEffect, useState } from 'react';
import '/src/global.css';
import './map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faStar, faStarHalf, faLocationDot, faPhone, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "@googlemaps/js-api-loader"
import { motion, AnimatePresence } from "framer-motion";

function MapPlan({pathway, setDuration, setDistance, setPathway, setListLength, ListLength}) {
    const [filteredPathway,setFilteredPathway] = useState([])
    const [placePin, setPlacePin] = useState(null)
    const [placePhoto, setPlacePhoto] = useState(null)
    const [detail, setDetail] = useState(false)
    const [marker, setMarker] = useState(null);

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
        loader.load()
        .then(maps => {
            let map;

            async function initMap() {
                const { Map } = await google.maps.importLibrary("maps");
                const { Place, Photo, Review } = await google.maps.importLibrary("places");

                map = new Map(document.getElementById("map"), {
                    center: { lat: 13.7734, lng: 100.5202 },
                    zoom: 10,
                    mapId: "981d73a7e46f15d2",
                    mapTypeControl: false,
                    disableDefaultUI: true,
                });
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);

                const input = document.getElementById("googleSearch");
                const autocomplete = new window.google.maps.places.Autocomplete(
                    input,
                    {
                        strictBounds: false,
                    }
                );

                autocomplete.bindTo("bounds", map);
                autocomplete.addListener("place_changed", () => {
                    console.log(">>>> autocomplete <<<<")
                    const place = autocomplete.getPlace();
                    console.log(' ========= Get place ========= ',place)
                    const photoUrl = place.photos[0].getUrl({maxWidth:1000})
                    console.log(' ========= Get photo ========= ',photoUrl)
                    setPlacePin(place)
                    setPlacePhoto(photoUrl)
                    if(setPlacePin != null){
                        setDetail(true)
                    }

                    if (!place.geometry || !place.geometry.location) {
                        window.alert(
                            "No details available for input: '" + place.name + "'"
                    );
                        return;
                    }

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }

                    const marker = new google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });
                    setMarker(marker);
                });

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: '#2E6FED',strokeWeight: 6 } });
                if (filteredPathway.length < 2) {
                    map.setCenter({ lat: 13.7734, lng: 100.5202 });
                    console.log(">>>> directionsRenderer <<<<")
                    return;
                } else{
                    const start = { lat: filteredPathway[0].lat, lng: filteredPathway[0].lng };
                    const end = { lat: filteredPathway[filteredPathway.length - 1].lat, lng: filteredPathway[filteredPathway.length - 1].lng };
                    const waypoints = [];

                    for (let i = 1; i < filteredPathway.length - 1; i++) {
                        waypoints.push({
                        location: new window.google.maps.LatLng(filteredPathway[i].lat, filteredPathway[i].lng),
                        stopover: true,
                        });
                    }
                    directionsService.route({
                        origin: new window.google.maps.LatLng(start.lat, start.lng),
                        destination: new window.google.maps.LatLng(end.lat, end.lng),
                        waypoints: waypoints,
                        optimizeWaypoints: true,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                        }, (response, status) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(response);
                            const route = response.routes[0];
                            let distance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0);
                            let duration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0);
                            setDistance(distance/1000)
                            setDuration(duration/60)

                        } else {
                        window.alert("Directions request failed due to " + status);
                        }
                    });
                    directionsRenderer.setMap(map);
                }
            }

            initMap();
        })
        .catch(error => {
            console.error("Error loading Google Maps API:", error);
        });
    }, [filteredPathway]);

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
                    <GoogleFilterBTN text={"🏬 โรงแรม"} category="hotels" />
                    <GoogleFilterBTN text={"⛽️ สถานีน้ำมัน"} category="gasStations" />
                    <GoogleFilterBTN text={"🍽️ ร้านอาหาร"} category="restaurants" />
                    <GoogleFilterBTN text={"☕️ ร้านกาแฟ"} category="coffeeShops" />
                </div>
            </div>
            {detail && (<Information placePin={placePin} placePhoto={placePhoto} setDetail={setDetail} marker={marker} pathway={pathway} setPathway={setPathway} setListLength={setListLength} ListLength={ListLength}/>)}
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

function GoogleFilterBTN({ text, category }) {
    return(
        <div>
            <input
                type="button"
                className="GoogleFilterBTN"
                value={text}
                data-category={category}
            />
        </div>
    )
}

function Information({placePin, placePhoto, setDetail, marker, pathway, setPathway, setListLength, ListLength}){
    const placeName = placePin?.name || "Unknown Place";
    const reviews = placePin.reviews
    const openTimes = placePin.opening_hours.weekday_text
    console.log('openTime', openTimes)
    const tabs = [
        {name: "ภาพรวม", content:
            <div className='AllInformation-contain'>
                <div className='AllInformation-detail'>
                    <FontAwesomeIcon icon={faLocationDot} size="lg" id="faAllInformation"/>
                    <p>{placePin.formatted_address}</p>
                </div>
                <div className='AllInformation-detail'>
                    <FontAwesomeIcon icon={faPhone} size="lg" id="faAllInformation"/>
                    <p>{placePin.formatted_phone_number}</p>
                </div>
                <div className='AllInformation-detail'>
                    <FontAwesomeIcon icon={faGlobe} size="lg" id="faAllInformation"/>
                    <a href={placePin.website} target="_blank">{placePin.website}</a>
                </div>
                <div className='AllInformation-detail'>
                    <FontAwesomeIcon icon={faClock} size="lg" id="faAllInformation" style={{ alignSelf: 'start' }}/>
                    <div>
                        {openTimes.map((time, index) => (
                            <p key={index}>{time}</p>
                        ))}
                    </div>
                </div>
            </div>},
        {name : "รีวิว", content:
            <div className='Review-contain'>
                {reviews.map((review, index)=>(
                    <Review key={index} name={review.author_name} url={review.profile_photo_url} rate={review.rating} text={review.text} time={review.relative_time_description}/>
                ))}
            </div>}
        ]
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    console.log('Information  placePin.=>',placePin)
    // console.log('Information  placePhoto.=>',placePhoto)
    // console.log('Information  review.=>',reviews)
    console.log('selectedTab : ',selectedTab)

    const handleClose = () => {
        setDetail(false);
        marker.setMap(null);
    };

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: placeName, lat: placePin.geometry.location.lat(), lng: placePin.geometry.location.lng() };
        setPathway([...pathway, newPoint]);
        setListLength(newId)
        handleClose()
    };

    return(<>
        <div className='Information'>
            <div className='img-contain'>
                <img src={placePhoto} alt="" className='Information-img'/>
            </div>
            <button className='close-Information' onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} size="lg" id="faXmark"/>
                </button>
            <div className='InformationName-contain'>
                <p className='InformationName'>{placeName}</p>
                <span>{placePin.rating}</span><span>({placePin.user_ratings_total})</span>
                <p>{placePin.types[0]}</p>
            </div>
            <div className='Information-Detail-contain'>
                <div className='Information-detail'>
                    <nav>
                        <ul className='detail-btn-contain'>
                        {tabs.map((item) => (
                            <li key={item.name} className={`detail-btn ${item === selectedTab ? "selected" : ""}`} onClick={() => setSelectedTab(item)} >
                                <p>{`${item.name}`}</p>
                            </li>
                        ))}
                        </ul>
                    </nav>
                    <main>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab ? selectedTab.name : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='motion-div-info'
                            >
                                {selectedTab ? selectedTab.content : "😋"}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
            <div className='AddPlaceInfo-contain'>
                <button className='AddPlaceInfo' onClick={addPathDestination}>
                    <FontAwesomeIcon icon={faPlus} size="lg" id="faPlus"/>
                    <p>เพิ่มสถานที่นี้</p>
                </button>
            </div>
        </div>
    </>)
}

function Review({name, url, rate, text, time}){
    return(<>
        <div className='Review'>
            <div className='Reviewer'>
                <img src={url} alt="" width={50}/>
                <div>
                    <p>{name}</p>
                    <p>{rate}</p>
                </div>
            </div>
            <p>{text}</p>
        </div>
    </>)
}

export default MapPlan;
