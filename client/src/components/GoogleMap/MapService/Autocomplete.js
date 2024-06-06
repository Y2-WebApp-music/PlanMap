export function Autocomplete({map, setMarker, setPlacePin, setPlacePhoto, setDetail}){
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

        setPlacePin(passPlace)
        setPlacePhoto(photoUrl)
        setDetail(true)
    });
}