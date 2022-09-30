
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { aceptarContrato, Contrapropuesta, rechazarContrato } from '../../Redux/Actions/Contracts';
import s from "../Contracts/DetalleContracts.module.css";

export default function DetalleContrato() {

    const {id} = useParams()
    const dispatch = useDispatch();
    const detalleC = useSelector((state)=> state.contracts.detalleContrato)
  

    //aca el handle del aceptar contrato
    const handleAceptar= () =>{
      dispatch(aceptarContrato(id))
    }
//aca el handle del rechazar contrato
    const handleRechazar = ()=>{
      dispatch(rechazarContrato(id))
    }
//aca el handle de la contrapropuesta del contrato
const handleContrapropuesta= ()=>{
  dispatch(Contrapropuesta(id))
}
    

  
    return (
    <div className={s.body}>
      <div className={s.titulito}>
      <h1>Detalle del contrato</h1>
      <div className={s.cardDetalle}>
      <div className={s.textBox}>
          <label>Id contrato: </label>
              {id} 
              <br/>
              <label> Fecha de Inicio: </label> 
              {detalleC?.date} 
              <br/>
              <label>Fecha de Finalización: </label>
              {detalleC?.expiration_date}
              <br/>
              <label>Presupuesto: $ </label>
              {detalleC?.price}
              <br/>
              <label>Descripción: </label>
              { detalleC?.description}
              <br/>
              <label>Status: </label>
              {detalleC?.status}
              <br/> 
              <label>Estado: </label>
              {detalleC?.aceptado}
              <br/>
              </div>
              </div>
              <br/>
              <br/>
              <br/>
              <div className={s.buttonUbi}>
              <button
              onClick={(e)=>handleAceptar(e)}
              className={s.buttonDetalle}
              >
                Aceptar
                </button>
               
                <button
                 className={s.buttonDetalle}
                 onClick= {(e)=> handleRechazar(e)}
              >
                Rechazar
                </button>
                  
                <button
              className={s.buttonDetalle}
              onClick ={(e)=>handleContrapropuesta}
              >
                Contrapropuesta
                </button>
                </div>
        </div>
      </div>
   
  );
}
