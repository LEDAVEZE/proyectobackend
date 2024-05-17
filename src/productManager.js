import {promises as fs} from 'fs';//lo importo para poder escribir y leer archivos
import { v4 as uuid } from 'uuid';//lo importo para que genere un id unico

export class ProductManager {
    constructor() {
        this.path = 'products.json';
        this.products = []
    }

    addProducts = async ({title, description, price, thumbnail, code, status = true, stock, category}) => { //recibe los parametros que debe tener un producto
        const id = uuid(); //genera un id aleatorio unico

        let newProduct = {id, title, description, price, thumbnail, code, status, stock, category}
        
        this.products = await this.getProducts();//se espera el getProducts para poder seguir agregando productos, sino queda el ultimo
        this.products.push(newProduct);//agrego el nuevo producto al array del constructor (linea 7)
        
        await fs.writeFile(this.path, JSON.stringify(this.products));//reescribo el array productos
        
        return newProduct;
    }



    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf-8');//lee el archivo products.json, se pone utf8 para poder leerlo sino lo veriamos en binario
        const responseJson = JSON.parse(response);//pasa la respueta a formato JSON

        return responseJson;
    }



    getProductById = async (id) => {
    const response = await this.getProducts() //traemos a todos los productos que tenemos 
    const product = response.find((product) => product.id === id) //buscamos el producto por el id que recibimos por parametro y lo traemos
    
    if (product){
        return product;
    } else {
        console.log('No se encontro el producto');
    }
    }



    updateProduct = async (id, {...data}) => {//recibe el id y los datos que se van a actualizar o modificar
        
        const products = await this.getProducts();//traemos a todos los productos que tenemos

        const index = products.findIndex((product) => product.id === id);//busca si un producto tiene el id que le pasamos por parametro.  findIndex devuelve el indice donde esta el producto
        
        if(index !== -1){ //si encuentra el producto o es diferente de -1
            products[index] = {id, ...data};
            await fs.writeFile(this.path, JSON.stringify(products)); //reescribimos el archivo de products con el producto elegido modificamos            return products[index];
            return products [index]
        }else{
            console.log('No se encontro el producto');
        }
    }



    deleteProduct = async (id) => {//recibe el id y los datos que se van a borrar
        const products = await this.getProducts();//traemos a todos los productos que tenemos
        const index = products.findIndex((product) => product.id === id);//busca si un producto tiene el id que le pasamos.  findIndex devuelve el indice donde esta el producto
        
        if (index !== -1) {//si encuentra el producto o es diferente de -1
            products.splice(index, 1);//borra el producto con el indice o id que le pasamos
            await fs.writeFile(this.path, JSON.stringify(products));//reescribimos el archivo de products con el producto elegido borrado
            return 'Se elimino el producto';
        } else {
            console.log('No se encontro el producto');
        }
    }
}
