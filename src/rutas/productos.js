const { Router } = require ('express');
const routerProductos =  Router();
// const routerProductos = require('./src/rutas/productos')
const {getProductos, getProductoById, saveProducto, modifyProductoById, deleteProductoById,  } = require('../contenedores/contenedor');

routerProductos.get('/', async (req, res) => {
    res.json(`La lista de productos es: ${await getProductos().catch("No se pudo obtener la lista")}`);
})

//Acá tengo que validar si el Producto es no encontrado ↓
 
routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params 
    const productos = await getProductos().catch();
    const producto = await getProductoById(id).catch()
    if( producto != null ){
    res.json( {"El producto es": producto.name} )
    } else {
    res.send("Producto no encontrado")
}
})

//Acá tengo que validar si el Producto es no encontrado ↑

routerProductos.post('/guardar', async (req, res) => {
    const producto = req.body
    const productoNuevo = await saveProducto(producto).catch()
    res.json({"Se guardo el producto": producto.name ,"con Id=": producto.id} )
})

routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params
    const producto = req.body
    producto.id = parseInt(id);
    const productoAnt = await getProductoById(id).catch()
    await modifyProductoById(id, producto).catch()
    // console.log(id)
    // console.log(producto)
    res.json(`Se modificó el producto ${productoAnt.name} por el producto ${producto.name}`)  
})

routerProductos.delete('/:id', async (req, res) =>{
    const {id} = req.params
    await deleteProductoById(id).catch();
    res.json({"Se borró el producto con Id": id})
}) 

 module.exports = routerProductos;