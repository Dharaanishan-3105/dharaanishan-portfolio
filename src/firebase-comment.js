import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-qEE94N1cpjy3VfBQkXpSgwCk2p_TfEw",
    authDomain: "dharaanishan-portfolio.firebaseapp.com",
    projectId: "dharaanishan-portfolio",
    storageBucket: "dharaanishan-portfolio.firebasestorage.app",
    messagingSenderId: "148106143573",
    appId: "1:148106143573:web:fb9547b4a28a02fc12b1dc",
    measurementId: "G-P8DHG8M1EM"
  };

// Initialize with a unique name to avoid conflicts
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };