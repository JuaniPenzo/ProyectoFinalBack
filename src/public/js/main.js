const socket = io();

const form = document.getElementById("realTimeProductsForm")
form?.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.getElementById("formTitle").value
    const description = document.getElementById("formDescription").value
    const price = document.getElementById("formPrice").value
    const thumbnail = document.getElementById("formThumbnail").value
    const code = document.getElementById("formCode").value
    const stock = document.getElementById("formStock").value
    const category = document.getElementById("formCategory").value
    const product = {title,description,price,thumbnail,code,stock,category}    
    socket.emit("addProduct", product) 
})

socket.on("mensajeProductoAgregado",mensaje=>{
    console.log(mensaje)
})

socket.on("getProducts", products =>{
    products.forEach(product => {
        const productCard = document.getElementById("productsCard")
        
        if(productCard){
            productCard.innerHTML+=  
        `
        <div>
        <img src="${product.thumbnail}" alt="Card image cap" id="imagenes">
        </div>
        <div>
            <h5>${product.title}</h5>
            <p>${product.description} </p>
            <p>Precio: ${product.price} </p>       
            <p>Stock: ${product.stock} </p>   
            <p>Code: ${product.code} </p>                                               
            <button id="botonProducto${product.id}">Eliminar</button>
        </div>
        `
        }
    });


    products.forEach(product=>{
        document.getElementById(`botonProducto${product.id}`)?.addEventListener("click",(e)=>{
            socket.emit("deleteProduct", product.id) 
            socket.on("mensajeProductoEliminado",mensaje=>{
                console.log(mensaje)
            })
        })
    })
})
