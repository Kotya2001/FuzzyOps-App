// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.,
  authDomain: "fuzzyops-e5af1.firebaseapp.com",
  projectId: "fuzzyops-e5af1",
  storageBucket: "fuzzyops-e5af1.appspot.com",
  messagingSenderId: "678296433422",
  appId: "1:678296433422:web:da27589da623a5e028dd5f",
  measurementId: "G-CBQ3TYRE7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);