import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAygild3Ju3r3jHL9f-KfEVAHvQFBhowxc",
  authDomain: "sagrabot.firebaseapp.com",
  projectId: "sagrabot",
  storageBucket: "sagrabot.appspot.com",
  messagingSenderId: "583569284042",
  appId: "1:583569284042:web:a39954381f226446bc8d33",
  measurementId: "G-Z6L7W1LECB"
};

firebase.initializeApp(firebaseConfig);


export const initRecaptcha = (buttonId) => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
    'size': 'invisible',
    'callback': (response) => {
      onSignInSubmit();
    }
  });
}

export const signInWithPhoneNumber = async (numero) => {
  try {
    if (!window.recaptchaVerifier) return;
    const confirmationResult = await firebase.auth().signInWithPhoneNumber(numero, window.recaptchaVerifier);
      
    console.log({ confirmationResult });
    window.confirmationResult = confirmationResult;
  } catch (error) {
    console.log({ error });
  }
}

export const sendVerificationCode = async (code) => {
  console.log('verification',code)
  try {
    const { user } = await confirmationResult.confirm(code);
    console.log(user)
  } catch (error) {
    console.log({error})
  }
}