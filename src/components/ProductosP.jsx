import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { data } from '../data';
import { useParams } from 'react-router-dom';

const cookies = new Cookies();

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  padding-top: 8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Image = styled.img`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 1rem;
`;

/*const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;*/

const ProductosP = ({allProducts, setAllProducts, contP, setContP, total, setTotal}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = cookies.get('username') ? true : false;
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
      if (!loggedIn) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes reemplazar esto con tu propio componente de carga
  }

  /*const onAddP = product => {
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
  };*/

  /*console.log(allProducts)*/

  const goToProduct = (id, category) => {
    navigate(`/${id}`, { state: { category } });
  };
  
  return isLoggedIn ? (
    <Section>
      {data.map(product => (
        <Container key={product.id}>
            <Title>{product.nameProduct}</Title>
            <Image width={'100px'} src={product.img} alt={product.nameProduct} />
            <Description>{product.description}</Description>
            <button onClick={() => goToProduct(product.id, product.category)}>Ver detalles</button>
        </Container>
      ))}
        <Link to="/productos">Productos</Link>
    </Section>
  ) : null;
};

export default ProductosP;