// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7UkiV3QbtcQdklInc_osWD0arPm8cQVA",
    authDomain: "travelmapplan.firebaseapp.com",
    projectId: "travelmapplan",
    storageBucket: "travelmapplan.appspot.com",
    messagingSenderId: "860353567771",
    appId: "1:860353567771:web:7593129cd769c834086cbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Create a root reference
export const storage = getStorage();