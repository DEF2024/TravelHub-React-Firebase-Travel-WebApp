
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCxKOBUksrj7B3ei48j19RFse8OxfJTJgQ",
  authDomain: "travel-project-cb9a8.firebaseapp.com",
  projectId: "travel-project-cb9a8",
  storageBucket: "travel-project-cb9a8.firebasestorage.app",
  messagingSenderId: "951130119439",
  appId: "1:951130119439:web:0ead791d869b98aa9a727a",
  measurementId: "G-ELGK0DGEPP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { app, auth, analytics };