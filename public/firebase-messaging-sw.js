importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAB1kKzXjSLhg1XLVMhEk3bBtitRIwPuPM",
    authDomain: "drops-e38b3.firebaseapp.com",
    projectId: "drops-e38b3",
    storageBucket: "drops-e38b3.appspot.com",
    messagingSenderId: "668468630358",
    appId: "1:668468630358:web:21a3ae16fa68b19175bcf7"
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