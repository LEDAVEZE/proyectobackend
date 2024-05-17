import { Router } from "express";   
import { productManager } from "../index.js";

const productsRouter = Router();//inicializa el router

productsRouter.get('/', async (req, res)=>{ //TRAER LOS PRODUCTOS
    try { 
        const {limit} = req.query;  //vemos si tenemos un limite
        const products = await productManager.getProducts();//trae todos los productos del array de productos
        
        if(limit){
            const limitedProducts = products.slice(0, limit);//si tiene un limite, cortamos el array segun pedido
            return res.json(limitedProducts);
        }
        return res.json(products);//mostramos todos los productos        
    } catch (error) {
        console.log(error);
        res.send('Error al intentar recibir productos');
    }
})

productsRouter.get('/:pid', async (req, res)=>{ //TRAER PRODUCTO POR EL ID
    const {pid} = req.params;//obtenemos el id del postman

    try {
        const product = await productManager.getProductById(pid);//trae el producto del array por el id pedido
        res.json(product);//mostramos el producto segun el ID
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar recibir el producto por el ID ${pid}`);
    }
})

productsRouter.post('/', async (req, res)=>{ //AGREGAR PRODUCTO   
    try {
        const {title, description, price, thumbnail, code, status = true, stock,  category} = req.body; //obtenemos los estructura de datos del cuerpo de la peticion, para agregarla por postman
        const newProduct = await productManager.addProducts({title, description, price, thumbnail, code, status, stock, category}); //creamos el nuevo producto
        res.json (newProduct);//mostramos el nuevo producto
    } catch (error) {
        console.log(error);
        res.send('Error al intentar agregar un nuevo producto');
    }
})

productsRouter.put('/:pid', async (req, res)=>{ //ACTUALIZAR PRODUCTO
    const {pid} = req.params;//obtenemos el id del postman
    
    try {
        const {title, description, price, thumbnail, code, status = true, stock, category} = req.body; //obtenemos los estructura de datos del cuerpo de la peticion, para agregarla por postman
        const newProduct = await productManager.updateProduct(pid, {title, description, price, thumbnail, status,code, stock, category}); //actualizamos el nuevo producto del id
        res.json(newProduct);//mostramos el producto actualizado
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar actualizar el producto ${pid}`);
    }
})

productsRouter.delete('/:pid', async (req, res)=>{ //BORRAR PRODUCTO
    const {pid} = req.params;//obtenemos el id del postman

    try {
        await productManager.deleteProduct(pid);//eliminamos
        res.send(`El producto ${pid} fue eliminado`);//mostramos este mjs    
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar eliminar el producto ${pid}`);
    }
})


export { productsRouter }