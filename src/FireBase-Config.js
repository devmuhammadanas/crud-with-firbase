import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzo99tjGTvlVWSshkDKafOy3BEifkeIVs",
  authDomain: "myapp-94bd2.firebaseapp.com",
  projectId: "myapp-94bd2",
  storageBucket: "myapp-94bd2.appspot.com",
  messagingSenderId: "123660999118",
  appId: "1:123660999118:web:791e4be1cecd9c18ca739f",
  measurementId: "G-Y7KT69JP26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore()

export default db

