import {promises as fs} from 'fs';//lo importo para poder escribir y leer archivos
import {v4 as uuid} from 'uuid';//lo importo para que genere un id unico

export class CartManager{
    constructor (){
        this.path = 'carts.json';
        this.carts = [];
    }

    getcarts = async () => {//TRAER TODOS LOS CARRITOS
        const response = await fs.readFile(this.path, 'utf-8');//guardo en una constante el carts.json
        const responseJson = JSON.parse(response);//paso la respueta a formato JSON
        return responseJson;
    }

    getcartsProducts = async (id) => {//TRAER CARRITO POR ID
        const carts = await this.getcarts();//guado en una constante todos los carritos
        const cart = carts.find(cart => cart.id === id);//busco el id que recibo por parametro

        if (cart) {
            return cart.products;
        } else {
            console.log('No se encontro el Carrito');
        }
    }

    newCart = async () => {//NUEVO CARRITO
        const id = uuid();//genera un id aleatorio unico y lo guardo en una constante
        const newCart = {id, products: []};     

        this.carts = await this.getcarts();//traigo todos los carritos
        this.carts.push(newCart);//pusheo el nuevo carrito
        
        await fs.writeFile(this.path, JSON.stringify(this.carts));
        return newCart;
    }

    addProductToCart = async (cart_id, product_id) => {//ADIERO PRODUCTOS SIN PASARME DEL LIMITE
        const carts = await this.getcarts();//traigo todos los carritos
        const index = carts.findIndex(cart => cart.id === cart_id);//busco el id que recibo por parametro en linea 38, 

        if (index !== -1) {//si existe es id del carrito
            const cartProducts = await this.getcartsProducts(cart_id);//traigo todos los productos del carrito
            const existingProductIndex = cartProducts.findIndex(product => product.product_id === product_id);//busco el id del prducto que recibo por parametro

            if(existingProductIndex !== -1) {//si existe el id del producto
                cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity + 1;//modifico la propiedad quantity y le sumo 1
            } else {//si no existe el producto lo agrego
                cartProducts.push({product_id, quantity: 1});
            }

            carts[index].products = cartProducts;//sobreescribo cartProducts 
            await fs.writeFile(this.path, JSON.stringify(carts));//sobreescribo todo el archivo de carritos una ves actualizado el cartProducts
            console.log("Producto agregado al carrito");
        } else {
            console.log("No se encontro el carrito");
        }

    }
}
