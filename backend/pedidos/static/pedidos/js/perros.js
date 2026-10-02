const contadorCarrito = document.querySelector(".contador-carrito");

let totalProductos = 0;

let pedido = {};

const precios = {
    "Perro Yumbo Extra Grande para 2": 45000,
    "Perro Criollo": 18000,
    "Perro Camionero": 15000,
    "Chori-Perro": 20000
};

function actualizarCarrito() {
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


// =========================
// CARRITO
// =========================

const btnCarrito = document.querySelector(".btn-carrito");
const ventanaCarrito = document.querySelector(".ventana-carrito");

btnCarrito.addEventListener("click", () => {

    if (ventanaCarrito.style.display == "block") {

        ventanaCarrito.style.display = "none";

    } else {

        ventanaCarrito.style.display = "block";

    }

});


// =========================
// WHATSAPP
// =========================

const btnWhatsapp = document.querySelector(".btn-whatsapp");

btnWhatsapp.addEventListener("click", () => {

    let mensaje = "🍔 Hola, quiero hacer el siguiente pedido:\n\n";

    for (let nombre in pedido) {

        mensaje += `• ${nombre} x${pedido[nombre]}\n`;

    }

    mensaje += `\nTotal: ${document.querySelector(".total-carrito span").textContent}`;

    const telefono = "573150670960";

    window.open(
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );

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


    // AGREGAR

    btnAgregar.addEventListener("click", () => {

        btnAgregar.style.display = "none";
        contador.style.display = "flex";

        numero = 1;
        cantidad.textContent = "1";

        totalProductos++;
        actualizarCarrito();

        pedido[nombre] = 1;

        actualizarPedido();

    });


    // SUMAR

    btnMas.addEventListener("click", () => {

        numero++;

        cantidad.textContent = numero;

        totalProductos++;
        actualizarCarrito();

        pedido[nombre] = numero;

        actualizarPedido();

    });


    // RESTAR

    btnMenos.addEventListener("click", () => {

        if (numero === 1) {

            contador.style.display = "none";
            btnAgregar.style.display = "flex";

            totalProductos--;
            actualizarCarrito();

            delete pedido[nombre];

            actualizarPedido();

            return;
        }

        numero--;

        cantidad.textContent = numero;

        totalProductos--;
        actualizarCarrito();

        pedido[nombre] = numero;

        actualizarPedido();

    });

});
