// 導入 Firebase 库
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)
import { onBackgroundMessage } from 'firebase/messaging/sw'


// 初始化 Firebase App
firebase.initializeApp({
  // your app configuration
  apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
  authDomain: "test-58de1.firebaseapp.com",
  databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
  projectId: "test-58de1",
  storageBucket: "test-58de1.appspot.com",
  messagingSenderId: "439805881996",
  appId: "1:439805881996:web:41a120bee954577e1895a9"
});

// 初始化 Firebase Messaging
const messaging = firebase.messaging();

onBackgroundMessage(messaging, ({ notification }) => {
  const { title, body, image } = notification ?? {}

  if (!title) {
    return
  }

  self.registration.showNotification(title, {
    body,
    icon: image
  })
})

// Service Worker 安裝事件
self.addEventListener('install', () => {
  console.log('Service Worker 安裝成功！');
});

// Service Worker 啟動事件
self.addEventListener('activate', () => {
  console.log('Service Worker 啟動成功！');
});

// Service Worker 接收推送消息事件
self.addEventListener('push', event => {
  const payload = event.data.text();
  console.log(`接收到新消息：${payload}`);
});

// Service Worker 接收 Firebase Cloud Messaging 消息事件
self.addEventListener('message', event => {
  console.log('接收到 Firebase Cloud Messaging 消息：', event.data);

  // 註冊回調函數，當接收到新消息時觸發
  messaging.onMessage(payload => {
    console.log('接收到新的 Firebase Cloud Messaging 消息：', payload);
  });
});




