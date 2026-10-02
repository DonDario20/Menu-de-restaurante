
const contadorCarrito = document.querySelector(".contador-carrito");

let totalProductos = 0;


    

// Aquí guardaremos el pedido completo
let pedido = {};
const precios = {
    "Hamburguesa del Pacífico": 25000,
    "Torre Eiffel": 23000,
    "Hamburguesa Mixta": 25000,
    "King Kong Burguer": 30000,
    "Hamburguesa Frisbi": 18000,
    "Hamburguesa Paisa": 25000,
    "Hamburguesa Erick": 18000,
    "Hamburguesa Premium": 23000
};

function actualizarCarrito(){

    contadorCarrito.textContent = totalProductos;

}
const listaCarrito = document.querySelector(".lista-carrito");
function actualizarPedido() {

    listaCarrito.innerHTML = "";

    let total = 0;

    for (let nombre in pedido) {

        listaCarrito.innerHTML += `
            <p>${nombre} x${pedido[nombre]}</p>
        `;

        total += pedido[nombre] * precios[nombre];
    }

    document.querySelector(".total-carrito span").textContent =
        "$" + total.toLocaleString("es-CO");
}

const btnCarrito = document.querySelector(".btn-carrito");
const ventanaCarrito = document.querySelector(".ventana-carrito");

const btnWhatsapp = document.querySelector(".btn-whatsapp");
btnWhatsapp.addEventListener("click", () => {

    let mensaje = "Hola, quiero hacer el siguiente pedido:\n\n";

    for (let nombre in pedido) {

        mensaje += `• ${nombre} x${pedido[nombre]}\n`;

    }

    mensaje += "\n";

    mensaje += document.querySelector(".total-carrito").textContent;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const telefono = "573163291514";

    window.open(
        `https://wa.me/${telefono}?text=${mensajeCodificado}`,
        "_blank"
    );

});


btnCarrito.addEventListener("click", ()=>{

    if(ventanaCarrito.style.display=="block"){

        ventanaCarrito.style.display="none";

    }else{

        ventanaCarrito.style.display="block";

    }

});

// =========================
// INGREDIENTES
// =========================

const botonesInfo = document.querySelectorAll(".btn-info");

botonesInfo.forEach(boton => {

    boton.addEventListener("click", () => {

        const ingredientes = boton.nextElementSibling;

        if (ingredientes.style.display === "block") {

            ingredientes.style.display = "none";
            boton.innerHTML = "▼ Ingredientes";

        } else {

            ingredientes.style.display = "block";
            boton.innerHTML = "▲ Ingredientes";

        }

    });

});

// =========================
// CONTADOR
// =========================

const tarjetas = document.querySelectorAll(".categoria");

tarjetas.forEach(tarjeta => {

    const btnAgregar = tarjeta.querySelector(".btn-agregar");
    const contador = tarjeta.querySelector(".contador");
    const btnMas = tarjeta.querySelector(".btn-mas");
    const btnMenos = tarjeta.querySelector(".btn-menos");
    const cantidad = tarjeta.querySelector(".cantidad");
    const nombre = tarjeta.querySelector(".nombre").textContent.trim();

    let numero = 1;

   btnAgregar.addEventListener("click", () => {

    btnAgregar.style.display = "none";
    contador.style.display = "flex";

    numero = 1;
    cantidad.textContent = "1";

    totalProductos++;
    actualizarCarrito();

    pedido[nombre] = 1;

    console.log(pedido);
    actualizarPedido();


});

   btnMas.addEventListener("click", () => {

    numero++;
    cantidad.textContent = numero;

    totalProductos++;
    actualizarCarrito();
    pedido[nombre] = numero;

console.log(pedido); 
actualizarPedido();


});
btnMenos.addEventListener("click", () => {

    if (numero === 1) {

        contador.style.display = "none";
        btnAgregar.style.display = "flex";

        totalProductos--;
        actualizarCarrito();

        delete pedido[nombre];

        console.log(pedido);
        actualizarPedido(); 

        return;

    }

    numero--;
    cantidad.textContent = numero;

    totalProductos--;
    actualizarCarrito();

    pedido[nombre] = numero;

    console.log(pedido);
    actualizarPedido(); 



});
});