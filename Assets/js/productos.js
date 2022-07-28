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

export const mostrarProductos = async () => {
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
};

