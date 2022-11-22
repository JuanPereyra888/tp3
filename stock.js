const productos = [
    {
        id: "Jordan-01",
        titulo:"Zapatillas 01",
        imagen: "img/jordan 13.jpg",
        categoria: {
            nombre: "Jordan",
            id: "1"
        },
        precio: 100000
    },
    {
        id: "Jordan-02",
        titulo:"Zapatillas 02",
        imagen: "img/jordan1.jpg",
        categoria: {
            nombre: "Jordan",
            id: "2"
        },
        precio: 225000
    },
    {
        id: "Jordan-03",
        titulo:"Zapatillas 03",
        imagen: "img/jordan4.jpg",
        categoria: {
            nombre: "Jordan",
            id: "3"
        },
        precio: 143000
    },
    {
        id: "Jordan-04",
        titulo:"Zapatillas 04",
        imagen: "img/jordan6.jpg",
        categoria: {
            nombre: "Jordan",
            id: "4"
        },
        precio: 285000
    },
    {
        id: "Jordan-05",
        titulo:"Zapatillas 05",
        imagen: "img/jordan14.jpg",
        categoria: {
            nombre: "Jordan",
            id: "1"
        },
        precio: 140000
    },
    {
        id: "Jordan-01",
        titulo: "Zapatillas 01",
        imagen: "img/jordanlow.jpg",
        categoria: {
            nombre: "Jordan",
            id: "1"
        },
        precio: 320000
    }
];
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}