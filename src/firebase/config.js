import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNcfIBeeyCub26O-ArAdadv08aJE0A8aY",
  authDomain: "yoxi-f1288.firebaseapp.com",
  projectId: "yoxi-f1288",
  storageBucket: "yoxi-f1288.appspot.com", 
  messagingSenderId: "561080848347",
  appId: "1:561080848347:web:626b0b8e194a8d1b19a1fe",
  measurementId: "G-27PJQ3D12N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;