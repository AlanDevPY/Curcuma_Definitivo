
import {
  // APARTADO REGISTRAR CLIENTE
    registrarCliente,clientesBD,borrarCliente,
    // APARTADO REGISTRAR MENU
    registrarMenu,menusBD,borrarMenus,
    // APARTADO REGISTRAR DELIVERY
    registrarDelivery,deliveryBD,borrarDelivery

  } from "./firebase.js";


// APARTADO DE REGISTRO DE CLIENTE
let btnRegistrarCliente = document.getElementById("btnRegistrarCliente")
let clientesRegistrados = []


btnRegistrarCliente.addEventListener("click", (e) => {
    e.preventDefault()  
    let cliente = document.getElementById("inputNombreCliente").value
    let telefono = document.getElementById("inputTelefonoCliente").value
    let direccion = document.getElementById("inputDireccionCliente").value
    let clienteEncontrado = clientesRegistrados.some(cliente => cliente.telefono === telefono);
    if(cliente === "" ||  telefono === "" || direccion === "" ){
        Toastify({
            text: "Favor completa todo los datos",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            // close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#B31312",
            }
          }).showToast();

    }else if(clienteEncontrado){
        Toastify({
            text: "Cliente ya registrado",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            // close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#B31312",
            }
          }).showToast();
    }
    else{
        registrarCliente (cliente,telefono,direccion)

        Toastify({
            text: "Cliente Registrado",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            // close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#508D69",
            }
          }).showToast();

          document.getElementById("inputNombreCliente").value = ""
          document.getElementById("inputTelefonoCliente").value = ""
          document.getElementById("inputDireccionCliente").value = ""
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    
    let tBody = document.getElementById('tBodyCliente')
  
    clientesBD((querySnapshot) => {
        let datos = ''
        let clientes = []
  
        querySnapshot.forEach((doc) => {
            let cliente = doc.data()
            clientes.push({...cliente, id: doc.id});
            clientesRegistrados.push(doc.data()) // Agregar cada tarea al arreglo 'tasks' con su ID
        });
  
        let contador = 1
        clientes.sort((a, b) => a.cliente.localeCompare(b.cliente));
        clientes.forEach((cliente) =>{
            datos +=`
            <tr>
            <td>${contador++}</td>
            <td>${cliente.cliente}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion}</td>
            <td><button data-id="${cliente.id}" class="btn btn-dark" type="button">Eliminar</button></td>
        </tr>
            `
        })
  
  
        tBody.innerHTML = datos;

        const btnDelet = tBody.querySelectorAll(".btn");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarCliente(event.target.dataset.id);
            });
        });
    })
  })

  
  // APARTADO REGISTRO DE MENUS
  let btnRegistrarMenu = document.getElementById("btnRegistrarMenu")

  btnRegistrarMenu.addEventListener("click", () => {
    let menuNombre = document.getElementById("inputMenuNombre").value
    let menuValor = document.getElementById("inputMenuValor").value
    let valor = parseFloat(menuValor)

    if(menuNombre === "" || valor === ""){
      Toastify({
        text: "Favor completar los datos",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#B31312",
        }
      }).showToast();
    }else {
      Toastify({
        text: "Menu registrado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#508D69",
        }
      }).showToast();
      registrarMenu(menuNombre,valor)
      document.getElementById("inputMenuNombre").value = ""
      document.getElementById("inputMenuValor").value = ""
    }
  })

  window.addEventListener('DOMContentLoaded', async () => {
    
    let tBody = document.getElementById('tBodyMenu')
  
    menusBD((querySnapshot) => {
        let datos = ''
        let menus = []
  
        querySnapshot.forEach((doc) => {
            let menu = doc.data()
            menus.push({...menu, id: doc.id});
        });
  
        let contador = 1
        // menus.sort((a, b) => a.cliente.localeCompare(b.cliente));
        menus.forEach((menu) =>{
            datos +=`
            <tr>
            <td>${contador++}</td>
            <td>${menu.menu}</td>
            <td>${menu.valor.toLocaleString('es-ES')}</td>
            <td><button data-id="${menu.id}" class="btn btn-dark" type="button">Eliminar</button></td>
        </tr>
            `
        })
  
  
        tBody.innerHTML = datos;

        const btnDelet = tBody.querySelectorAll(".btn");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarMenus(event.target.dataset.id);
            });
        });
    })
  })

  // APARTADO REGISTRAR DELIVEY

  let btnRegistrarDelivery = document.getElementById("btnRegistrarDelivery")


  btnRegistrarDelivery.addEventListener("click", () => {
    let delivery = document.getElementById("inputNombreDelivery").value

    if(delivery === ""){
      Toastify({
        text: "Favor completar los datos",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#B31312",
        }
      }).showToast();
    }else{
      Toastify({
        text: "Delivery Registrado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#508D69",
        }
      }).showToast();
      registrarDelivery(delivery)
      document.getElementById("inputNombreDelivery").value = ""
    }  
  })

  window.addEventListener('DOMContentLoaded', async () => {
    
    let tBody = document.getElementById('tBodyDelivery')
  
    deliveryBD((querySnapshot) => {
        let datos = ''
        let deliverys = []
  
        querySnapshot.forEach((doc) => {
            let delivery = doc.data()
            deliverys.push({...delivery, id: doc.id});
        });
  
        let contador = 1
        // menus.sort((a, b) => a.cliente.localeCompare(b.cliente));
        deliverys.forEach((delivery) =>{
            datos +=`
            <tr>
            <td>${contador++}</td>
            <td>${delivery.delivery}</td>
            <td><button data-id="${delivery.id}" class="btn btn-dark" type="button">Eliminar</button></td>
        </tr>
            `
        })
  
  
        tBody.innerHTML = datos;

        const btnDelet = tBody.querySelectorAll(".btn");

        // Agregar un evento de clic a cada botón de borrado
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // Llamar a la función deletTask con el ID de la tarea asociado al botón
                borrarDelivery(event.target.dataset.id);
            });
        });
    })
  })




