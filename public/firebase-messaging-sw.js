importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCgDHLHhVWXDCbIRofyGSt7pexlRPOLShc",
    authDomain: "billlig-314e9.firebaseapp.com",
    databaseURL: "https://billlig-314e9.firebaseio.com",
    projectId: "billlig-314e9",
    storageBucket: "billlig-314e9.appspot.com",
    messagingSenderId: "1013066656540",
    appId: "1:1013066656540:web:202e87dc75c1f4727be8d9",
    measurementId: "G-S29DRW5541"
});

const messaging = firebase.messaging();