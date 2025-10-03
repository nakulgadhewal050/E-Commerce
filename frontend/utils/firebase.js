// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-4344e.firebaseapp.com",
  projectId: "loginonecart-4344e",
  storageBucket: "loginonecart-4344e.firebasestorage.app",
  messagingSenderId: "402124827315",
  appId: "1:402124827315:web:2a736619cd61012545dec6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };