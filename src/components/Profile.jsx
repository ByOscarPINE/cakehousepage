import React from 'react'
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
`;

const Cart = styled.div`
  margin: 20px 0;
  font-size: 1.2em;
  color: #666;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #333;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.2em;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    color: #666;
  }
`;

const cookies = new Cookies();

const Profile = () => {
 

  const username = cookies.get('username');
  const name = cookies.get('nombre');

  const cerrarSesion = () => {
    cookies.remove('username', { path: '/' });
    cookies.remove('nombre', { path: '/' });
    window.location.href="./login";
}

  return (
    <Container>
      <ContainerMain>
        <Title>Bienvenido, {name}</Title>
        {
        !username > 0 ?(
          <>
            <StyledLink to="/register">Registrarse</StyledLink>
            <StyledLink to="/login">Iniciar sesión</StyledLink> 
          </>
        ) : <Button onClick={cerrarSesion}>Cerrar Sesión</Button>}
      </ContainerMain>
    </Container>
  )
}

export default Profile