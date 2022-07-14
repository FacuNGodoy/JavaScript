class Producto {
    constructor (nombre, valor, tipo, stock){
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.stock = stock;
    }

    precioTotal(){
        return this.precio * 1.21;
    }
}

let productos = [];
productos.push(new Producto ('Remera', 3500, 'Ropa', 1000));
productos.push(new Producto ('Figura Phoenix', 11000, 'Figuras', 15));
productos.push(new Producto ('Buzo Sage', 8000, 'Ropa', 600));

let solicitarConfirmacion = true;
let productosAgregados = [];

let miFormulario      = document.getElementById("formularioStock");
miFormulario.addEventListener("submit", validarFormulario);

//FUNCIONES

traerLocal = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
            
        productosAgregados.push(JSON.parse(localStorage.getItem(clave)));
    }
}

const mostrarStock = () =>{
    const container = document.getElementById("stock_tabla");
  
    productosAgregados.forEach(producto => {
        const linea = document.createElement("tr");
        linea.classList.add("prod");
        linea.innerHTML = `<td>${producto.nombre}</td>
                        <td>$${producto.valor}</td>
                        <td>${producto.tipo}</td>
                        <td>${producto.stock}</td>
                        `
        container.appendChild(linea);
        
    });
    productosAgregados = [];
};

agregarNuevo = () => {
    const container = document.getElementById("stock_tabla");
  
    productosAgregados.forEach(producto => {
        const linea = document.createElement("tr");
        linea.classList.add("prod");
        linea.innerHTML = `<td>${producto.nombre}</td>
                        <td>$${producto.valor}</td>
                        <td>${producto.tipo}</td>
                        <td>${producto.stock}</td>
                        `
        container.appendChild(linea);
        
    });
    productosAgregados = [];
};

//GUARDAR EN LOCALSTORAGE

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

for (const product of productos) {
    guardarLocal(product.nombre, JSON.stringify(product))
}


traerLocal();

mostrarStock();

function validarFormulario(e){
     e.preventDefault();
  
    let formulario = e.target
 
    let nombre = formulario.children[1].value
    let valor = parseInt(formulario.children[3].value)
    let tipo = formulario.children[5].value
    let stock = parseInt( formulario.children[7].value)
 
  
    const nuevoProducto = new Producto (nombre, valor, tipo, stock);

    productosAgregados.push(nuevoProducto);

    const guardarLocal = (clave, valor) => {
        localStorage.setItem(clave, valor)
    };

    for (const product of productosAgregados) {
        guardarLocal(product.nombre, JSON.stringify(product))
    }
    agregarNuevo() ;

    formulario.reset();
}

