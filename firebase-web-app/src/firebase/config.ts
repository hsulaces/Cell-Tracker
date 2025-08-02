const firebaseConfig = {
  apiKey: "AIzaSyApnxE4Kf7VA9kSVgeYPMKeJJJyXTOkUV8",
  authDomain: "cell-tracker-9e20b.firebaseapp.com",
  projectId: "cell-tracker-9e20b",
  storageBucket: "cell-tracker-9e20b.firebasestorage.app",
  messagingSenderId: "376152046733",
  appId: "1:376152046733:web:3e8e7b3946b528ac5b36c4",
  measurementId: "G-96J3J3H2SM"
};
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default firebaseConfig;

