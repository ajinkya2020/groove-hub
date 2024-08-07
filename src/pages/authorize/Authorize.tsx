import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authorize = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      console.log(hash);
      
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      console.log(token);
      
      window.localStorage.setItem('token', token);
      window.location.hash = '';
    }

    navigate('/');
  }, [location]);

  return null;
}
