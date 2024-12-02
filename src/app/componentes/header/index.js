import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const HeaderMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('/api/get-token');
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Error al verificar el token:', error);
      }
    };

    checkToken();
  }, []);

  const showCookie = async () => {
    try {
      const response = await axios.get('/api/get-token');
      console.log('Cookie desencriptada:', response.data);
    } catch (error) {
      console.log('Error al obtener la cookie desencriptada:', error);
    }
  };

  return (
    <HeaderContainer>
      <Logo src="/path/to/your/logo.png" alt="Logo" />
      <SearchContainer>
        <SearchInput type="text" placeholder="Buscar..." />
        <SearchButton>Buscar</SearchButton>
      </SearchContainer>
      <NavLinks>
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/contact">Contacto</NavLink>
        {isAuthenticated ? (
          <>
          <NavLink href="/profile">
            <UserButton>Usuario</UserButton>
          </NavLink>
        <NavLink href="/carrito">
          <UserButton>Carrito</UserButton>
        </NavLink>
        </>
        ) : (
          <>
            <NavLink href="/login">Iniciar sesión</NavLink>
            <NavButton href="/signup">Empezar</NavButton>
          </>
        )}
      </NavLinks>
      <ShowCookieButton onClick={showCookie}>Mostrar Cookie</ShowCookieButton>
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
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.img`
  height: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px 0 0 3px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const NavButton = styled.a`
  padding: 5px 10px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    background-color: #218838;
  }
`;

const UserButton = styled.button`
  padding: 5px 10px;
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
