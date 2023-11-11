/*AYUDA*/

const preguntas = document.querySelectorAll(".pregunta_encabezado");

preguntas.forEach((pregunta) => {
	pregunta.addEventListener("click", () => {
		removerClaseActivo();
		pregunta.nextElementSibling.classList.add("activo");
	});
});

function removerClaseActivo() {
	preguntas.forEach((pregunta) => {
		pregunta.nextElementSibling.classList.remove("activo");
	});
}


/* TIENDA*/
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Camiseta Full Print',
        precio: 6000,
        imagen: '../img/camisetajuego.png'
    },
    {
        id: 2,
        nombre: 'Camiseta lisa',
        precio: 4800,
        imagen: '../img/camisetajuegolisa.png'
    },
    {
        id: 3,
        nombre: 'Pantalón liso',
        precio: 4000,
        imagen: '../img/pantalonJuegoLiso.png'
    },
    {
        id: 4,
        nombre: 'Pantalón Full Print',
        precio: 5000,
        imagen: '../img/pantalonJuegoFullprint.png'
    },
    {
        id: 5,
        nombre: 'Chomba Full Print',
        precio: 7500,
        imagen: '../img/chombaSublimada-01.png'
    },
    {
        id: 6,
        nombre: 'Chomba Lisa',
        precio: 6500,
        imagen: '../img/chombaLisa.png'
    },
    {
        id: 7,
        nombre: 'Sudadera Full Print',
        precio: 5500,
        imagen: '../img/sudaderaFullprint.png'
    },
    {
        id: 8,
        nombre: 'Sudadera Lisa',
        precio: 4500,
        imagen: '../img/sudaderaLisa.png'
    },
    {
        id: 9,
        nombre: 'Leggings',
        precio: 9500,
        imagen: '../img/leggingsFullprint.jpg'
    },
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertar
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/* Evento para añadir un producto al carrito de la compra*/
function anyadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

/* Dibuja todos los productos guardados en el carrito*/
function renderizarCarrito() {
   
    DOMcarrito.textContent = '';
   
    const carritoSinDuplicados = [...new Set(carrito)];
   
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          
            return itemBaseDatos.id === parseInt(item);
        });
      
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
            return itemId === item ? total += 1 : total;
        }, 0);
       
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
}

/* Evento para borrar un elemento del carrito*/
function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

/*Calculo total*/

function calcularTotal() {
    
    return carrito.reduce((total, item) => {
       
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
    
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}
/* Varia el carrito */
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();


function save(DOMitems) {
    localStorage.setItem('products',DOMitems);
}


const toastify = document.querySelector("#toastify");

toastify.addEventListener("click", () => {
    Toastify({
        text: "Estas yendo a la tienda online.",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true, 
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
})


