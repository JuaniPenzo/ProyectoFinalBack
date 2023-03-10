import { promises as fs } from 'fs'

export class Productos{    
    constructor(title, description, price, thumbnail, code, stock, category, status){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category= category;
        this.status = status
    }
}
export class ProductManager{
    constructor(path) {
        this.path = path
    }
    async addProduct(obj){
        let contenido = await fs.readFile(this.path, "utf-8")
        let aux = JSON.parse(contenido)
        let lastId = aux[aux.length-1]?.id || 0
        let auxExist = aux.find(i=>(i.code === obj.code))
        if (auxExist) {
            return "Producto repetido"
        }
        else if(obj.title?.length == 0 || obj.title == undefined){
            return "Debe agregar un Titulo"
        }
        else if(obj.description?.length == 0 || obj.description == undefined){
            return "Debe agregar una Descripcion"
        }
        else if(obj.price?.length == 0 || obj.price == undefined){
            return "Debe agregar un Precio"
        }
        else if(obj.code?.length == 0 || obj.code == undefined){
            return "Debe agregar un Codigo"
        }
        else if(obj.stock?.length == 0 || obj.stock == undefined){
            return "Debe agregar una cantidad en stock"
        }
        else if(obj.category?.length == 0 || obj.category == undefined){
            return "Debe agregar una categoria"
        }
        else {
            aux.push({
                ...obj,
                id: lastId + 1
            })
            await fs.writeFile(this.path, JSON.stringify(aux))
            return "Producto Creado"
        }
    }
    async getProduct(){
        let contenido = await fs.readFile(this.path, "utf-8")
        let aux = JSON.parse(contenido)
        return aux
    }
    async getProductById(id){
        let contenido = await fs.readFile(this.path, "utf-8")
        let aux = JSON.parse(contenido)
        if(aux.some(product => product.id === id)){
            let indice = aux.findIndex(product => product.id === id)
            return (aux[indice])
        }else{
            return "Producto no encontrados"
        }
    }
    async updateProduct(newProduct, idProduct){
        let contenido = await fs.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        let productIndex = aux.findIndex(prod => prod.id === idProduct);

        if(productIndex === -1){
            return console.log("Producto no encontrado")
        }
        else if(newProduct.title?.length == 0 || newProduct.title == undefined){
            return "Debe agregar un Titulo"
        }
        else if(newProduct.description?.length == 0 || newProduct.description == undefined){
            return "Debe agregar una Descripcion"
        }
        else if(newProduct.price?.length == 0 || newProduct.price == undefined){
            return "Debe agregar un Precio"
        }
        else if(newProduct.code?.length == 0 || newProduct.code == undefined){
            return "Debe agregar un Codigo"
        }
        else if(newProduct.stock?.length == 0 || newProduct.stock == undefined){
            return "Debe agregar una cantidad en stock"
        }
        else if(newProduct.category?.length == 0 || newProduct.category == undefined){
            return "Debe agregar una categoria"
        }
        else if(newProduct.status == false || newProduct.status == undefined){
            return "El status debe ser true"
        }
        else{
            aux[productIndex] = {
                ...newProduct,
                id: idProduct
            }
            await fs.writeFile(this.path, JSON.stringify(aux))
            return `Producto actualizado`
        }
        }
    async deleteProduct(idProduct){
        let contenido = await fs.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        let productIndex = aux.findIndex(prod => prod.id === idProduct);

        if (productIndex === -1) {
            return `Producto no eliminado`
        }

        aux.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(aux));
        return `Producto eliminado`;
    }
}
/*
const producto1=new Productos("Volkswagen Gol","El Volkswagen Gol es un autom??vil del segmento B dise??ado y producido en Brasil para Am??rica Latina por el fabricante alem??n Volkswagen.",3900000,"https://autotest.com.ar/wp-content/uploads/2021/07/Volkswagen-Gol-lateral.jpg","AA",20);
const producto2=new Productos("Volkswagen Voyage","El Volkswagen Voyage??? es un autom??vil de turismo del segmento B creado en Brasil por la Volkswagen do Brasil en el a??o 1981.",3100000,"https://4.bp.blogspot.com/-79fnKbw3xTk/XKywVh9efdI/AAAAAAAAdIk/iFxC90iLvJIbAHtfN3xb3zPbt7lkQJLfQCLcBGAs/w1200-h630-p-k-no-nu/Volkswagen-Voyage-2019-Argentina.jpg","AB",30);
const producto3=new Productos("Volkswagen Amarok","La Volkswagen Amarok es una camioneta pick-up de tama??o mediano fabricada por Volkswagen",9000000,"https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_eb920fd356044f8b854396b536b9b78b.jpg","AC",10);
const producto4=new Productos("Volkswagen Scirrocco","El Volkswagen Scirocco es un autom??vil deportivo compacto producido por el fabricante alem??n Volkswagen entre los a??os 1974 y 1992 en su primera versi??n",7000000,"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/VW_Scirocco_III_R_Risingblue.JPG/300px-VW_Scirocco_III_R_Risingblue.JPG","AD",40);
const producto0=new Productos("","","","","","");
const productoRepetido=new Productos("Repetido", "Repetido", 1, "A", "AA", 1, "")
const productoNuevo = {title:"Prueba", description:"Prueba", price:1, thumbnail:"", code:"ZZ", stock:1, path: "./ejemplo.txt", id:5}

productManager = new ProductManager()

async function test(){
    await productManager.addProduct(producto1)
    await productManager.addProduct(producto2)
    await productManager.addProduct(producto3)
    await productManager.addProduct(producto4)
    await productManager.addProduct(producto0) //Agrego productos
    await productManager.addProduct(productoRepetido) //"Agrego" producto repetido
    await productManager.getProduct() //Obtengo los productos
    await productManager.getProductById(2) //Obtengo el producto por el indice
    await productManager.updateProduct(productoNuevo) //Revalorizo el producto por el indice
    await productManager.getProductById(5)
    await productManager.deleteProduct(3) //Elimino el producto por el indice (Amarok)
}
test()*/
