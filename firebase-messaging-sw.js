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

// استقبال النوتيفيكيشن بالخلفية
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    data: payload.data || {}
  });
});

// التعامل مع الضغط على النوتيفيكيشن
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
