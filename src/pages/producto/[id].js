import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { openDb } from '../../app/db';
import HeaderMain from '@/app/componentes/header';
import "../../app/globals.css"

const Producto = ({ product }) => {
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (product) {
      setLoadedProduct(product);
      setSelectedSize(product.tallas.split(',')[0]); // Seleccionar la primera talla por defecto
    } else {
      window.location.href = '/error'; // Redirigir a una página de error personalizada
    }
  }, [product]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: loadedProduct.id, quantity: parseInt(quantity), size: selectedSize }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/carrito"
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
    <div>
      <HeaderMain/>
      <ProductContainer>
        <ProductImage src={`/image/products/${loadedProduct.imagen}`} alt={loadedProduct.nombre} />
        <ProductInfo>
          <ProductName>{loadedProduct.nombre}</ProductName>
          <ProductCategory>{loadedProduct.categoria}</ProductCategory>
          <ProductPrice>{`$${loadedProduct.precio}`}</ProductPrice>
          <ProductSizes>
            <label htmlFor="size-select">Seleccionar talla:</label>
            <SizeSelect id="size-select" value={selectedSize} onChange={handleSizeChange}>
              {loadedProduct.tallas.split(',').map((size) => (
                <option key={size.trim()} value={size.trim()}>{size.trim()}</option>
              ))}
            </SizeSelect>
          </ProductSizes>
          <ProductSizes>
          <label>Cantidad:</label>
          <QuantityInput
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          </ProductSizes>
          <AddToCartButton onClick={handleAddToCart}>Agregar al Carrito</AddToCartButton>
          {message && <Message>{message}</Message>}
        </ProductInfo>
      </ProductContainer>
    </div>
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
  display: flex;
  justify-content:center;
  gap:30px
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 20px
`;

const ProductInfo = styled.div`
  display:flex;
  flex-direction: column;
  width: 600px;
`;

const ProductName = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  text-align:start;
`;

const ProductCategory = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #555;
  text-align:start;
`;

const ProductPrice = styled.p`
  font-size: 2em;
  color: #0174BB;
  font-weight:600;
  text-align:start;
  margin: 10px 0;
`;

const ProductSizes = styled.div`
  font-size: 1em;
  color: #333;
  text-align:start;
`;

const SizeSelect = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  padding: 15px 20px;
  width: 400px;
  margin: 40px 0;
  font-size: 20px;
  background-color: #0174BB;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #078DDF;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: #007bff;
`;
