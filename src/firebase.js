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
      console.log(response)
    },
    'expired-callback': () => {
      console.log("expired")
    }
  });
}

export const signInWithPhoneNumber = async (numero) => {
  try {
    if (!window.recaptchaVerifier) return;
    const confirmationResult = await firebase.auth().signInWithPhoneNumber(numero, window.recaptchaVerifier);
    window.confirmationResult = confirmationResult;
  } catch (error) {
    console.log({ error });
  }
}

export const sendVerificationCode = async (code) => {
  try {
    return await window.confirmationResult.confirm(code);
  } catch (error) {
    console.log({ error })
  }
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      await userRef.set(additionalData);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const updateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  try {
    return await userRef.update(additionalData);
  } catch (error) {
    console.error("Error updating user document", error);
  }
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getFramment = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/sala/sagra/${uid}`).get();
    return {
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getMenuDocument = async () => {
  try {
    const userDocument = await firestore.doc(`menu`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
export const auth = firebase.auth()
export const firestore = firebase.firestore();