importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyCgDHLHhVWXDCbIRofyGSt7pexlRPOLShc",
    authDomain: "billlig-314e9.firebaseapp.com",
    databaseURL: "https://billlig-314e9.firebaseio.com",
    projectId: "billlig-314e9",
    storageBucket: "billlig-314e9.appspot.com",
    messagingSenderId: "1013066656540",
    appId: "1:1013066656540:web:202e87dc75c1f4727be8d9",
    measurementId: "G-S29DRW5541"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});
