import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import { data1 } from '../data1';
import './buscador.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./BuscadorDeProductos.css";


const BuscadorDeProductos = () => {
    const [consulta, setConsulta] = useState('');
    const navigate = useNavigate();

    const handleChange = event => {
        setConsulta(event.target.value);
    };

    const productos = data1.productos;

    const goToProduct = (id, category) => {
      navigate(`/${id}`, { state: { category } });
    };
    


    const resultadosDeBusqueda = consulta
    ? data1.filter(producto =>  
      producto.nameProduct.toLowerCase().includes(consulta.toLowerCase())
      )
    : [];
    
    
    return (
        <div className='BusquedaDesplegable'>
      <div class="textInputWrapper">
    <input placeholder="Buscar productos" 
    type="text" 
    class="textInput"
    value={consulta}
    onChange={handleChange}/>
</div>

      <ul>
          {resultadosDeBusqueda.map(producto => (
          <li key={producto.id}>
            <Link to={{ pathname: `/${producto.id}`, state: { category: producto.category} }}>{producto.nameProduct}<p>{producto.description}</p></Link>
            
            <button onClick={() => goToProduct(producto.id, producto.category)}>Ver detalles</button>
          </li>
        ))}
      </ul>
    </div>
    );
};

export default BuscadorDeProductos;