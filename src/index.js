import express from 'express';  
import { ProductManager } from './productManager.js';  
import { CartManager } from './cartManager.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';

const Port = 8080; //declaro el puerto en una constante
const app = express ();//inicio express en la constante app

export const productManager = new ProductManager();// exporto para usarlo en los router
export const cartManager = new CartManager();// exporto para usarlo en los router

app.use(express.json());//le digo a express que use json 
app.use('/api/products', productsRouter);//agrego la ruta products 
app.use('/api/carts', cartsRouter);//agrego la ruta carts

app.listen(Port, (req, res) => {//le digo a la app que escuche el puerto
    console.log(`Servidor escuchando en el puerto ${Port}`)
});
