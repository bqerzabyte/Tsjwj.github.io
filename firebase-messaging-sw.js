importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC2wTp0Afn_XmWCKhk1Bx3o13imBc1zIUc",
  authDomain: "bqerzala-ae4d8.firebaseapp.com",
  projectId: "bqerzala-ae4d8",
  storageBucket: "bqerzala-ae4d8.appspot.com",
  messagingSenderId: "912894745948",
  appId: "1:912894745948:web:773493f7afdd4866d03599",
  measurementId: "G-1NMXR2DFYN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NOTIFICATION_RECEIVED',
        count: 1
      });
    });
  });

  if (Notification.permission === 'granted') {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || 'icon.png',
      badge: 'icon.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type: 'window'}).then(windowClients => {
      if (windowClients.length > 0) {
        return windowClients[0].focus();
      }
      return self.clients.openWindow('/');
    })
  );
});
