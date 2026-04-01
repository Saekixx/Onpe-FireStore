import {
  getNacional,
  getProv,
  getDistrito,
  getDetalleDistrito,
} from "./firebase.js";

const verNacional = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("id");

  const data = await getNacional(id);

  let tittle = id == "Nacional" ? "Departamento" : "Continente";

  let html = `<tr class="titulo_tabla">
                  <td>${tittle}</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  data.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${id}&departamento=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.TV}</td> 
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.PTA}</td>
                    <td>${item.EH}</td>  
                  </tr>`;
  });

  html += `<tr>
              <td>TOTALES</td>
              <td>17,953,367</td>
              <td>81.543%</td>
              <td>4,063,663</td>
              <td>18.457%</td>
              <td>22,017,030</td>
          </tr>`;

  let cabezera = `<tr>
                    <td>TOTAL: 17,953,367</td>
                    <td>TOTAL: 4,063,663</td>
                  </tr>
                  <tr>
                    <td>% TOTAL: 81.543%</td>
                    <td>% TOTAL: 18.457%</td>
                  </tr>`;

  document.getElementById("resultados-totales").innerHTML = cabezera;
  document.getElementById("resultados").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML = `Ambito: ${id}`;
};

const verProv = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const idNacional = urlparams.get("id");
  const id = urlparams.get("departamento");

  const data = await getProv(id);
  const departamento = id;

  let html = `<tr class="titulo_tabla">
                  <td>PROVINCIA</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  data.provincias.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${idNacional}&departamento=${id}&provincia=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.TV}</td> 
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.PTA}</td>
                    <td>${item.EH}</td>  
                  </tr>`;
  });

  html += `<tr>
              <td>TOTALES</td>
              <td>${data.departamento[0].TV}</td>
              <td>${data.departamento[0].PTV}</td>
              <td>${data.departamento[0].TA}</td>
              <td>${data.departamento[0].PTA}</td>
              <td>${data.departamento[0].EH}</td>
          </tr>`;

  let cabezera = `<tr>
                <td>TOTAL: ${data.departamento[0].TV}</td>
                <td>TOTAL: ${data.departamento[0].TA}</td>
              </tr>
              <tr>
                <td>% TOTAL: ${data.departamento[0].PTV}</td>
                <td>% TOTAL: ${data.departamento[0].PTA}</td>
              </tr>`;

  document.getElementById("resultados").innerHTML = html;
  document.getElementById("resultados-totales").innerHTML = cabezera;
  document.getElementById("detalle-ambito").innerHTML =
    `Ambito: ${idNacional} <br/> Departamento: ${departamento}`;
  document.getElementById("ambito").innerHTML =
    `ELECTORES HÁBILES ${data.departamento[0].EH}`;
};

const verDistrito = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("provincia");
  const idNacional = urlparams.get("id");
  const idDepartamento = urlparams.get("departamento");

  const data = await getDistrito(id);

  console.log(data);

  let html = `<tr class="titulo_tabla">
                  <td>DISTRITO</td>
                  <td>TOTAL ASISTENTES</td>
                  <td>% TOTAL ASISTENTES</td>
                  <td>TOTAL AUSENTES</td>
                  <td>% TOTAL AUSENTES</td>
                  <td>ELECTORES HÁBILES</td>
                </tr>`;

  data.distritos.forEach((item) => {
    html += `<tr onclick="location.href='participacion_total.html?id=${idNacional}&departamento=${idDepartamento}&provincia=${id}&distrito=${item.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${item.DPD}</td>
                    <td>${item.TV}</td> 
                    <td>${item.PTV}</td>
                    <td>${item.TA}</td>
                    <td>${item.PTA}</td>
                    <td>${item.EH}</td>  
                  </tr>`;
  });

  html += `<tr>
              <td>TOTALES</td>
              <td>${data.provincia[0].TV}</td>
              <td>${data.provincia[0].PTV}</td>
              <td>${data.provincia[0].TA}</td>
              <td>${data.provincia[0].PTA}</td>
              <td>${data.provincia[0].EH}</td>
          </tr>`;

  let cabezera = `<tr>
                <td>TOTAL: ${data.provincia[0].TV}</td>
                <td>TOTAL: ${data.provincia[0].TA}</td>
              </tr>
              <tr>
                <td>% TOTAL: ${data.provincia[0].PTV}</td>
                <td>% TOTAL: ${data.provincia[0].PTA}</td>
              </tr>`;

  document.getElementById("resultados").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML =
    `Ambito: ${idNacional} <br/> Departamento: ${idDepartamento} <br/> Provincia: ${id}`;
  document.getElementById("resultados-totales").innerHTML = cabezera;
  document.getElementById("ambito").innerHTML =
    `ELECTORES HÁBILES ${data.provincia[0].EH}`;
};

const verDetalleDistrito = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("distrito");
  const idDepartamento = urlparams.get("departamento");
  const idProvincia = urlparams.get("provincia");
  const idNacional = urlparams.get("id");

  const data = await getDetalleDistrito(id);

  let html = `<tr>
                <td>TOTAL: ${data[0].TV}</td>
                <td>TOTAL: ${data[0].TA}</td>
              </tr>
              <tr>
                <td>% TOTAL: ${data[0].PTV}</td>
                <td>% TOTAL: ${data[0].PTA}</td>
              </tr>`;

  document.getElementById("tabla-detalle").innerHTML = "";
  document.getElementById("resultados-totales").innerHTML = html;
  document.getElementById("detalle-ambito").innerHTML =
    `Ambito: ${idNacional} <br/> Departamento: ${idDepartamento} <br/> Provincia ${idProvincia} <br/> Distrito: ${id}`;
  document.getElementById("ambito").innerHTML =
    `ELECTORES HÁBILES ${data[0].EH}`;
};

const main = async () => {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get("id");
  const departamento = urlparams.get("departamento");
  const provincia = urlparams.get("provincia");
  const distrito = urlparams.get("distrito");

  if (id && departamento && provincia && distrito) {
    verDetalleDistrito();
  } else if (id && departamento && provincia) {
    verDistrito();
  } else if (id && departamento) {
    verProv();
  } else if (id) {
    verNacional();
  }
};

main();
