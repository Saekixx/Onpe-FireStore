// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ4W-i5SNKnj5XqkKi91c32m3Tv5fQhuY",
  authDomain: "onpe-rodrigo.firebaseapp.com",
  projectId: "onpe-rodrigo",
  storageBucket: "onpe-rodrigo.firebasestorage.app",
  messagingSenderId: "603629458203",
  appId: "1:603629458203:web:b0f7686e50f169f78779be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getNacional = async () => {
  const query = await getDocs(collection(db, "participacion_departamento"));
  return query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getProv = async () => {
  const query = await getDocs(collection(db, "participacion_provincia"));
  return query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getDistrito = async () => {
  const query = await getDocs(collection(db, "participacion_distrito"));
  return query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { getNacional, getProv, getDistrito };
