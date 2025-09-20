// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC63DOfaE_0QRVe2NSTXg-nsUi4Md8CH_U",
  authDomain: "auroshield-ai.firebaseapp.com",
  projectId: "auroshield-ai",
  storageBucket: "auroshield-ai.firebasestorage.app",
  messagingSenderId: "960048755933",
  appId: "1:960048755933:web:f758c10e935b9baf26d734",
  measurementId: "G-F3Y0Z14R45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);