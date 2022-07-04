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

function validarFormulario(e){
     e.preventDefault();
  
    let formulario = e.target
 
    let valor = parseInt(formulario.children[1].value)
    let tipo = formulario.children[3].value
    let stock = parseInt( formulario.children[5].value)
    let nombre = formulario.children[7].value
 
   
  
    const nuevoProducto = new Producto (nombre, valor, tipo, stock);
    productosAgregados.push(nuevoProducto);
     productos = productos.concat(productosAgregados);
     productosAgregados = [];
 
    console.log(productos)
    mostrarStock();
}

const mostrarStock = () =>{
    const container = document.getElementById("stock_tabla");
  
    productos.forEach(producto => {
        const linea = document.createElement("tr");
        linea.classList.add("prod");
        linea.innerHTML = `<td>${producto.nombre}</td>
                        <td>$${producto.valor}</td>
                        <td>${producto.tipo}</td>
                        <td>${producto.stock}</td>
                        `
        container.appendChild(linea);
        
    });
};