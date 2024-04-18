import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f9f2e7;

  @media (max-width: 768px) {
    margin-top: 70px;
    padding: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #d198c5;
  font-family: 'Amatic SC', cursive;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextArea = styled.textarea`
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  resize: none;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: #d198c5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;

  @media (max-width: 768px) {
    width: 80px;
    height: 25px;
  }
`;

const Review = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #d198c5;

  @media (max-width: 768px) {
    margin-top: 10px;
    padding: 5px;
  }
`;

const Name = styled.p`
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Comment = styled.p`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Reviews = () => {
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const cookies = new Cookies();
  const [name, setName] = useState(cookies.get('nombre') || 'fgh');
  const [lastName, setLastName] = useState(cookies.get('apellido') || 'fgh');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !lastName) {
          alert('Nombre o apellido no proporcionados');
          return;
        }

  axios.post('https://nodejs-production-54536.up.railway.app/insertReview', { comment, name, lastName })
  .then(response => {
    if (response.data.success) {
      alert('Comentario enviado con éxito');
      setComment('');
      setName('');
      setLastName('');
    } else {
      alert('Error al enviar el comentario');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    };


    const fetchReviews = () => {
      axios.get('https://nodejs-production-54536.up.railway.app/getReviews')
        .then(response => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    useEffect(() => {
      fetchReviews();
    }, []);


    return (
      <Container>
        
      <MainContent>
          <Title>Comentarios</Title>
          <Form onSubmit={handleSubmit}>
              <TextArea 
                  value={comment} 
                  onChange={e => setComment(e.target.value)} 
                  placeholder="Escribe tu comentario aquí"
              />
              <Button type="submit">Enviar</Button>
          </Form>
          <div>
              {reviews.map((review, index) => (
                  <Review key={index}>
                      <Name>{review.name} {review.lastName}</Name>
                      <Comment>{review.comment}</Comment>
                  </Review>
              ))}
          </div>
      </MainContent>
  </Container>
    );
};

export default Reviews;