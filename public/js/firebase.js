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
  apiKey: "AIzaSyA8Kkz6lu_kbAWMEIO6COM_2ul5k5zZha4",
  authDomain: "onpe-oficial.firebaseapp.com",
  projectId: "onpe-oficial",
  storageBucket: "onpe-oficial.firebasestorage.app",
  messagingSenderId: "883477516113",
  appId: "1:883477516113:web:85ffba98a058f39c8dcd70",
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

const departamento = async () => {
  const q = query(collection(db, "departamento"), orderBy("Detalle", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const provincia = async (id) => {
  const q = query(
    collection(db, "provincia"),
    where("idDepartamento", "==", id),
    orderBy("Detalle", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const distrito = async (id) => {
  const q = query(
    collection(db, "distrito"),
    where("idProvincia", "==", id),
    orderBy("Detalle", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const localVotacion = async (id) => {
  const q = query(
    collection(db, "local_votacion"),
    where("idDistrito", "==", id),
    orderBy("idLocalVotacion", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const grupo_votacion = async (id) => {
  const idLimpio = String(id).trim();
  const q = query(
    collection(db, "grupo_votacion"),
    where("idLocalVotacion", "==", idLimpio),
    orderBy("idGrupoVotacion", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const actas = async (id) => {
  const idLimpio = String(id).trim();
  const q = query(
    collection(db, "actas"),
    where("idGrupoVotacion", "==", idLimpio),
    orderBy("idGrupoVotacion", "asc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export {
  getNacional,
  getProv,
  getDistrito,
  getDetalleDistrito,
  departamento,
  provincia,
  distrito,
  localVotacion,
  grupo_votacion,
  actas,
};
