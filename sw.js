import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
  authDomain: "test-58de1.firebaseapp.com",
  databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
  projectId: "test-58de1",
  storageBucket: "test-58de1.appspot.com",
  messagingSenderId: "439805881996",
  appId: "1:439805881996:web:41a120bee954577e1895a9"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
const VAPID_KEY = 'BCn-idO9957h3uKL4NDyjLZgm8Xh9_wWFAu0oQEgiDwXzZpv4oui3Iw3MTZd7T2iUZzarv_H-rRZZwlAHkVu0bo'

getToken(messaging, { vapidKey: VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    // 將token發送到您的服務器並在必要時更新 UI 
    // ...
  } else {
    // 顯示權限請求 UI
    console.log('沒有可用的註冊token。請求許可生成一個');
    // ...
  }
}).catch((err) => {
  console.log('檢索token時出錯', err);
  // ...
});

// 監聽來自 Firebase Cloud Messaging 的訊息
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



// 安裝 
self.addEventListener('install', () => {
  self.skipWaiting(); //異動過的程式能夠立即更新
  console.log('[ServiceWorker] Install');
});
// 啟動 
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  console.log('activate')
});

// 存取 
self.addEventListener('fetch', () => {
  // console.log('[ServiceWorker] fetch', event.request);
});


self.addEventListener('notificationclick', event => {
  console.log('點按了通知 notificationclick')
  console.log(event)
  const notification = event.notification;
  const action = event.action;
  const type = notification.data.type
  // type = 'link' 添加跳轉連結
  if (type === 'link' && notification.data.link) {
    clients.openWindow(notification.data.link);
  }
  // type = 'action' 選項控制
  if (type === 'action') {
    const link = notification.data.link;
    switch (action) {
      case 'yes':
        if (link) {
          clients.openWindow(link);
        }
        break;
      case 'no':
        break;
      case 'close':
        break;
      default:
        if (link) {
          clients.openWindow(link);
        }
        break;
    }
  }
  notification.close();
})

