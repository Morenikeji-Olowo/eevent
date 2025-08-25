
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCL5Ef_PIS8UnccZs-adXdVwqTneFbfzH0",
  authDomain: "eevent-cc7e1.firebaseapp.com",
  projectId: "eevent-cc7e1",
  storageBucket: "eevent-cc7e1.firebasestorage.app",
  messagingSenderId: "342382951126",
  appId: "1:342382951126:web:85c54d93e15302a7022777",
  measurementId: "G-WX1PMGSPL9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
