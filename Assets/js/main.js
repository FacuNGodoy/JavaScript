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

alert('Ingreso de un nuevo producto al sistema. En caso de no querer adicionar más productos o cancelarlo, escriba "ESC"')

do{
    const nombre = prompt ('Ingrese el nombre del nuevo producto:');

    let valor;
    let tipo;
    let stock;

    if ((nombre=== 'ESC') || (nombre === 'esc')){
        solicitarConfirmacion = false;
        alert('No se agregaran mas productos.');
    }else{
        valor = parseInt (prompt('Ingrese el valor en $ARS:'));
        if ((valor === 'ESC') || (valor=== 'esc')){
            solicitarConfirmacion = false;
            alert('No se agregaran mas productos.');
        } else{
            tipo = prompt('Ingrese la categoría:');
            if ((tipo === 'esc') || (tipo === 'ESC')){
                solicitarConfirmacion = false;
                alert('No se agregaran mas productos.')
            } else{
                stock = parseInt ( prompt ('Ingrese el stock:'));
                if ((stock === 'esc') || (stock === 'ESC')){
                    solicitarConfirmacion = false;
                    alert('No se agregaran mas productos.');
                }
            }
        }
    }

    if (solicitarConfirmacion){
        const nuevoProducto = new Producto (nombre, valor, tipo, stock);
        productosAgregados.push(nuevoProducto);
    }

    if(solicitarConfirmacion){
        solicitarConfirmacion = confirm('¿Quiere agregar otro producto?');
    }

} while (solicitarConfirmacion);




let productoCompleto = (producto) => {
    return "Ha ingresado: Nombre: " + producto.nombre + ", $" + producto.valor + ", Categoría: " + producto.tipo + ", Stock: " + producto.stock;
}

alert(productosAgregados.map(item => productoCompleto(item)).join("\n"))

let consulta = confirm('¿Confirma agregar estos productos al stock?');

if (consulta = true){
    productos = productos.concat(productosAgregados);
    productosAgregados = [];
}else{
    productosAgregados = [];
}

console.log(productosAgregados);
console.log(productos);

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

mostrarStock();
