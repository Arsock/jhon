import React from 'react';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  const handleClick = () => {
    window.location.href = `/producto/${product.id}`;
  };

  return (
    <CardContainer onClick={handleClick}>
      <ProductImage src={`/image/products/${product.imagen}`} alt={product.nombre} />
      <ProductInfo>
        <ProductName>{product.nombre}</ProductName>
        <ProductCategory>{product.categoria}</ProductCategory>
        <ProductPrice>{`$${product.precio}`}</ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;

// Estilos con styled-components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductInfo = styled.div`
  padding: 16px;
  text-align: center;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const ProductCategory = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #777;
`;

const ProductPrice = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: #007bff;
`;
