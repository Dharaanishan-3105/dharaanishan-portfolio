import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
// Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-qEE94N1cpjy3VfBQkXpSgwCk2p_TfEw",
  authDomain: "dharaanishan-portfolio.firebaseapp.com",
  projectId: "dharaanishan-portfolio",
  storageBucket: "dharaanishan-portfolio.firebasestorage.app",
  messagingSenderId: "148106143573",
  appId: "1:148106143573:web:fb9547b4a28a02fc12b1dc",
  measurementId: "G-P8DHG8M1EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };