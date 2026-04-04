import {
  departamento,
  provincia,
  distrito,
  localVotacion,
  grupo_votacion,
} from "./firebase.js";

const iniciarUbigeo = async () => {
  const comboAmbito = document.getElementById("cdgoAmbito");
  const comboDep = document.getElementById("cdgoDep");
  const comboProv = document.getElementById("cdgoProv");
  const comboDist = document.getElementById("cdgoDist");
  const comboLocal = document.getElementById("actas_ubigeo");
  const tablaMesas = document.getElementById("actas_mesas");

  const bloquearInferiores = (selects) => {
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
      bloquearInferiores([]);
      return;
    }

    const datosLocal = await localVotacion(idDist);
    llenarSelect(comboLocal, datosLocal, "idLocalVotacion");
  };

  const manejarLocal = async () => {
    const idLocal = comboLocal.value;

    if (!idLocal) {
      tablaMesas.innerHTML = "";
      return;
    }

    const datosGrupo = await grupo_votacion(idLocal);

    let html = "";
    if (datosGrupo && datosGrupo.length > 0) {
      html = "<tr>";
      datosGrupo.forEach((mesa, index) => {
        // Creamos la celda para cada mesa
        html += `
          <td bgcolor="#C1C1C1">
            <a href="actas_ubigeo.html?id=${mesa.idGrupoVotacion}">${mesa.idGrupoVotacion}</a>
          </td>`;

        if ((index + 1) % 10 === 0 && index !== datosGrupo.length - 1) {
          html += "</tr><tr>";
        }
      });
      html += "</tr>";
    } else {
      html =
        "<tr><td colspan='10' style='text-align:center; padding:20px;'>No se encontraron mesas para este local.</td></tr>";
    }

    // Insertamos en el tbody
    tablaMesas.innerHTML = html;
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

  manejarAmbito();
};

iniciarUbigeo();
