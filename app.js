import express from "express";                     //1° importar el modulo express de su paquete
import ProductManager from "./productManager.js";

const app = express();                             // normalmente el cosntructor se nombra en una constante llamada "app"

app.use(express.urlencoded({ extended: true}))

const manager = new ProductManager('./products.json')

//CREACION DE LOS ENDPOINT
app.get("/products", async (req, res) => {                   // Invoco la constante y accedo a sus métodos, que recibirán 2 parámetros: url y un callback (req,res)
  
  const {limit} = req.params;

  const products = await manager.getProducts();
  
  res.send (
  limit ? products.slice(0, limit)
  : products)
});

app.get("/products/:pid", async (req, res) => {                   // Invoco la constante y accedo a sus métodos, que recibirán 2 parámetros: url y un callback (req,res)
  
  const {id} = req.params;

  const products = await manager.getProducts();
  
  res.send(products.find(product => product.id == id));
});


// CONFIGURACION DEL PUERTO ASIGNADO

app.listen(8080, () => {
  console.log("escuchando en el puerto 8080!");
});