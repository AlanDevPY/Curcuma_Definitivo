import {
    // APARTADO CLIENTE
      clientesBD,
      // APARTADO REGISTRAR MENU
      menusBD,
      // APARTADO REGISTRAR DELIVERY
      deliveryBD,
    // APARTADO REGISTRAR PEDIDO
    registrarPedido,pedidosDB,borrarPedido
  
    } from "./firebase.js";

// APARTADO CLIENTE-----------------------------------------------------------------
    window.addEventListener('DOMContentLoaded', async () => {
    
        let tBody = document.getElementById('optionCliente')
      
        clientesBD((querySnapshot) => {
            let datos = ''
            let clientes = []
      
            querySnapshot.forEach((doc) => {
                let cliente = doc.data()
                clientes.push({...cliente, id: doc.id});
            });
      
            let contador = 1
            clientes.sort((a, b) => a.cliente.localeCompare(b.cliente));
            clientes.forEach((cliente) =>{
                datos +=`
                <option value="${cliente.cliente}">${cliente.cliente}</option>
                `
            })
            tBody.innerHTML = datos;
        })
      })

    //   APARTADO MENUS--------------------------------------------------------------------
    window.addEventListener('DOMContentLoaded', async () => {
    
        let tBody = document.getElementById('optionMenus')
      
        menusBD((querySnapshot) => {
            let datos = ''
            let menus = []
      
            querySnapshot.forEach((doc) => {
                let menu = doc.data()
                menus.push({...menu, id: doc.id});
            });
      
            menus.sort((a, b) => a.menu.localeCompare(b.menu));
            menus.forEach((menu) =>{
                datos +=`
                <option value="${menu.valor}">${menu.menu}</option>
                `
            })
            tBody.innerHTML = datos;
        })
      })

    //   APARTADO DELIVERYS -----------------------------------------------------------------------
    window.addEventListener('DOMContentLoaded', async () => {
    
        let tBody = document.getElementById('optionDelivery')
      
        deliveryBD((querySnapshot) => {
            let datos = ''
            let deliverys = []
      
            querySnapshot.forEach((doc) => {
                let delivery = doc.data()
                deliverys.push({...delivery, id: doc.id});
            });
      
            let contador = 1
            deliverys.sort((a, b) => a.delivery.localeCompare(b.delivery));
            deliverys.forEach((delivery) =>{
                datos +=`
                <option value="${delivery.delivery}">${delivery.delivery}</option>
                `
            })
            tBody.innerHTML = datos;
        })
      })

    //   APARATODO REGISTRAR PEDIDO--------------------------------------------------------------------

    let btnGenerarPedido = document.getElementById("btnGenerarPedido")


    btnGenerarPedido.addEventListener('click', () =>{

        let cliente = document.getElementById("optionClienteSelect").value
        let menu = document.getElementById("optionMenuSelect")
        let menuValue = parseFloat(menu.value);
        let menuText = menu.options[menu.selectedIndex].text;
        let delivery = document.getElementById("optionDeliverySelect").value
        let monto = parseFloat(document.getElementById("optionCobrarSelect").value)
        let cobrar = monto + menuValue

        registrarPedido(cliente,menuText,delivery,cobrar)
        Toastify({
            text: "Pedido Registrado",
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

    })

    window.addEventListener('DOMContentLoaded', async () => {
    
        let tBody = document.getElementById('tBodyPedido')
      
        pedidosDB((querySnapshot) => {
            let datos = ''
            let pedidos = []
      
            querySnapshot.forEach((doc) => {
                let pedido = doc.data()
                pedidos.push({...pedido, id: doc.id});
            });
      
            let contador = 1
            pedidos.sort((a, b) => a.delivery.localeCompare(b.delivery));
            pedidos.forEach((pedido) =>{
                datos +=`
                <tr>
                <td>${contador++}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.menu}</td>
                <td>${pedido.monto.toLocaleString('es-ES')}</td>
                <td class="text-center align-middle" style="max-height: 60px;height: 60px;">
                <a class="btn btnMaterial btn-flat accent btnNoBorders checkboxHover" data-id="${pedido.id}" role="button" style="margin-left: 5px;">
                <i class="fas fa-trash btnNoBorders" data-id="${pedido.id}" style="color: #DC3545;"></i>
                </a>
                </td>
            </tr>
                `
            })
            tBody.innerHTML = datos;

            const btnDelet = tBody.querySelectorAll(".btnMaterial");

            // Agregar un evento de clic a cada botón de borrado
            btnDelet.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    // Llamar a la función deletTask con el ID de la tarea asociado al botón
                    borrarPedido(event.target.dataset.id);
                });
            });
        })
      })

