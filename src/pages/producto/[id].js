import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { openDb } from '../../app/db';
import HeaderMain from '@/app/componentes/header';

const Producto = ({ product }) => {
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (product) {
      setLoadedProduct(product);
    } else {
      window.location.href = '/error'; // Redirigir a una página de error personalizada
    }
  }, [product]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: loadedProduct.id, quantity: parseInt(quantity) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Producto agregado al carrito exitosamente.');
      } else {
        setMessage(data.error || 'Error al agregar el producto al carrito.');
      }
    } catch (error) {
      setMessage('Error al agregar el producto al carrito.');
    }
  };

  if (!loadedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContainer>
      <HeaderMain/>
      <ProductImage src={`/image/products/${loadedProduct.imagen}`} alt={loadedProduct.nombre} />
      <ProductInfo>
        <ProductName>{loadedProduct.nombre}</ProductName>
        <ProductCategory>{loadedProduct.categoria}</ProductCategory>
        <ProductPrice>{`$${loadedProduct.precio}`}</ProductPrice>
        <ProductSizes>{loadedProduct.tallas}</ProductSizes>
        <QuantityInput
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <AddToCartButton onClick={handleAddToCart}>Agregar al Carrito</AddToCartButton>
        {message && <Message>{message}</Message>}
      </ProductInfo>
    </ProductContainer>
  );
};

export async function getStaticPaths() {
  const db = await openDb();
  const products = await db.all('SELECT id FROM productos');

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const db = await openDb();
  const product = await db.get('SELECT * FROM productos WHERE id = ?', [params.id]);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product } };
}

export default Producto;

// Estilos con styled-components
const ProductContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductName = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
`;

const ProductCategory = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #555;
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  color: #007bff;
`;

const ProductSizes = styled.p`
  font-size: 1em;
  color: #333;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  margin: 10px 0;
  font-size: 1em;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: #007bff;
`;
