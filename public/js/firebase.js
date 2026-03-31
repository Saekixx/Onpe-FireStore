// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDdTwQiQ6EAEpfKk9-hNKUYiKmWaw4L7hM",
    authDomain: "onpe-jack.firebaseapp.com",
    projectId: "onpe-jack",
    storageBucket: "onpe-jack.firebasestorage.app",
    messagingSenderId: "1045510080750",
    appId: "1:1045510080750:web:ff2b2ed01001f1692ecbff"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const setDepNacional = async (id) => {
      const data = await fetch(`http://localhost/onpe_sweb_php/participacion/${id}`);
      const n = await data.json();

      n.data.forEach(async item => {
        item = { ID: id, ...item };
        await addDoc(collection(db,"Departamento"),item);

        const data_prov = await fetch(`http://localhost/onpe_sweb_php/participacion/${id}/${item.DPD}`)
        const p = await data_prov.json();

          p.data.forEach(async prov => {
            prov = {Departamento: item.DPD, ...prov}
            await addDoc(collection(db,"Provincia"),prov);
          })
      })
  }

  // setDepNacional("Extranjero")
  // setDepNacional("Nacional")

  const getNacional = async ()=>{
    const query = await getDocs(collection(db,"Departamento"));
    return query.docs.map(doc => ({id: doc.id, ...doc.data()}));
  }

  const getProv = async ()=>{
    const query = await getDocs(collection(db,"Provincia"));
    return query.docs.map(doc => ({id: doc.id, ...doc.data()}));
  }

  // Constantes de informacio de JSON
  const Nacional = await getNacional()
  const Provincia = await getProv()

  const verNacional = async (data) => {
    const urlparams = new URLSearchParams(window.location.search);
    const id = urlparams.get("id");

    const dataNacional = await data.filter(item => item.ID == id)
    if(!dataNacional) return;

      let ambito = `Ambito: ${id}`;

      let tittle = id == "Nacional" ? "Departamento" : "Continente";

      let html = `<tr class="titulo_tabla">
                  <td id="titulo-tabla"></td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`

      dataNacional.forEach(item => {
        html += `<tr onclick="location.href='participacion_total.html?id=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.EH}</td>
                    <td>${item.PTA}</td>
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.TV}</td>  
                  </tr>`
      })

      html += ``

      document.getElementById("resultados").innerHTML = html;
      document.getElementById("detalle-ambito").innerHTML = ambito;  
      document.getElementById("titulo-tabla").innerHTML = tittle;  
  }

  const verProv = async (data) => {

    const urlparams = new URLSearchParams(window.location.search);
    const id = urlparams.get("id");

    const depart = await data.filter(item => item.Departamento == id);

    if(!depart) return;

      let ambito = `Ambito: Provincia <br/> Departamento ${id}`
      let html = "";

      depart.forEach(item => {
        html += `<tr onclick="location.href='participacion_total.html?id=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.EH}</td>
                    <td>${item.PTA}</td>
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.TV}</td>  
                  </tr>`
      })
      
      document.getElementById("resultados-provincia").innerHTML = html;
      document.getElementById("detalle-ambito").innerHTML = ambito;
  }

  verNacional(Nacional)
  verProv(Provincia)

