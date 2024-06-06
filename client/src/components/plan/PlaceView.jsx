import React from 'react';
import '/src/global.css';
import '/src/components/GoogleMap/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, faInfo } from '@fortawesome/free-solid-svg-icons'

export function PlaceView({place, placePhoto, onSelectPlace}){
    const placeName = place?.name || "Unknown Place";
    console.log('====== > PlaceView < ========',placeName)
    const rating = place.rating || 0;
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
        <div className='placeList non-selectable'>
            <div className='img-contain'>
                <img src={placePhoto} alt="" className='Information-img' onMouseDown={(e)=>e.preventDefault()}/>
            </div>
            <div className='placeList-contain'>
                <div className='contain-headInfo'>
                    <p className='InformationName'>{placeName}</p>
                    <FontAwesomeIcon icon={faInfo} onClick={()=>onSelectPlace(place, placePhoto)} size="xl" id="faInfo"/>
                </div>
                <div className='placeList-Information'>
                    <span className='placeRate'>
                        {rating}
                        {stars}
                        <p className='placeList-placeType'>{place.user_ratings_total} คน มีส่วนร่วม</p>
                    </span>
                </div>
            </div>
        </div>
    </>)
}