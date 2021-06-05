importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAtNxdQSXcO_wpGzVXXfvg2EJMH1K7gp_U",
    authDomain: "servizio-bar.firebaseapp.com",
    databaseURL: "https://servizio-bar.firebaseio.com",
    projectId: "servizio-bar",
    storageBucket: "servizio-bar.appspot.com",
    messagingSenderId: "228170779994",
    appId: "1:228170779994:web:b3bcee64497be176f9b763",
    measurementId: "G-W3GWKB9BPR"
  };
  

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './logo.png'
  };
  
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});