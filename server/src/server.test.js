const { expect } = require('chai');
const axios = require('axios');

//Productos
describe('Verifing api product endpoints', () => {
  it('Validating code 200 GET /api/products', async () => {
    const productos = await axios.get('http://localhost:8080/api/productos')
    
    console.log(productos)
    expect(productos.status).to.eql(200)
  })

  it('Validating response data structure GET /api/products', async () => {
    const productos = await axios.get('http://localhost:8080/api/productos')
    
    console.log(productos)
    expect(productos.data[0]).to.include.keys('nombre', 'precio')
  })

  it('Validating store a new product POST /api/productos', async () => {
    const productoNuevo = {
      'nombre': 'Buzo West Style',
      'precio': '8000',
      'stock': 15,
      'imagen': './image/WestStyle'
    }
    const productos = await axios.post('http://localhost:8080/api/productos?admin=true', productoNuevo)
    console.log(productos)
    expect(productos.data).to.include.keys('nombre')
    expect(producto.data).to.eql(productoNuevo.title)
  })

  it('Validating incomplete structure GET /api/productos', async () => {
    const productoNuevo = {
      'nombre': 'Buzo West Style',
      'stock': 15,
      'imagen': './image/WestStyle'
    }
    const producto = await axios.post('http://localhost:8080/api/productos?admin=true', productoNuevo)
    console.log(producto)
    expect(producto.data._message).to.eql('Product validation failed')
  })

  it('Validating store a new product POST /api/productos', async () => {
    const productoNuevo = {
      'nombre': 'Buzo West Style',
      'precio': '8000',
      'stock': 15,
      'imagen': './image/WestStyle'
    }
    const producto = await axios.post('http://localhost:8080/api/productos?admin=true', productoNuevo)
    expect(producto.data).to.eql('You don´t have access')
  })

})

//Carrito
describe('Verifing api cart endpoints', () => {
  it('Validating code 200 GET /api/cart', async () => {
    const carrito = await axios.get('http://localhost:8080/api/carrito')

    console.log(carrito)
    expect(carrito.status).to.eql(200)
  })

  it('Validating response data structure GET /api/cart', async () =>{
    const carrito = await axios.get('http://localhost:8080/api/carrito')

    console.log(carrito)
    expect(carrito.data).to.include.keys('nombre', 'valor')
  })

  it('Validating store a new product POST /api/cart', async () => {
    const productoAgregado = {
      author: {
        'nombre': 'Buzo Retro Style',
        'cantidad': 750,
        'valor': 7500,
      }
    }
    const carrito = await axios.post('http://localhost:8080/api/carrito', productoAgregado)
    console.log(carrito)
    expect(carrito.data).to.include.keys('nombre')
    expect(carrito.data).to.eql(carrito.nombre)
  })

  it('Validating incomplete structure GET /api/carrito', async () => {
    const productoAgregado = {
      author: {
        'nombre': 'Buzo Retro Style',
        'valor': 7500,
      }
    }
    const carrito = await axios.post('http://localhost:8080/api/carrito', productoAgregado)
    console.log(carrito)
    expect(carrito.data._message).to.eql('Product validation failed')
  })
})