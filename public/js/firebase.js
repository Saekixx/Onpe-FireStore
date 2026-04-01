// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
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

const getNacional = async (id) => {
  const q = query(
    collection(db, "participacion_departamento"),
    where("ID", "==", id),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getProv = async (departamento) => {
  const qdepartamento = query(
    collection(db, "participacion_departamento"),
    where("DPD", "==", departamento),
  );

  const q = query(
    collection(db, "participacion_provincia"),
    where("Departamento", "==", departamento),
  );

  const queryone = await getDocs(qdepartamento);
  const querySnapshot = await getDocs(q);
  const detalledepartamento = queryone.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const provincias = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    departamento: detalledepartamento,
    provincias: provincias,
  };
};

const getDistrito = async (provincia) => {
  const qprovincia = query(
    collection(db, "participacion_provincia"),
    where("DPD", "==", provincia),
  );

  const q = query(
    collection(db, "participacion_distrito"),
    where("Provincia", "==", provincia),
  );
  const queryOne = await getDocs(qprovincia);
  const querySnapshot = await getDocs(q);
  const detalleprovincia = queryOne.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const distrito = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    provincia: detalleprovincia,
    distritos: distrito,
  };
};

const getDetalleDistrito = async (distrito) => {
  const q = query(
    collection(db, "participacion_distrito"),
    where("DPD", "==", distrito),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { getNacional, getProv, getDistrito, getDetalleDistrito };
