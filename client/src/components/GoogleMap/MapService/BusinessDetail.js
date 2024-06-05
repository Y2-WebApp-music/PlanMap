export function BusinessDetail({map, filteredPathway, setPlaceInfo, setPlaceInfoPhoto}){
    const placesService = new google.maps.places.PlacesService(map);
    let filterRe = [];
    let filterPhoto = [];

    let promises = filteredPathway.map(result => {
        return new Promise((resolve, reject) => {
            let request = {
                placeId: result.place_id,
                fields: ['name',
                        'formatted_address',
                        'geometry',
                        'rating',
                        'photos',
                        'opening_hours',
                        'reviews',
                        'formatted_phone_number',
                        'website',
                        'types',
                        'user_ratings_total',
                        'place_id'
                    ],
            };
            placesService.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place.photos) {
                    let thumbnailPlace = place.photos[0].getUrl({ maxWidth: 1000 });
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
        setPlaceInfo(filterRe);
        setPlaceInfoPhoto(filterPhoto);
    }).catch(error => {
        console.error("Error fetching place details:", error);
    });
}