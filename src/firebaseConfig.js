
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyB3GPluneA16ATT7NB6JQYrKqCkWvzlN3I",
  authDomain: "task-manager-app-81d2c.firebaseapp.com",
  projectId: "task-manager-app-81d2c",
  storageBucket: "task-manager-app-81d2c.appspot.com",
  messagingSenderId: "142325399380",
  appId: "1:142325399380:web:112f3a9677e88c8404d2c1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  
const auth = getAuth(app);  
export { db, auth };
