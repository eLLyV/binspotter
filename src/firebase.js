// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKBZT1Itu0LDSBmOw399HCbq0ln4caqig",
    authDomain: "binspotter-debed.firebaseapp.com",
    projectId: "binspotter-debed",
    storageBucket: "binspotter-debed.appspot.com",
    messagingSenderId: "826727724911",
    appId: "1:826727724911:web:d0c36ce3e777201c5fda9a",
    measurementId: "G-Y2PTEN8E9Q"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);