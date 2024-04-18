import React from 'react'
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f2e7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  padding-top: 8rem;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.h2`
  font-family: 'Amatic SC', cursive;
  color: #d198c5;
  margin-bottom: 10px;
`;

const ProductQuantity = styled.p`
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
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

const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const ClearCartButton = styled.button`
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

const BuyButton = styled.button`
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

// Para hacerlo reactivo, puedes agregar media queries a los estilos que necesiten ajustarse en pantallas más pequeñas


const Cart = ({allProducts, setAllProducts, total, contP, setContP, setTotal}) => {

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

const goToProduct = (id, category) => {
  navigate(`/cart`);
};
 
    return (
      <Container>
      {
        allProducts.length ? (
          <>
            {allProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductName>{product.nameProduct}</ProductName>
                <ProductQuantity>Cantidad: {product.quantity}</ProductQuantity>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>${product.price}</ProductPrice>
                <DeleteButton onClick={() => onDeleteProduct(product)}>Eliminar</DeleteButton>
              </ProductCard>
            ))}
            <TotalPrice>Total: ${total}</TotalPrice>
            <ClearCartButton onClick={onClearCart}>Vaciar carrito</ClearCartButton>
            <BuyButton>Comprar</BuyButton>
          </>
        ) : (
          <p>No hay productos en el carrito</p>
        )
      }
    </Container>
  )
}


export default Cart