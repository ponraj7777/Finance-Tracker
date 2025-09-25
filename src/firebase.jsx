// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbWiu-zXyhxI6iXSgT2rrgXy5GWGsfRs0",
  authDomain: "finance-tracker-25093.firebaseapp.com",
  projectId: "finance-tracker-25093",
  storageBucket: "finance-tracker-25093.firebasestorage.app",
  messagingSenderId: "1040434172292",
  appId: "1:1040434172292:web:380b5b81719da642a6cdd1",
  measurementId: "G-GQPY57JN3W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc};