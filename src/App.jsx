import React from 'react'
import Productos from './components/Productos'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BuscadorDeProductos from './components/BuscadorDeProductos';
import { createGlobalStyle } from 'styled-components'
import Reviews from './components/Reviews';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import ProductosP from './components/ProductosP'
import Producto from './components/Producto'
import CartP from './components/CartP'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow:auto;
  &::-webkit-scrollbar {
    display: none; /* Esto oculta la barra de desplazamiento en navegadores WebKit */
  }
}
`;

// Definimos el contenedor
const App = () => {

  const [allProducts, setAllProducts] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [contP, setContP] = React.useState(0)

  return (
    
      <BrowserRouter>
      <Navbar
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        contP={contP}
        setContP={setContP} />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productosp" element={<ProductosP 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          contP={contP}
          setContP={setContP}/>} />
          <Route path="/cartp" element={<CartP 
          allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    contP={contP}
                    setContP={setContP} />} />
          <Route path="/buscadordeproductos" element={<BuscadorDeProductos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/reviews" element={<Reviews  />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/:id" element={<Producto 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          contP={contP}
          setContP={setContP}/>}/>
          <Route path="/cart" element={<Cart 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          contP={contP}
          setContP={setContP} />} />
        
        </Routes>
      </BrowserRouter>
  )
}

export default App