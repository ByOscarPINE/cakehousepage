import React from 'react'
import styled from 'styled-components'
import "./Home.css"

const Container = styled.div`
height: 100vh;
background: url("./img/hx.svg");
background-size: cover;
scroll-snap-align: center;
scroll-snap-type: y mandatory;
scroll-behavior: smooth;
overflow-y: scroll;
scrollbar-width: none;
display: flex;
`;

const Aside = styled.div`
width: 50%;
height: 100vh;
background-color: transparent;
`
const Aside1 = styled.div`
width: 50%;
height: 100vh;
background-color: transparent;
`

const Horario = styled.div`
  background-color: #f9f2e7;
  border-radius: 10px;
  margin-top: 75%;
  margin-left: 5%;
  width: 40%;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Subsection = styled.div`
  margin-top: 25%;
  padding: 20px;
  width: 50%;
  margin-left: 25%;
  background-color: #f9f2e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`

const Subsection1 = styled.div`
  width: 50%;
  margin-top: 30%;
  margin-left: 50%;
`

const Img = styled.img`
  width: 20px;
`

const Button = styled.button`
padding: 15px 25px;
border: unset;
border-radius: 15px;
color: #212121;
z-index: 1;
background: #e8e8e8;
position: relative;
font-weight: 1000;
font-size: 17px;
-webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
transition: all 250ms;
overflow: hidden;

&:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms
}

&:hover {
  color: #e8e8e8;
}

&:hover:before {
  width: 100%;
}


`

const Home = () => {
  return (
    <Container>
      <Aside>
        <Horario>
          <h1>Horario</h1>
          <p>Lunes a Viernes: 8:00am - 6:00pm</p>
          <p>Sabado: 8:00am - 2:00pm</p>
          <p>Domingo: Cerrado</p>
        </Horario>
      </Aside>
      <Aside1>
        <Subsection>
        <p>Family</p>
        <h3>Everyone Loves It !</h3>
        <h1>CAKE</h1>
        <h1>HOUSE</h1>
        <p>Los mejores pasteles de la ciudad</p>
        <Button> Click me!</Button>
        </Subsection>
        <Subsection1>
        <p>Informes: 9511234567</p>
        <p>Ubicanos en este enlace : <Img src='./img/gomaps.png'></Img></p>
        </Subsection1>
      </Aside1>
    </Container>
  )
}

export default Home