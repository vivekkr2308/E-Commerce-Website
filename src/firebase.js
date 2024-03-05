// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //to add user in firebase database we have to import firebase store.
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNcUgFi3v0PsqigpJKKSaQvLxdfwAjdQQ",
  authDomain: "music-clone-f6520.firebaseapp.com",
  projectId: "music-clone-f6520",
  storageBucket: "music-clone-f6520.appspot.com",
  messagingSenderId: "855772788175",
  appId: "1:855772788175:web:9778fdd00605de7bc5ceba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);    
export const db = getFirestore(app); //this code coming from firebase to store data as we import it above here we are getting it. and we added export so that we can use it in other component.
//isko hum import kr lenge authContext wale file me