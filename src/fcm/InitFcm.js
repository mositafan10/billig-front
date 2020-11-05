import firebase from "firebase";
import Axios from "axios";
import { config } from "../Constant";

var url = config.url.API_URL;

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyCgDHLHhVWXDCbIRofyGSt7pexlRPOLShc",
    authDomain: "billlig-314e9.firebaseapp.com",
    databaseURL: "https://billlig-314e9.firebaseio.com",
    projectId: "billlig-314e9",
    storageBucket: "billlig-314e9.appspot.com",
    messagingSenderId: "1013066656540",
    appId: "1:1013066656540:web:202e87dc75c1f4727be8d9",
    measurementId: "G-S29DRW5541",
  });

  navigator.serviceWorker.register("/firebase-messaging-sw.js").then((registration) => {
    firebase.messaging().useServiceWorker(registration);
  });
};

export const askForPermissioToReceiveNotifications = async () => {
  const token1 = localStorage.getItem("token");
  try {
    if (token1 != null) {
      const messaging = firebase.messaging();
      // await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log("token do usuário:", token);
      Axios.post(`${url}api/v1/chat/notifications/`, {
        token: token,
      }, 
      { headers: { Authorization: `Token ${token1}` }})
        .then(() => console.log("token is sent"))
        .catch((err) => console.log("token did not send"));
      return token;
    }
  } catch (error) {
    console.error(error);
  }
};
