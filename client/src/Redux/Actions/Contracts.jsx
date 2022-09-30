import axios from "axios";

export function setearContratoGlobal(contrato) {
  return async function (dispatch) {
    return dispatch({
      type: "SETEO_CONTRATO_GLOBAL",
      payload: contrato,
    });
  };
}

export function setearContrato(propuestaContrato) {
  return async function (dispatch) {
    // console.log(
    //   "***actions/contratos--------",
    //   propuestaContrato,
    //   "action/contratos****"
    // );

    let propuestaCont = await axios.post(`/contratos`, propuestaContrato);

    console.log("****", propuestaCont, "*****");
  };
}

export function getContratoId(idContrato) {
  return async function (dispatch) {
    const idC = (await axios.get(`/contratos/${idContrato}`)).data;
    // console.log(idC, "789415213612");
    return dispatch({
      type: "GET_ID_CONTRATO",
      payload: idC,
    });
  };
}

export function aceptarContrato(id){
  return async function(dispatch){
    try {
      console.log(id, "aca id de fun front de aceptar")
      const contratoAceptado = await axios.get(`/contratos/accept/${id}`);
      console.log(contratoAceptado)
      
    } catch (error) {
      console.error("Error en la Accion de aceptar contrato", error)
    }
  }
}
