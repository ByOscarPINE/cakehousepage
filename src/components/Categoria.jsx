import { useParams } from 'react-router-dom';
import React from 'react';
import { data1 } from '../data1';

function Categoria() {
    const { id } = useParams();
    
    // Busca el producto en tus datos
    const producto = data1.find(p => p.id === Number(id));

    // Si no se encuentra el producto, muestra un mensaje de error
    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div>
            <h1>{producto.nameProduct}</h1>
            <p>{producto.description}</p>
            <p>{producto.ingredients}</p>
            {/* Renderiza otros detalles del producto aquí */}
        </div>
    );
}

export default Categoria;