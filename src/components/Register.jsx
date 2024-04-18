import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MD5 from 'crypto-js/md5';

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
--input-focus: #2d8cf0;
--font-color: #323232;
--font-color-sub: #666;
--bg-color: beige;
--main-color: black;
padding: 20px;
background: lightblue;
display: flex;
flex-direction: column;
gap: 20px;
border-radius: 5px;
border: 2px solid var(--main-color);
box-shadow: 4px 4px var(--main-color);
width: 300px;
align-self: center;
`;
const Title = styled.h1`
color: var(--font-color);
font-weight: 900;
font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1.2em;
  color: #666;
`;

const Input = styled.input`
width: 250px;
height: 40px;
border-radius: 5px;
border: 2px solid var(--main-color);
background-color: var(--bg-color);
box-shadow: 4px 4px var(--main-color);
font-size: 15px;
font-weight: 600;
color: var(--font-color);
padding: 5px 10px;
outline: none;
&:focus {
  border: 2px solid var(--input-focus);
}
`;

const Button = styled.button`
margin: 50px auto 0 auto;
width: 120px;
height: 40px;
border-radius: 5px;
border: 2px solid var(--main-color);
background-color: var(--bg-color);
box-shadow: 4px 4px var(--main-color);
font-size: 17px;
font-weight: 600;
color: var(--font-color);
cursor: pointer;
&:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}
`;

const Subtitle = styled.h2`
color: var(--font-color-sub);
font-weight: 600;
font-size: 17px;
`

const Nhave = styled.p`
color: var(--font-color-sub);
font-weight: 600;
font-size: 17px;

`

function Register() {
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si el usuario ya existe
    axios.get(`https://nodejs-production-54536.up.railway.app/checkUser/${username}`)
      .then(response => {
        if (response.data.exists) {
          alert('El usuario ya existe');
        } else {
          const encryptedPassword = MD5(password).toString();
          // Enviar la información al servidor para inseratar la informacion del usuario en la database
          axios.post('https://nodejs-production-54536.up.railway.app/insertUser', { nombre, apellido, username, password: encryptedPassword })
            .then(response => {
              console.log('Success:', response.data);
              setNombre('');
              setApellido('');
              setUsername('');
              setPassword('');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (cookies.get('username')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Section>
    <Container>
      <Title>Registro</Title>
      <Subtitle>Registrate para continuar</Subtitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          <Input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder='Nombre'/>
        </Label>
        <Label>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='Username'/>
        </Label>
        <Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Contraseña'/>
        </Label>
        <Button type="submit">Enviar</Button>
      </Form>
      <Nhave style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>¿Ya tienes una cuenta?</Nhave>
      <Link to="/login" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Nhave>Iniciar sesion</Nhave></Link>
    </Container>
    </Section>
  );
}

export default Register;