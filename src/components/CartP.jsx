import React from 'react'
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const CartP = ({allProducts, setAllProducts, total, contP, setContP, setTotal}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
  return (
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
      <p>No hay productossfsfsdfzcx</p>
    )
    }
  </DropdownMenu>
  )
}

export default CartP