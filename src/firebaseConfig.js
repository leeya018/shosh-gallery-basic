// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getUrl } from "./util";

const firebaseDevConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
const firebaseProdConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_PROD,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_PROD,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_PROD,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD,
  appId: process.env.NEXT_PUBLIC_APP_ID_PROD,
};

// const firebaseConfig =
//   process.env.NODE_ENV === "development"
//     ? firebaseDevConfig
//     : firebaseProdConfig;
const firebaseConfig = firebaseDevConfig;

// console.log({ firebaseConfig })
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
