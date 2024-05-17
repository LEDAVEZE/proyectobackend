import { Router } from "express";
import { cartManager } from "../index.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res)=>{ //CREAR CARRITO
    try {
        const response = await cartManager.newCart();
        res.json(response)
    } catch (error) {
        res.send('Error al crear un nuevo carrito');
    }
});

cartsRouter.get('/:cid', async (req, res)=>{ //TRAER CARRITO POR ID
    const {cid} = req.params;

    try {
        const response = await cartManager.getcartsProducts(cid);
        res.json(response);
    } catch (error) {
        res.send('Error al intentar enviar los productos al carrito');
        
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res)=>{ //AGREGAR PRODUCTO AL CARRITO
    const {cid, pid} = req.params;

    try {
        await cartManager.addProductToCart(cid, pid);
        res.send('El producto fue agregado al carrito');
    } catch (error) {
        res.send('Error al intentar agregar producto al carrito');
    }
})

export { cartsRouter }