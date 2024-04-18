import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { data } from '../data';
import { useParams } from 'react-router-dom';

const cookies = new Cookies();


const Container = styled.div`
  width: 100%;
  height: 100vh;
  --color: #faa7d8;
  background: linear-gradient(45deg, var(--color) 25%, transparent 25%) -50px 0,
        linear-gradient(-45deg, var(--color) 25%, transparent 25%) -50px 0,
        linear-gradient(45deg, transparent 75%, var(--color) 75%) -50px 0,
        linear-gradient(-45deg, transparent 75%, var(--color) 75%) -50px 0;
  background-color: #e5e5f7;
  background-size: 10px 40px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const Container1 = styled.div`
--font-color: #323232;
--bg-color: #e0e0e0;
width: 250px;
height: 350px;
border-radius: 20px;
background: var(--bg-color);
box-shadow: -9px 9px 18px #5a5a5a,
            9px -9px 18px #ffffff;
display: flex;
flex-direction: column;
transition: .4s;
position: relative;
align-items: center;
padding: 10px;
margin-bottom: 2rem;

&:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 10px 2px #5a5a5a;
}

@media (max-width: 768px) {
  width: 100%;
  margin-top: 5rem;
}

`;

const Title = styled.h3`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Image = styled.img`
width: 100px;
border-radius: 20px;
`;

const ImageC = styled.div`
width: 100%;
border-radius: 20px;
justify-content: center;
display: flex;
`;

const Description = styled.p`
  margin-bottom: 1rem;
`;

const Button = styled.button`
padding: 0.8em 1.7em;
display: block;
margin: 10% auto;
border-radius: 25px;
border: none;
font-weight: bold;
background: #ffffff;
color: rgb(0, 0, 0);
transition: .4s ease-in-out;

&: hover {
  background: black;
  color: white;
  cursor: pointer;
}

`

const Productos = ({allProducts, setAllProducts, contP, setContP, total, setTotal}) => {
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

  const goToProduct = (id, category) => {
    navigate(`/${id}`, { state: { category } });
  };
  
  return isLoggedIn ? (
    <Container>
      
    <Section>
      {data.map(product => (
        <Container1 key={product.id}>
          <ImageC><Image width={'100px'} src={product.img} alt={product.nameProduct} /></ImageC>
            <Title>{product.nameProduct}</Title>
            <Description>{product.description}</Description>
            <Button onClick={() => goToProduct(product.id, product.category)}>Ver detalles</Button>
        </Container1>
      ))}
    </Section>
    </Container>
  ) : null;
};

export default Productos;