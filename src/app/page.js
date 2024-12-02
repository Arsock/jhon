"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './componentes/producCard/ProductCard';
import HeaderMain from './componentes/header';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get('/api/init');
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <HomeContainer>
      <HeaderMain />
      <h1>Productos Disponibles</h1>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </HomeContainer>
  );
}

// Estilos con styled-components
const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;
