import { getNacional, getProv, getDistrito } from "./firebase.js";

const verNacional = (data) => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("id");

  const dataNacional = data.filter((item) => item.ID == id);

  let tittle = id == "Nacional" ? "Departamento" : "Continente";

  let html = `<tr class="titulo_tabla">
                  <td>${tittle}</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  dataNacional.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${id}&departamento=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.EH}</td>
                    <td>${item.PTA}</td>
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.TV}</td>  
                  </tr>`;
  });

  html += ``;

  document.getElementById("resultados").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML = `Ambito: ${id}`;
};

const verProv = (data) => {
  const urlparams = new URLSearchParams(window.location.search);
  const idNacional = urlparams.get("id");
  const id = urlparams.get("departamento");

  const depart = data.filter((item) => item.Departamento == id);
  const departamento = id;

  let html = `<tr class="titulo_tabla">
                  <td>PROVINCIA</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  depart.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${idNacional}&departamento=${id}&provincia=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.EH}</td>
                    <td>${item.PTA}</td>
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.TV}</td>  
                  </tr>`;
  });
  document.getElementById("resultados").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML =
    `Ambito: Provincia <br/> Departamento: ${departamento}`;
};

const verDistrito = (data) => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("provincia");
  const idNacional = urlparams.get("id");
  const idDepartamento = urlparams.get("departamento");

  const prov = data.filter((item) => item.Provincia == id);

  let html = `<tr class="titulo_tabla">
                  <td>DISTRITO</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  prov.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${idNacional}&departamento=${idDepartamento}&provincia=${id}&distrito=${item.DPD}epartamento=${idDepartamento}&provincia=${id}&distrito=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.EH}</td>
                    <td>${item.PTA}</td>
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.TV}</td>  
                  </tr>`;
  });
  document.getElementById("resultados").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML =
    `Ambito: Distrito <br/> Departamento: ${idDepartamento} <br/> Provincia ${id}`;
};

const main = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("id");
  const departamento = urlparams.get("departamento");
  const provincia = urlparams.get("provincia");
  const distrito = urlparams.get("distrito");

  const datosNacionales = await getNacional();
  const datosProvincias = await getProv();
  const datosDistritos = await getDistrito();

  if (id && departamento && provincia) {
    verDistrito(datosDistritos);
  } else if (id && departamento) {
    verProv(datosProvincias);
  } else if (id) {
    verNacional(datosNacionales);
  }
};

main();
