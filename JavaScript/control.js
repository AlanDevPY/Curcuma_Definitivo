
import {
    registrarCliente
  } from "./firebase.js";


// APARTADO DE REGISTRO DE CLIENTE
let btnRegistrarCliente = document.getElementById("btnRegistrarCliente")

btnRegistrarCliente.addEventListener("click", (e) => {
    e.preventDefault()  
    let cliente = document.getElementById("inputNombreCliente").value
    let telefono = document.getElementById("inputTelefonoCliente").value
    let direccion = document.getElementById("inputDireccionCliente").value
    if(cliente === "" ||  telefono === "" || direccion === "" ){
        alert("cliente no registrado")
    }else{
        registrarCliente (cliente,telefono,direccion)
    }
})