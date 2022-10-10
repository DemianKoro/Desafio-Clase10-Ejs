const express = require('express')
const app = express()
const {getProductos, getProductoById, saveProducto, modifyProductoById, deleteProductoById, deleteAllProducts,  } = require('./contenedores/contenedor');

const productos = require('../public/productos.txt')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const productos = await getProductos().catch();
    res.render('inicio', {productos});
});

app.post('/productos', async (req, res) => {
    const producto = req.body
    const productoNuevo = await saveProducto(producto).catch()
    console.log(producto)
    const productos = await getProductos().catch();
    console.log(productos)
    // res.render('historial', {productos})
    res.redirect('/')
});

// function renderIngreso() {
//     let html = render('inicio', {productos});
//     document.getElementById('ingresar').innerHTML = html;
// }

// app.delete('/'), async (req, res) => {
//     params = (productos)
//     console.log(productos)
//     const lista = req.params
//     await deleteAllProducts(lista).catch();
//     res.redirect('/')
// }

// Running server
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
