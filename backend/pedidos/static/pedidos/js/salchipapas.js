const contadorCarrito = document.querySelector(".contador-carrito");

let totalProductos = 0;
let pedido = {};

function actualizarCarrito() {

    contadorCarrito.textContent = totalProductos;

}

const listaCarrito = document.querySelector(".lista-carrito");

function actualizarPedido() {

    listaCarrito.innerHTML = "";

    let total = 0;

    for (let clave in pedido) {

        const producto = pedido[clave];
listaCarrito.innerHTML += `
    <div class="item-carrito">

        <div class="item-info">

            <strong>
                ${producto.nombre}
            </strong>

            <span>
                ${producto.tamano} ×${producto.cantidad}
            </span>

        </div>

        <div class="item-precio">

            $${producto.precio.toLocaleString("es-CO")} c/u

        </div>

    </div>
`;

        total += producto.cantidad * producto.precio;

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

    let mensaje =
        "🍟 Hola, quiero hacer el siguiente pedido:\n\n";

    for (let clave in pedido) {

        const producto = pedido[clave];

        mensaje +=
            `• ${producto.nombre} ${producto.tamano} x${producto.cantidad}\n`;

    }

    mensaje +=
        `\nTotal: ${document.querySelector(".total-carrito span").textContent}`;

    const telefono = "573150670960";

    window.open(
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );

});


// =========================
// INGREDIENTES
// =========================

const botonesInfo =
    document.querySelectorAll(".btn-info");

botonesInfo.forEach(boton => {

    boton.addEventListener("click", () => {

        const ingredientes =
            boton.nextElementSibling;

        if (ingredientes.style.display === "block") {

            ingredientes.style.display = "none";

            boton.innerHTML =
                "▼ Ingredientes";

        } else {

            ingredientes.style.display = "block";

            boton.innerHTML =
                "▲ Ingredientes";

        }

    });

});


// =========================
// CONTADORES
// =========================
// =========================
// CONTADORES
// =========================

const tarjetas =
    document.querySelectorAll(".categoria");


tarjetas.forEach(tarjeta => {

    const btnAgregar =
        tarjeta.querySelector(".btn-agregar");

    const contador =
        tarjeta.querySelector(".contador");

    const btnMas =
        tarjeta.querySelector(".btn-mas");

    const btnMenos =
        tarjeta.querySelector(".btn-menos");

    const cantidad =
        tarjeta.querySelector(".cantidad");

    const nombre =
        tarjeta.querySelector(".nombre")
        .textContent.trim();

    // Puede existir o no
    const selector =
        tarjeta.querySelector(".tamano");


    // =========================
    // OBTENER PRECIO Y TAMAÑO
    // =========================

    function obtenerDatosProducto() {

        if (selector) {

            const opcion =
                selector.options[selector.selectedIndex];

            return {

                precio: Number(opcion.value),

                tamano:
                    opcion.textContent.trim()

            };

        }


        // Productos con un solo precio

        const textoPrecio =
            tarjeta.querySelector(".precio")
            .textContent;

        const precio =
            Number(
                textoPrecio.replace(/\D/g, "")
            );


        return {

            precio: precio,

            tamano: ""

        };

    }


    // =========================
    // CREAR CLAVE ÚNICA
    // =========================

    function obtenerClave(datos) {

        return (
            nombre +
            "_" +
            datos.tamano +
            "_" +
            datos.precio
        );

    }


    // =========================
    // ACTUALIZAR VISTA
    // =========================

    function actualizarVistaActual() {

        const datos =
            obtenerDatosProducto();

        const clave =
            obtenerClave(datos);

        const producto =
            pedido[clave];

        const cantidadActual =
            producto
                ? producto.cantidad
                : 0;


        cantidad.textContent =
            cantidadActual;


        if (cantidadActual === 0) {

            btnAgregar.style.display =
                "flex";

            contador.style.display =
                "none";

        } else {

            btnAgregar.style.display =
                "none";

            contador.style.display =
                "flex";

        }

    }


    // =========================
    // CAMBIAR TAMAÑO / PRECIO
    // =========================

    if (selector) {

        selector.addEventListener("change", () => {

            const datos =
                obtenerDatosProducto();


            const precio =
                tarjeta.querySelector(".precio");


            // Cambiar solamente el precio visual

            precio.textContent =
                "$" +
                datos.precio.toLocaleString("es-CO");


            // IMPORTANTE:
            // NO tocamos el carrito.
            // Solo mostramos la cantidad
            // correspondiente a esta presentación.

            actualizarVistaActual();

        });

    }


    // =========================
    // AGREGAR
    // =========================

    btnAgregar.addEventListener("click", () => {

        const datos =
            obtenerDatosProducto();

        const clave =
            obtenerClave(datos);


        // Si esa presentación ya existe,
        // aumentamos su cantidad.

        if (pedido[clave]) {

            pedido[clave].cantidad++;

        } else {

            pedido[clave] = {

                nombre: nombre,

                tamano:
                    datos.tamano
                        ? `(${datos.tamano})`
                        : "",

                precio:
                    datos.precio,

                cantidad: 1

            };

        }


        totalProductos++;

        actualizarCarrito();

        actualizarPedido();

        actualizarVistaActual();

    });


    // =========================
    // SUMAR
    // =========================

    btnMas.addEventListener("click", () => {

        const datos =
            obtenerDatosProducto();

        const clave =
            obtenerClave(datos);


        if (!pedido[clave]) {

            pedido[clave] = {

                nombre: nombre,

                tamano:
                    datos.tamano
                        ? `(${datos.tamano})`
                        : "",

                precio:
                    datos.precio,

                cantidad: 0

            };

        }


        pedido[clave].cantidad++;


        totalProductos++;

        actualizarCarrito();

        actualizarPedido();

        actualizarVistaActual();

    });


    // =========================
    // RESTAR
    // =========================

    btnMenos.addEventListener("click", () => {

        const datos =
            obtenerDatosProducto();

        const clave =
            obtenerClave(datos);


        if (!pedido[clave]) {

            return;

        }


        pedido[clave].cantidad--;

        totalProductos--;


        // Si llega a cero,
        // eliminamos SOLO esa presentación.

        if (pedido[clave].cantidad <= 0) {

            delete pedido[clave];

        }


        actualizarCarrito();

        actualizarPedido();

        actualizarVistaActual();

    });


    // =========================
    // VISTA INICIAL
    // =========================

    actualizarVistaActual();

});

