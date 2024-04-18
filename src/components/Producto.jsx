import { useParams } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { data1 } from '../data1';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: ${props => props.backgroundColor || '#f9f2e7'};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const ProductName = styled.h1`
  font-family: 'Amatic SC', cursive;
  color: #d198c5;
  top: 0;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 768px) {

  }
`;

const Section = styled.div`
 display: flex;
 justify-content: space-between;
 @media (max-width: 768px) {
  flex-direction: column;

}
`

const Description = styled.p`
  color: #333;
`;

const Price = styled.p`
  font-weight: bold;
  color: #333;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #d198c5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b376ad;
  }
`;

  
    const Producto = ({allProducts, setAllProducts, contP, setContP, total, setTotal}) => {
      const { id } = useParams(); // Extrae el id de la URL
      const [productId, setProductId] = useState(Number(id));
      const location = useLocation();
      const [category, setCategory] = useState(location.state.category);
      const routeCategory = location.state.category; // Accede a category desde el estado de la ruta
      const cookies = new Cookies();
      const [username, setUsername] = useState(cookies.get('username'));
      console.log(category);
      console.log(username);


      useEffect(() => {
        setProductId(Number(id)); // Actualiza productId cuando el id de la URL cambia
      }, [id]);
    
      const producto = data1.find(p => p.id === productId && p.category === routeCategory );
    
      // Si no se encuentra el producto, muestra un mensaje de error
      if (!producto) {
        return <div>Producto no encontrado</div>;
      }
    
      const incrementId = () => {
        const nextProduct = data1.find(p => p.id === productId + 1 && p.category === routeCategory);
        if (!nextProduct) {
          setProductId(1);
        } else {
          setProductId(productId + 1);
        }
      };
    
      const decrementId = () => {
        const prevProduct = data1.find(p => p.id === productId - 1 && p.category === routeCategory);
    
        if (!prevProduct) {
          const maxId = Math.max(...data1.filter(p => p.category === routeCategory).map(p => p.id));
          setProductId(maxId);
        } else {
          setProductId(productId - 1);
        }
      };

      const onAddP = product => {
        if(allProducts.find(item => item.id === product.id)){
          const products = allProducts.map(item => item.id === product.id 
            ? {...item, quantity: item.quantity + 1} : item)
            setContP(contP + product.quantity)
            setTotal(total + product.price * product.quantity)
            return setAllProducts([...products])
        }
    
        setTotal(total + product.price * product.quantity)
        setContP(contP + product.quantity)
        setAllProducts([...allProducts, product])
      };

      //Hacer la reserva de un producto
      const reservation = () => {
        axios.post('https://nodejs-production-54536.up.railway.app/makeReservation', { productId, category, username})
        .then(response => {
          console.log('Success:', response.data);
          setProductId(producto.id);
          setCategory(producto.category);
          setUsername(cookies.get('username'));
          console.log(cookies.get('username'))
          console.log(producto.category)
          console.log(producto.id)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }

      return (
<Container backgroundColor={producto.background}>
<ProductName>{producto.nameProduct}</ProductName>
  <Section>
  <ProductImage src={producto.img} alt={producto.nameProduct} />
  <Aside>
    <Description>{producto.description}</Description>
    <Price>{producto.price}</Price>
    <ButtonContainer>
    <Button onClick={() => incrementId()}>Siguiente producto</Button>
    <Button onClick={() => decrementId()}>Producto anterior</Button>
    <Button onClick={() => reservation()}>Reserva</Button>
    <Button onClick={() => onAddP(producto)}>Agregar al carrito</Button>
  </ButtonContainer>
  </Aside>
  </Section>
</Container>
      );
    };
    
export default Producto;