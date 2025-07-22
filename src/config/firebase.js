// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcMR8zceaihgIlgZW6SEBXltmZtd8qEVc",
  authDomain: "productos-utn-97488.firebaseapp.com",
  projectId: "productos-utn-97488",
  storageBucket: "productos-utn-97488.firebasestorage.app",
  messagingSenderId: "105216509594",
  appId: "1:105216509594:web:f7eceea467e02524640123"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
const auth = getAuth(app);

export { auth };