# เที่ยวหนายยย

This project for Web ProgramingII

Icon from : `https://fontawesome.com`

## โยง DB ใช้ UID ได้เลยเด้อ
```js
import { auth } from '/src/DB/Firebase-Config.js'
useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);
```
### Example DB document
``` js
const newDocumentId = await createDocument({
  uid : 3bUGF&48fg23gfr248rf,
  title: 'Test Title Name',
  StartDate: new Date('2024-04-04'),
  EndDate: new Date('2024-04-17'),
  Route: [
    { id: 1, displayName: "centralwOrld", lat: 13.7465337, lng: 100.5391488 },
    { id: 2, displayName: "PlaceNumber2", lat: 13.6435337, lng: 100.2391488 }
  ],
  Addition: 'ในแพลนนี้เราจะเที่ยวกันภายในงบ 15000 บาท เดี๋ยวจองโรงแรมไว้ที่เชียงราย',
  CreateAt: { $currentDate: { type: "date" } }
});
```
### Package install
``` c
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
npm i react-router-dom
npm i framer-motion
npm install @googlemaps/js-api-loader
npm i firebase
npm i @firebase/firestore
npm i mongodb
npm install dotenv
```
### Example of Weather API call
Free plan can forecast 5 Days
```json
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 286.12,
        "feels_like": 285.67,
        "temp_min": 284.18,
        "temp_max": 287.21,
        "pressure": 1012,
        "humidity": 84
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.6,
        "deg": 200
    },
    "clouds": {
        "all": 40
    },
    "dt": 1710701260,
    "sys": {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1710655761,
        "sunset": 1710698893
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```
===========
