import { Router } from "express";
import {ProductManager, Productos} from "../controllers/ProductManager.js";

const data = "./src/models/data.json"
const manager = new ProductManager(data);
const routerProduct = Router()

routerProduct.get('/', async (req, res) => {
    const data = await manager.getProduct()
    let {limit} = req.query
    if(limit) {
        const productos = data.slice(0, limit)
        res.send(`Mostrando ${limit} producto/productos: ${JSON.stringify(productos)}}`)
    } else {
        res.send(`Todos los productos: ${JSON.stringify(data)}}`)
    }
})


routerProduct.get('/:idProduct', async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    const data = await manager.getProductById(parseInt(idProduct)) 
    if(data) {
        res.send(`El producto buscado es: ${JSON.stringify(data)}`)
    } else {
        res.send(`El producto con ID: ${idProduct} no existe`)
    }
})

routerProduct.post('', async (req, res)=>{
    let {title, description, price, thumbnail, code, stock, category, status} = req.body;
    const newProduct = new Productos(title, description, price, thumbnail, code, stock, category, status);
    console.log(newProduct);
    let resp = await manager.addProduct(newProduct);
    res.send({ resp: resp });
})

routerProduct.put('/:idProduct', async (req, res)=>{
    const idProduct = parseInt(req.params.idProduct);
    if (idProduct) {
        let { title, description, price, thumbnail, code, stock, category, status } = req.body;
        const newProduct = new Productos(title, description, price, thumbnail, code, stock, category, status);
        let resp = await manager.updateProduct(newProduct, idProduct);
        res.send({ resp: resp });
    } else {
        res.send({resp:"Error: El ID no es valido"});
    }
})

routerProduct.delete('/:idProduct', async (req, res)=>{
    const idProduct = parseInt(req.params.idProduct);
    if (idProduct) {
        let resp = await manager.deleteProduct(idProduct);
        res.send({ resp: resp });
    } else {
        res.send({resp:"Error: El ID no es valido"});
    }
})

export default routerProduct