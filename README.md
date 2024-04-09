# เที่ยวหนายยย

This project for Web ProgramingII

Icon from : `https://fontawesome.com`

## โยง DB ใช้ UID ได้เลบเด้อ
```js
import { auth } from '/src/DB/Firebase-Config.js'
useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUsername(user.displayName);
                setEmail(user.email);
                setUserPhoto(user.photoURL);
            } else {
                setUsername(null);
                setEmail(null);
                setUserPhoto(null);
            }
        });
        return () => unsubscribe();
    }, []);
```
### Package install
``` c
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
npm i react-router-dom
npm install @dnd-kit/core
npm i firebase
npm i @firebase/firestore
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
