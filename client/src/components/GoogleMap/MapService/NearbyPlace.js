export function NearbyPlace({ map, selectedFil, setNearbyPlace, setNearbyPhoto }){
    let markers = [];
    if (selectedFil != null) {
        console.log(selectedFil)
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