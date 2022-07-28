
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = [];

Clickbutton.forEach(button => {
    button.addEventListener('click', addtoCarritoItem)
});

//Agregar al carrito

function addtoCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img').src;
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    
    Toastify({
        text: 'Producto agregado al carrito',
        duration: 1500,
        style: {
            background: "#198754",
        },
    }).showToast();
    addItemCarrito(newItem)
    
}


//Suma cantidad
function addItemCarrito (newItem){
    
    const inputElemento = tbody.getElementsByClassName('cantCarrito')
    for(let i=0; i< carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            carritoTotal();
            
            return null;
        }
    }

    carrito.push(newItem)
    renderCarrito()
}

//Render Carrito
function renderCarrito(){
    tbody.innerHTML = '';
    carrito.map(item =>{
        const tr = document.createElement('tr');
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.img}>
                <h6 class="title">${item.title}</h6>
                </td>
                <td class="table__precio">
                <p>${item.precio}</p>
                </td>
                <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="cantCarrito">
                <button  class="delete btn btn-danger">x</button>
            </td>
            `
        tr.innerHTML = Content;
        tbody.append(tr)
        
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector('.cantCarrito').addEventListener('change', sumaCantidad)
    })
    carritoTotal();
}

//Precio total
function carritoTotal (){
    let total = 0;
    const itemCarTotal = document.querySelector('.itemCarrTotal')
    carrito.forEach((item) =>{
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })

    itemCarTotal.innerHTML = `Total $${total}`;
    addLocalStorage();
}

//Elimina producto del carrito
function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i=0; i<carrito.length; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1)
        }
    }
    tr.remove()
    carritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput.value <1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
}

//Alert compra
const clickComprar = document.querySelector('.btnComprar')

clickComprar.addEventListener('click', ()=>{
    swal({
        title: '¡Felicitaciones!',
        text: '¡Tu pedido se realizo correctamente!',
        icon : 'success',
        buttons: false,
        timer: 2000,
    })
})

//Guardar el carrito en localstorage
function addLocalStorage (){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

const API = "../js/data.json";



//------

const asd = document.querySelector('.asd')

const productosController = async () =>{
    
        try{
        const response = await fetch(API);
        const data = await response.json();
        return data;
    } catch (error){
        console.log("Hubo un error en la petición", error);
    }
    
}

const mostrarProductos = async () => {
        asd.innerHTML='';
    
        const productos = await productosController();
    
    productos.forEach(producto =>{
        const div = document.createElement('div');
        div.classList.add('card')
        const Content = `
            <div class= tarjetaShop mt-4 sizeSm>
                <h3 class="card-title tarjetaTitulo">${producto.nombre}</h3>

                <p>${producto.desc}</p>

                <img class="card-img img-fluid" src="${producto.img}" alt="Buzo sage violeta Valorant">
                
                <h5 class="tarjeta-precio"><span class="precio">$ ${producto.precio}</span></h5>

                <button  class="botonComprar miboton button">Añadir al carrito</button>
            </div>
            `
        div.innerHTML = Content;
        asd.appendChild(div);

    });
}

mostrarProductos();