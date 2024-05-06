export function Directions({ map, filteredPathway, setDistance, setDuration }) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: '#2E6FED',strokeWeight: 6 } });

        if (filteredPathway.length < 2) {
            map.setCenter({ lat: 13.7734, lng: 100.5202 });
            return;
        } else {
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
                    setDistance(distance/1000);
                    setDuration(duration/60);
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            });
            directionsRenderer.setMap(map);
        }

    return null;
}
