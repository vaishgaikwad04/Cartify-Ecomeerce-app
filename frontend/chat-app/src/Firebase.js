import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0GenAW9nNUyiAPSZW0jwW17Bs4Cb8WzA",
  authDomain: "ecommerce-app-2e3c1.firebaseapp.com",
  projectId: "ecommerce-app-2e3c1",
  storageBucket: "ecommerce-app-2e3c1.appspot.com",
  messagingSenderId: "1086122275694",
  appId: "1:1086122275694:web:da8d20c22ad61840e5077f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth (THIS is what you use in your React app)
export const auth = getAuth(app);