import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXQQd39cjICwp3w9P5bz2dJjVqweBx83k",
  authDomain: "company-a3767.firebaseapp.com",
  projectId: "company-a3767",
  storageBucket: "company-a3767.firebasestorage.app",
  messagingSenderId: "201422918292",
  appId: "1:201422918292:web:cd90d6f2b4fb352db71a81",
  measurementId: "G-0XHZJ1WK1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch {
  analytics = null;
}

// Firestore database instance
const db = getFirestore(app);


export { app, analytics, db };
