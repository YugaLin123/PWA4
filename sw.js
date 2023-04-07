
self.addEventListener('push', event => {
  console.log('[Service Worker] 已收到 Push');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: '/img/icons/android-chrome-512x512.png',
  };
  if (event.data) {
    options = event.data.json();
    title = options.title;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('install', event => {
  self.skipWaiting(); //異動過的程式能夠立即更新
  console.log('[ServiceWorker] Install');
});
self.addEventListener('notificationclick', event => {
  console.log('點按了通知 notificationclick')
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