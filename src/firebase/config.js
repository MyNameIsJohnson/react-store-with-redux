import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBJqK694CCtUJeNu4X3hbfniESQyOK-QsY",
  authDomain: "react-redux-store-project.firebaseapp.com",
  databaseURL: "https://react-redux-store-project-default-rtdb.firebaseio.com",
  projectId: "react-redux-store-project",
  storageBucket: "react-redux-store-project.appspot.com",
  messagingSenderId: "789383103229",
  appId: "1:789383103229:web:d48a3fb3107e54470b7494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
