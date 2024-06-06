import React, { useState } from 'react';
import '/src/global.css';
import './map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faStar, faStarHalf, faLocationDot, faPhone, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from "framer-motion";

export function DetailCard({placePin, placePhoto, setDetail, marker, pathway, setPathway, setListLength, ListLength}){
    const placeName = placePin?.name || "Unknown Place";
    let reviews = placePin.reviews ?? "Don't have information"
    let openTimes = placePin.opening_hours?.weekday_text ?? "Don't have information";
    let tabs = [
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
                        {Array.isArray(openTimes) ? (
                            openTimes.map((time, index) => (
                                <p key={index}>{time}</p>
                            ))
                        ) : (
                            <p>{openTimes}</p>
                        )}
                    </div>
                </div>
            </div>},
        {name : "รีวิว", content:
            <div className='Review-contain'>
                {Array.isArray(reviews) ? (
                    reviews.map((review, index)=>(
                        <Review key={index} name={review.author_name} url={review.profile_photo_url} rate={review.rating} text={review.text} time={review.relative_time_description}/>
                    ))
                ) : (
                    <p>{reviews}</p>
                )}
            </div>}
        ]
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const rating = placePin.rating || 0;
    const stars = [];
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;

    for (let i = 0; i < integerPart; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} size="sm" id="faStar"/>);
    }

    if (fractionalPart >= 0.25 && fractionalPart <= 0.75) {
    stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} size="sm" id="faStar"/>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty${i}`} icon={faStar} size="sm" id="faStar" style={{ color: 'transparent' }} />);
    }

    const handleClose = () => {
        setDetail(false);
        marker.setVisible(false);
    };

    const addPathDestination = () => {
        const newId = ListLength + 1;
        const newPoint = { id: newId, displayName: placeName, lat: placePin.geometry.location.lat(), lng: placePin.geometry.location.lng(), place_id: placePin.place_id};
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
                <span className='placeRate'>
                    {rating}
                    {stars}
                    <span>({placePin.user_ratings_total})</span>
                </span>
                <p className='placeType'>{placePin.types[0]}</p>
            </div>
            <div className='Information-Detail-contain'>
                <div className='Information-detail'>
                    <nav>
                        <ul className='detail-btn-contain'>
                        {tabs.map((item) => (
                            <li key={item.name} className={`detail-btn ${item.name === selectedTab.name ? "selected" : ""}`} onClick={() => setSelectedTab(item)} >
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
    const rating = rate;
    const stars = [];
    const integerPart = Math.floor(rating);
    const fractionalPart = rating - integerPart;

    for (let i = 0; i < integerPart; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} size="sm" id="faStar"/>);
    }

    if (fractionalPart >= 0.25 && fractionalPart <= 0.75) {
    stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} size="sm" id="faStar"/>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty${i}`} icon={faStar} size="sm" id="faStar" style={{ color: 'transparent' }} />);
    }
    return(<>
        <div className='Review'>
            <div className='Reviewer'>
                <img src={url} alt="" width={50}/>
                <div className='Reviewer-Detail'>
                    <p>{name}</p>
                    <div className='ReviewRate'>
                        <p>{stars}</p>
                        <p className='ReviewTime'> {time} </p>
                    </div>
                </div>
            </div>
            <p>{text}</p>
        </div>
    </>)
}
