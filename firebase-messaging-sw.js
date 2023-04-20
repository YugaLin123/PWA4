import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
    authDomain: "test-58de1.firebaseapp.com",
    databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
    projectId: "test-58de1",
    storageBucket: "test-58de1.appspot.com",
    messagingSenderId: "439805881996",
    appId: "1:439805881996:web:41a120bee954577e1895a9"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 前景
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
});
onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: 'images/144x144.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// getToken(messaging, {vapidKey: 'BCn-idO9957h3uKL4NDyjLZgm8Xh9_wWFAu0oQEgiDwXzZpv4oui3Iw3MTZd7T2iUZzarv_H-rRZZwlAHkVu0bo'}).then((currentToken) => {
//   console.log('getToken-firebase-Messaging-sw')
//   console.log(currentToken)
// }).catch((err) => { console.log('檢索token時出錯', err);})



// self.addEventListener("push", (event) => {
//   const payload = event.data.json();
//   const { title, body } = payload.notification;
//   const options = {
//     body,
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
