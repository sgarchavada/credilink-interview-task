import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage } from 'firebase/storage';

import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};  
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
const db = getFirestore(firebase)

export async function uploadImage(image) {
  const storageRef = ref(storage, `/files/${Date.now()}-${image.name}`);
  const response = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(response.ref);
  return url;
}

export async function uploadImages(images) {
  const imagePromises = Array.from(images, (image) => uploadImage(image));

  const imageRes = await Promise.all(imagePromises);
  return imageRes; // list of url like ["https://..", ...]
}

export default db;
