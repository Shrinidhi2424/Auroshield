import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "WRONG-API-KEY-123456",
  authDomain: "wrong-project.firebaseapp.com",
  projectId: "wrong-project-id",
  storageBucket: "wrong-bucket.appspot.com",
  messagingSenderId: "999999999999",
  appId: "1:999999999999:web:wrongappid",
  measurementId: "G-WRONG1234",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth + Provider exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
