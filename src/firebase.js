import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAygild3Ju3r3jHL9f-KfEVAHvQFBhowxc",
  authDomain: "sagrabot.firebaseapp.com",
  projectId: "sagrabot",
  storageBucket: "sagrabot.appspot.com",
  messagingSenderId: "583569284042",
  databaseURL: "https://sagrabot-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:583569284042:web:a39954381f226446bc8d33",
  measurementId: "G-Z6L7W1LECB"
};

firebase.initializeApp(firebaseConfig);

export const initRecaptcha = (buttonId) => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
    'size': 'invisible',
    'callback': (response) => {

      toast.success("Messaggio inviato 💬", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
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
    toast.error(error.message)
  }
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      await userRef.set(additionalData);
    } catch (error) {
      console.error("Error creating user document", error);
      toast.error("Error creating user document")
    }
  }
  return getUserDocument(user.uid);
};

export const generatedatasala = async (additionalData) => {
  const userRef = firestore.doc(`admin/prenotazioni`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      await userRef.set(additionalData);
    } catch (error) {
      console.error("Error creating user document", error);
      toast.error("Error creating user document")
    }
  }
  return "aggunto";
};

export const generatestampa = async (additionalData) => {
  const userRef = firestore.doc(`admin/stampa`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      await userRef.set(additionalData);
    } catch (error) {
      console.error("Error creating user document", error);
      toast.error("Error creating user document")
    }
  }
  return "aggunto";
};

export const logout = () => firebase.auth().signOut();

export const sendVerificationCode = async (code, data) => {
  try {
    await window.confirmationResult.confirm(code);
    generateUserDocument(data.numero, data)
  } catch (error) {
    console.error(error.message)
  }
}


export const updateUserDocument = async (user, additionalData) => {
  if (!user) return;
  try {
    const userRef = firestore.doc(`users/${user.uid}`);
    return await userRef.update(additionalData);
  } catch (error) {
    console.error("Error updating user document", error, user, additionalData);
   
  }
};

export const updatedatasala = async (additionalData) => {
  try {
    const userRef = firestore.doc(`admin/prenotazioni`);
    const data = await userRef.update(additionalData);
    return data;
  } catch (error) {
    console.error("Error updating user document", error, additionalData);
    return null;
  }
};

export const updatestampa = async (additionalData) => {
  try {
    const userRef = firestore.doc(`admin/stampa`);
    const data = await userRef.update(additionalData);
    return data;
  } catch (error) {
    console.error("Error updating user document", error, additionalData);
    return null;
  }
};

export const getdatasala = async ()=> {
  try {
    const userDocument = await firestore.doc(`admin/prenotazioni`).get();
    return {
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
    
  }
};

export const getstampa = async ()=> {
  try {
    const userDocument = await firestore.doc(`admin/stampa`).get();
    return {
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
    
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

export const getRealtimeDocument = async () => {
  try {

    firestore.collection("users").doc("sala").onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      return {...doc.data()};

    });

  } catch (error) {
    console.error("Error fetching user", error);
    
  }
};

export const controllUser = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    if (userDocument.exists) return userDocument.data()
    else return null;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
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

export const deletePrenotazioni = async pixel => {
  try {
    const userDocument = await firestore.collection(`users/sala/sale/sagra/${pixel}/prenotazioni`).where('data', '==', "27").get();
    const batch = firestore.batch();
    console.log(batch);
    userDocument.forEach(doc => {
      batch.delete(doc.ref);
    });
    return await batch.commit();
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
export const auth = firebase.auth()
export const firestore = firebase.firestore();