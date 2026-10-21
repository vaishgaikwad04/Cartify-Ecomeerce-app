
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoST4DJjUJwKDkZ34UyF0e3MwLsko9weE",
  authDomain: "cartify-e-5555e.firebaseapp.com",
  projectId: "cartify-e-5555e",
  storageBucket: "cartify-e-5555e.firebasestorage.app",
  messagingSenderId: "45477528718",
  appId: "1:45477528718:web:4c363a7799614c5c4875df",
  measurementId: "G-6HP7E05K5H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
