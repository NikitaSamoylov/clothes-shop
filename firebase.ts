// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCH3JsMXyk74jDBjWRrb47urBbEOH0vXI0',
  authDomain: 'clothes-shop-996ea.firebaseapp.com',
  projectId: 'clothes-shop-996ea',
  storageBucket: 'clothes-shop-996ea.appspot.com',
  messagingSenderId: '398547197268',
  appId: '1:398547197268:web:ab2982bf5072149d96bcc1'
  // apiKey: process.env.FIREBASE_API,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const ImgStorage = getStorage(app);