import { Router } from "express";
import { CartManager } from '../controllers/CartManager.js';
const routerCarts = Router();
const cartManager = new CartManager("./src/models/carts.json");

// Carts

routerCarts.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({resp: "Carrito creado"});

});

routerCarts.get('/:idCart', async (req, res) => {
    const idCart = parseInt(req.params.idCart);
    if (idCart) {
        let resp = await cartManager.getCartByID(idCart);
        res.send({ resp: resp });
    } else {
        res.send({resp:"Error: El ID no es valido"});
    }
});

routerCarts.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = parseInt(req.params.idCart);
    const idProduct = parseInt(req.params.idProduct);
    if (idProduct && idCart) {
        let resp = await cartManager.addToCart(idCart, idProduct);
        res.send({resp: resp});
        
    } else {
        res.send({resp:"Error: El ID no es valido"});
    }
});

export default routerCarts;
