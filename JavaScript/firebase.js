
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCchWHrgbVdy76J0RBrRHsnKKZl23sBbFw",
    authDomain: "curcuma-60522.firebaseapp.com",
    projectId: "curcuma-60522",
    storageBucket: "curcuma-60522.appspot.com",
    messagingSenderId: "1065953608228",
    appId: "1:1065953608228:web:77671b44d655befb72ceb1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore()

  // APARTADO REGISTRO DE CLIENTE
  export const registrarCliente = (cliente,telefono,direccion) => {

    try {
      addDoc(collection(db,"clientes"),{
        cliente,telefono,direccion
      });
  
      console.log("Cliente Registrado con Exito");
    }
    catch {
      console.error('Cliente no registrado', error)
    }
  
  }

  export const clientesBD = (callback) => onSnapshot(collection(db,'clientes'),callback)
  export const borrarCliente = (id) => deleteDoc(doc(db,'clientes',id));


  // APARTADO REGISTRO DE MENUS

  export const registrarMenu = (menu,valor) => {

    try {
      addDoc(collection(db,"menus"),{
        menu,valor
      });
  
      console.log("Menu registrado con exito");
    }
    catch {
      console.error('Error al registrar menu', error)
    }
  
  }
  export const menusBD = (callback) => onSnapshot(collection(db,'menus'),callback)
  export const borrarMenus = (id) => deleteDoc(doc(db,'menus',id));

  // APARTADO REGISTRAR DELIVERY

  export const registrarDelivery = (delivery) => {

    try {
      addDoc(collection(db,"delivery"),{
        delivery
      });
  
      console.log("Delivery registrado con exito");
    }
    catch {
      console.error('Error al registrar Delirevy', error)
    }
  
  }

