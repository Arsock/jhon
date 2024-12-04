import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const HeaderMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('/api/get-token');
        if (response.status === 200 && response.data.decoded) {
          setIsAuthenticated(true);
          setUserRole(response.data.decoded.role); // Obtener el rol del usuario directamente de la respuesta
        }
      } catch (error) {
        console.log('Error al verificar el token:', error);
      }
    };

    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setIsAuthenticated(false);
      setUserRole('');
      window.location.href = '/login';
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const handleScrollToProducts = () => {
    const section = document.getElementById('productos-disponibles');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderContainer>
      <Logo src="/image/logo.png" alt="Logo" />
      <NavLinks>
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="#" onClick={handleScrollToProducts}>Contacto</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink href="/carrito">Carrito</NavLink>
            {userRole === 'admin' && (
              <>
                <NavLink href="/ordenes">Órdenes</NavLink>
                <NavLink href="/gestion">Gestión de Usuarios</NavLink>
              </>
            )}
            <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
          </>
        ) : (
          <>
            <NavLink href="/login">Iniciar sesión</NavLink>
            <NavButton href="/signup">Empezar</NavButton>
          </>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default HeaderMain;

// Estilos con styled-components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f8f9fa;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight:600;
  color: #0086D7;
  &:hover {
    color: #0056b3;
  }
  cursor: pointer; /* Asegúrate de que el cursor sea una mano cuando se pasa por encima */
`;

const NavButton = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height:40px;
  border: none;
  background-color: #0086D7;
  color: white;
  border-radius: 10px;
  font-weight:600;
  text-decoration: none;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #17a2b8;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #138496;
  }
`;

const ShowCookieButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #6c757d;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
`;
