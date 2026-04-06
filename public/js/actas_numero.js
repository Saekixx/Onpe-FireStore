import { actas } from "./firebase.js";

const IniciarNumero = async () => {
  const detalleActa = document.getElementById("detalle-acta");
  window.actas_bscarPrNmroMesa = async (form) => {
    const nroMesa = form.nroMesa.value;
    const idLimpio = nroMesa.trim();

    const datosActa = await actas(idLimpio);
    const Acta = datosActa[0];

    if (Acta) {
      detalleActa.innerHTML = `
<div class="row">
    <div class="col-xs-12">
        <div class="row">
            <div class="col-md-4 col-xs-12">
                <div class="mesap01">
                    <img src="images/mp-sin.jpg" class="img-responsive" style="margin-bottom: 10px;">
                    <p style="font-size: 11px; line-height: 1.2; color: #666;">
                        Si requiere la imagen del acta, solicítela a través del procedimiento de acceso a la información pública.
                    </p>
                </div>
            </div>

            <div class="col-md-8 col-xs-12">
                <div class="row">
                    <div class="col-xs-12">
                        <p class="subtitle1">ACTA ELECTORAL</p>
                        <div id="page-wrap">
                            <table class="table13" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Mesa N°</th>
                                        <th>N° Copia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${Acta.idGrupoVotacion}</td>
                                        <td>${Acta.nCopia || "---"}</td>
                                    </tr>
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
                                        <td>Departamento</td>
                                        <td>Provincia</td>
                                        <td>Distrito</td>
                                    </tr>
                                    <tr>
                                        <td>${Acta.Departamento}</td>
                                        <td>${Acta.Provincia}</td>
                                        <td>${Acta.Distrito}</td>
                                    </tr>
                                    <tr class="titulo_tabla">
                                        <td colspan="2">Local de votación</td>
                                        <td>Dirección</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">${Acta.RazonSocial}</td>
                                        <td>${Acta.Direccion}</td>
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
                                        <td>Electores hábiles</td>
                                        <td>Total votantes</td>
                                        <td>Estado del acta</td>
                                    </tr>
                                    <tr>
                                        <td>${Acta.ElectoresHabiles}</td>
                                        <td>${Acta.TotalVotantes}</td>
                                        <td>ACTA ELECTORAL NORMAL</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> </div> <div class="row">
            <div class="col-xs-12 pbot30_acta">
                <p class="subtitle1">LISTA DE RESOLUCIONES</p>
                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                No hay resoluciones para el acta seleccionada
            </div>

            <div class="col-xs-12">
                <p class="subtitle1">INFORMACIÓN DEL ACTA ELECTORAL</p>
                <div id="page-wrap" class="cont-tabla1">
                    <table class="table06">
                        <tbody>
                            <tr class="titulo_tabla">
                                <td colspan="2">Organización política</td>
                                <td>Total de Votos</td>
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
                            <tr>
                                <td colspan="2">VOTOS EN BLANCO</td>
                                <td>${Acta.VotosBlancos}</td>
                            </tr>
                            <tr>
                                <td colspan="2">VOTOS NULOS</td>
                                <td>${Acta.VotosNulos}</td>
                            </tr>
                            <tr>
                                <td colspan="2">VOTOS IMPUGNADOS</td>
                                <td>${Acta.VotosImpugnados}</td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>TOTAL DE VOTOS EMITIDOS</strong></td>
                                <td><strong>${Acta.TotalVotantes}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
`;
    } else {
      detalleActa.innerHTML = `<p>&nbsp;</p>
                    <div class="row">
                      <div class="tab-info">
                        EL NÚMERO DE MESA QUE HA INGRESADO NO EXISTE
                      </div>
                    </div>`;
    }
  };
};

IniciarNumero();
