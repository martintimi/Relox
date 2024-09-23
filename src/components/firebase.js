import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Make sure this line is uncommented

const firebaseConfig = {
  apiKey: "AIzaSyDsrfc6IQab86HaIZ4TgdzLs02SQt7lehY",
  authDomain: "relox-697e6.firebaseapp.com",
  projectId: "relox-697e6",
  storageBucket: "relox-697e6.appspot.com",   
  messagingSenderId: "208227402650",
  appId: "1:208227402650:web:6b016cc73754c480fb3023",
  measurementId: "G-4LY0BDHH49",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // This line initializes Firestore

export default app;
