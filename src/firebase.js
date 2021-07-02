import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { button } from "./Loginphone";

const  firebaseConfig = {
    apiKey: "AIzaSyAygild3Ju3r3jHL9f-KfEVAHvQFBhowxc",
    authDomain: "sagrabot.firebaseapp.com",
    projectId: "sagrabot",
    storageBucket: "sagrabot.appspot.com",
    messagingSenderId: "583569284042",
    appId: "1:583569284042:web:a39954381f226446bc8d33",
    measurementId: "G-Z6L7W1LECB"
  }; 

  firebase.initializeApp(firebaseConfig);
  
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(button, {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });


export const numero = () => {

 
}