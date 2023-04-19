// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
  authDomain: "test-58de1.firebaseapp.com",
  databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
  projectId: "test-58de1",
  storageBucket: "test-58de1.appspot.com",
  messagingSenderId: "439805881996",
  appId: "1:439805881996:web:41a120bee954577e1895a9"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});