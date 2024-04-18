import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProtectedComponent = () => {
    const navigate = useNavigate();
    const isLoggedIn = cookies.get('username') ? true : false;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <h1>Esta es una página protegida</h1> : null;
};

export default ProtectedComponent;