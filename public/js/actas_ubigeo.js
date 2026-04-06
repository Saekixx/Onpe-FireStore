import {
  departamento,
  provincia,
  distrito,
  localVotacion,
  grupo_votacion,
  actas,
} from "./firebase.js";

const iniciarUbigeo = async () => {
  const comboAmbito = document.getElementById("cdgoAmbito");
  const comboDep = document.getElementById("cdgoDep");
  const comboProv = document.getElementById("cdgoProv");
  const comboDist = document.getElementById("cdgoDist");
  const comboLocal = document.getElementById("actas_ubigeo");
  const tablaMesas = document.getElementById("actas_mesas");
  const DetalleMesas = document.getElementById("detalle-mesas");
  const divDetalleActa = document.getElementById("detalle-acta");
  const DetalleInfoActa = document.getElementById("Detalle-Info-Acta");

  window.regresarAListado = () => {
    divDetalleActa.innerHTML = "";
    DetalleMesas.style.display = "block";
    DetalleInfoActa.style.display = "block";
  };

  const bloquearInferiores = (selects) => {
    DetalleMesas.style.display = "none";
    DetalleInfoActa.style.display = "none";
    divDetalleActa.innerHTML = "";
    selects.forEach((select) => {
      select.innerHTML = `<option value="">--SELECCIONE--</option>`;
      select.disabled = true;
    });
  };

  const llenarSelect = (select, datos, campoid) => {
    let html = `<option value="">--SELECCIONE--</option>`;
    datos.forEach((item) => {
      const val = item[campoid];
      const detalle = item.Detalle || item.RazonSocial;
      html += `<option value="${val}">${detalle}</option>`;
    });
    select.innerHTML = html;
    select.disabled = datos.length === 0;
  };

  const manejarAmbito = async () => {
    const valorAmbito = comboAmbito.value;
    if (!valorAmbito) {
      bloquearInferiores([comboDep, comboProv, comboDist, comboLocal]);
      return;
    }
    const todosLosDeps = await departamento();
    const filtrados =
      valorAmbito === "P"
        ? todosLosDeps.filter((item) => Number(item.idDepartamento) <= 25)
        : todosLosDeps.filter((item) => Number(item.idDepartamento) > 25);

    llenarSelect(comboDep, filtrados, "idDepartamento");
    bloquearInferiores([comboProv, comboDist, comboLocal]);
  };

  const manejarDepartamento = async () => {
    const idDep = comboDep.value;
    if (!idDep) {
      bloquearInferiores([comboProv, comboDist, comboLocal]);
      return;
    }
    const datosProvs = await provincia(idDep);
    llenarSelect(comboProv, datosProvs, "idProvincia");
    bloquearInferiores([comboDist, comboLocal]);
  };

  const manejarProvincia = async () => {
    const idProv = comboProv.value;
    if (!idProv) {
      bloquearInferiores([comboDist, comboLocal]);
      return;
    }
    const datosDists = await distrito(idProv);
    llenarSelect(comboDist, datosDists, "idDistrito");
    bloquearInferiores([comboLocal]);
  };

  const manejarDistrito = async () => {
    const idDist = comboDist.value;
    if (!idDist) {
      bloquearInferiores([comboLocal]);
      return;
    }
    const datosLocal = await localVotacion(idDist);
    llenarSelect(comboLocal, datosLocal, "idLocalVotacion");
    DetalleMesas.style.display = "none";
    DetalleInfoActa.style.display = "none";
  };

  const manejarLocal = async () => {
    const idLocal = comboLocal.value;
    if (!idLocal) {
      DetalleMesas.style.display = "none";
      DetalleInfoActa.style.display = "none";
      return;
    }

    const datosGrupo = await grupo_votacion(idLocal);
    DetalleMesas.style.display = "block";
    DetalleInfoActa.style.display = "block";
    divDetalleActa.innerHTML = "";

    document.getElementById("count-mesas").innerHTML =
      `Total de Mesas: ${datosGrupo.length}`;

    let html = "";
    if (datosGrupo && datosGrupo.length > 0) {
      html = "<tr>";
      datosGrupo.forEach((mesa, index) => {
        html += `
          <td bgcolor="#C1C1C1">
            <a href="javascript:void(0)" onclick="mostrarActas('${mesa.idGrupoVotacion}')">
              ${mesa.idGrupoVotacion}
            </a>
          </td>`;
        if ((index + 1) % 10 === 0 && index !== datosGrupo.length - 1) {
          html += "</tr><tr>";
        }
      });
      html += "</tr>";
    } else {
      html =
        "<tr><td colspan='10' style='text-align:center; padding:20px;'>No se encontraron mesas.</td></tr>";
    }
    tablaMesas.innerHTML = html;
  };

  window.mostrarActas = async (id) => {
    DetalleMesas.style.display = "none";
    DetalleInfoActa.style.display = "none";
    const datosActas = await actas(id);
    const Acta = datosActas[0];

    const btnRegresar = `
    <div style="margin-top: 30px;">
      <div style="text-align: right; margin-bottom: 20px;">
        <button type="button" class="btn btn-primary" onclick="regresarAListado()">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            REGRESAR
        </button>
        <p>&nbsp;</p>
      </div>
    </div>`;

    if (Acta) {
      divDetalleActa.innerHTML =
        btnRegresar +
        `
        <p>&nbsp;</p>
        <div class="row">
          <div class="tab-info">
            <div class="tab-content">
              <div id="detMesa">
                <div role="tabpanel" class="tab-pane active" id="presidencial">
                  <div class="tab-info-desc">
                    <div class="row">
                      <div class="col-xs-3 col-md-4">
                        <div class="mesap01">
                          <img src="images/mp-sin.jpg" class="img-responsive">
                          Si requiere la imagen del acta, solicítela a través del procedimiento de acceso a la información pública.
                        </div>
                      </div>
                      <div class="col-xs-9 col-md-8">
                        <div class="row">
                          <div class="col-xs-12">
                            <p class="subtitle1">ACTA ELECTORAL</p>
                            <div id="page-wrap">
                              <table class="table13" cellspacing="0">
                                <thead>
                                  <tr><th>Mesa N°</th><th>N° Copia</th></tr>
                                </thead>
                                <tbody>
                                  <tr><td>${Acta.idGrupoVotacion}</td><td>${Acta.nCopia}</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="col-xs-12">
                            <p class="subtitle1">INFORMACIÓN UBIGEO</p>
                            <div id="page-wrap">
                              <table class="table14" cellspacing="0">
                                <tbody>
                                  <tr class="titulo_tabla">
                                    <td>Departamento</td><td>Provincia</td><td>Distrito</td><td>Local de votación</td><td>Dirección</td>
                                  </tr>
                                  <tr>
                                    <td>${Acta.Departamento}</td><td>${Acta.Provincia}</td><td>${Acta.Distrito}</td><td>${Acta.RazonSocial}</td><td>${Acta.Direccion}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="col-xs-12">
                            <p class="subtitle1">INFORMACIÓN MESA</p>
                            <div id="page-wrap">
                              <table class="table15" cellspacing="0">
                                <tbody>
                                  <tr class="titulo_tabla">
                                    <td>Electores hábiles</td><td>Total votantes</td><td>Estado del acta</td>
                                  </tr>
                                  <tr>
                                    <td>${Acta.ElectoresHabiles}</td><td>${Acta.TotalVotantes}</td><td>ACTA ELECTORAL NORMAL</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 pbot30_acta">
                        <p class="subtitle1">LISTA DE RESOLUCIONES</p>
                        <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No hay resoluciones para el acta seleccionada
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12">
                        <p class="subtitle1">INFORMACIÓN DEL ACTA ELECTORAL</p>
                        <div id="page-wrap" class="cont-tabla1">
                          <table class="table06">
                            <tbody>
                              <tr class="titulo_tabla">
                                <td colspan="2">Organización política</td><td>Total de Votos</td>
                              </tr>
                              <tr>
                                <td>PERUANOS POR EL KAMBIO</td>
                                <td><img width="40px" height="40px" src="images/simbolo_pkk.jpg"></td>
                                <td>${Acta.P1}</td>
                              </tr>
                              <tr>
                                <td>FUERZA POPULAR</td>
                                <td><img width="40px" height="40px" src="images/simbolo_keyko.jpg"></td>
                                <td>${Acta.P2}</td>
                              </tr>
                              <tr><td colspan="2">VOTOS EN BLANCO</td><td>${Acta.VotosBlancos}</td></tr>
                              <tr><td colspan="2">VOTOS NULOS</td><td>${Acta.VotosNulos}</td></tr>
                              <tr><td colspan="2">VOTOS IMPUGNADOS</td><td>${Acta.VotosImpugnados}</td></tr>
                              <tr><td colspan="2">TOTAL DE VOTOS EMITIDOS</td><td>${Acta.TotalVotantes}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      divDetalleActa.innerHTML = `
        <div style="margin-top: 30px;">
          <div style="text-align: right; margin-bottom: 20px;">
            ${btnRegresar}
          </div>
          <div style="text-align: center;">
            No se encontró el Acta.
          </div>
        </div>`;
    }
  };

  comboAmbito.addEventListener("change", manejarAmbito);
  comboDep.addEventListener("change", manejarDepartamento);
  comboProv.addEventListener("change", manejarProvincia);
  comboDist.addEventListener("change", manejarDistrito);
  comboLocal.addEventListener("change", manejarLocal);

  comboDep.disabled = true;
  comboProv.disabled = true;
  comboDist.disabled = true;
  comboLocal.disabled = true;
  DetalleMesas.style.display = "none";
  DetalleInfoActa.style.display = "none";

  manejarAmbito();
};

iniciarUbigeo();
