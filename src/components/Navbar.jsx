import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BuscadorDeProductos from './BuscadorDeProductos';
import { useState, useEffect, useRef } from 'react';
import { data } from '../data';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./Navbar.css";

const Section = styled.div`
position: relative;
display: flex;
border-radius: 10px;
background-color: #f9f2e7;
font-size: 14px;
border: 1px solid #black;
height: 70px;
@media (max-width: 768px) {
  height: 50px;
  position: fixed;
  z-index: 1000;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
  rgba(245, 73, 144, 0.5) 5px 10px 15px; 
}

`;

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 100%;
        background-color: gray;
        justify-content: space-between;
        height: 70px;
    }
    
`;

const Logo = styled.img`
    height: 70px;
    padding: 10px;
    padding-right:40px;
    padding-left: 40px;
    cursor: pointer;
    @media (max-width: 768px) {
      pdding-right: 0px;
    }
`;

const Title = styled(Link)`
    font-family: 'Jacques Francois Shadow';
    font-size: 30px;
    color: #935544;
    cursor: pointer;
    text-decoration: none;
    @media (max-width: 768px){
      padding-right:40px;
      padding-left: 0px;
    }
`;

const IconP = styled.img`
    width: 40px;
    cursor: pointer;
    padding-left: 15px;
    @media (max-width: 768px) {
      padding-right: 15px;
      padding-left: 0px;
    }
`;

const IconP1 = styled.img`
    display: none;
    @media (max-width: 768px) {
      display: flex;
      padding-right: 15px;
      width: 40px;
      cursor: pointer;
    }
`;

const Container2 = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
    padding-right: 20px;
    @media (max-width: 768px) {
        display: none;
      
    }
`;

const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;


const List = styled.ul`
    display: flex;  
    gap: 20px;
    list-style: none;

    @media (max-width: 768px) {
        flex-direction: column;
        display: ${props => props.isOpen ? 'flex' : 'none'};
    }
`;

const ListItem = styled.li`
    cursor: pointer;
    text-decoration: none;
`;

const Icon = styled.img`
    width: 20px;
    cursor: pointer;
`;


const Li = styled(Link)`
    font-family: 'Jaldi', sans-serif;
    font-size: 20px;
    color: #935544;
    width: 20px;
    cursor: pointer;
    text-decoration: none;
`;



const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  border-radius: 10px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Button = styled.button`
    width: 100px;
    padding: 10px 0;
    background-color: #da4ea2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  width: 200px; // Ajusta este valor según tus necesidades
`;

const ProductName = styled.h2`
  font-size: 14px; // Ajusta este valor según tus necesidades
  margin-bottom: 2px; // Ajusta este valor según tus necesidades
`;
const ProductQuantity = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductDetails = styled.p`
  font-size: 12px; // Ajusta este valor según tus necesidades
  margin-bottom: 2px; // Ajusta este valor según tus necesidades
`;


const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ClearCartButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  width: auto; // Ajusta este valor según tus necesidades
  height: 200px; // Ajusta este valor según tus necesidades
  overflow-y: auto; // Esto hace que el contenedor sea desplazable

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Example = styled.div`
  display: none;
@media (max-width: 768px) {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f9f2e7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0 10px;
}
`;

const ListItem1 = styled.div`
  display: flex;
`;

const Li1 = styled(Link)`
  font-family: 'Amatic SC', cursive;
  color: #d198c5;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    color: #b376ad;
  }
`;

const Container3 = styled.div`
display: none;

@media screen and (max-width: 768px){
  position: fixed;
  z-index: 1000;
  bottom: 0;
  display: flex;
  background-color: rgba(245, 73, 144);
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
        rgba(245, 73, 144, 0.5) 5px 10px 15px; 
}
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: none;
  background-color: #F6D2C4;
` 
const Circle1 = styled.div`
display: flex;
justify-content: center;
width: 15px;
border-radius: 100%;
border: none;
background-color: #f9f2e7;
`
const cookies = new Cookies();


const Navbar = ({allProducts, setAllProducts, total, contP, setContP, setTotal}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const username = cookies.get('username');

    const onDeleteProduct = product => {

        const results = allProducts.filter(
            item => item.id !== product.id
        )

        setTotal(total - product.price * product.quantity)
        setContP(contP - product.quantity)
        setAllProducts(results)
    }

    const onClearCart = () => {
        setTotal(0)
        setContP(0)
        setAllProducts([])
    }

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    const goToProduct = () => {
      navigate(`/cart`);
    };


    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  return (
    //Creamos un contenedor para el nav4
    <Section>
      
    <Container>
        <Link to="/" ><Logo src="./img/Logo.jpeg" alt="Logo"></Logo></Link>
        <Title to="/" style={{}}>Cake House</Title>
        {
        !username > 0 ? 
          <Link to="/profile" ><IconP1 src="./img/profile-not.png" alt="Imagen con productos"/></Link>
          : 
          <Link to="/profile" ><IconP1 src="./img/profile.png" alt="Imagen sin productos"/></Link>
        }

    </Container>
  <Container2>
    <List className='menu'>
        <button >
        <p class='text'><Li to="/productos">Productos</Li></p>
        </button>
        <button >
        <p class='text'><Li to="/reviews">Reviews</Li></p>
        </button>
        <button >
        <p class='text'><Li to="/aboutus">About Us</Li></p>
        </button>
        <BuscadorDeProductos />
            <div>
              <Circle>
  <Circle1>{contP}</Circle1>
  {
  contP > 0 ? 
    <Icon src="./img/cart-1.png" alt="Imagen con productos" onClick={toggleMenu}/> 
  : 
    <Icon src="./img/cart-2.png" alt="Imagen sin productos" onClick={toggleMenu}/>
  }
  </Circle>
  <DropdownMenu isOpen={isOpen} ref={dropdownRef}>
    {
    allProducts.length ? (
      <div>
      <ProductsContainer>
        {allProducts.map(product => (
          <Product key={product.id}>
            <ProductName>{product.nameProduct}</ProductName>
            <ProductDetails>Cantidad: {product.quantity}</ProductDetails>
            <ProductDetails>Precio: ${product.price}</ProductDetails>
            <DeleteButton onClick={() => onDeleteProduct(product)}>Eliminar</DeleteButton>
          </Product>
        ))}
      </ProductsContainer> 
      <TotalPrice>Total: ${total}</TotalPrice>
      <ProductQuantity>Cantidad de productos: {contP}</ProductQuantity>
      <ClearCartButton onClick={onClearCart}>Vaciar carrito</ClearCartButton>
      <BuyButton onClick={goToProduct}>Comprar</BuyButton>
    </div>
    ) : (
      <p>No hay productos</p>
    )
    }
  </DropdownMenu>
  </div>
        </List>
        {
        !username > 0 ? 
          <Link to="/profile" ><IconP src="./img/profile-not.png" alt="Imagen con productos"/></Link>
          : 
          <Link to="/profile" ><IconP src="./img/profile.png" alt="Imagen sin productos"/></Link>
        }
    </Container2>

      <Container3 class="button-container">
      <button class="button">
      <Li to="/productos"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" stroke-width="0" fill="currentColor" stroke="currentColor" class="icon">
          <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a6Li3.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
        </svg>
        </Li>
      </button>
      <button class="button">
        <Li to='/productos'>
        <Icon src="./img/Productos.png"></Icon>
        </Li>
      </button>
      <button class="button">
      <Li to="/reviews">
        <Icon src="./img/Reviews.png"></Icon>
        </Li>
      </button>

      <button class="button">
        <Li to='/cart'>
        {
        contP > 0 ? 
          <Icon src="./img/cart-1.png" alt="Imagen con productos" onClick={toggleMenu}/> 
        : 
          <Icon src="./img/cart-2.png" alt="Imagen sin productos" onClick={toggleMenu}/>
        }
        </Li>
      </button>
    </Container3>
    
    </Section>
  )
}

export default Navbar