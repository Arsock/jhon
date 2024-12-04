"use client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HeaderMain from '../componentes/header';

const IVA_RATE = 0.16;

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await axios.get('/api/carrito');
        setCarrito(response.data);

        // Calcular el subtotal, IVA y total del precio
        const subtotalPrecio = response.data.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const ivaPrecio = subtotalPrecio * IVA_RATE;
        const totalPrecio = subtotalPrecio + ivaPrecio;

        setSubtotal(subtotalPrecio);
        setIva(ivaPrecio);
        setTotal(totalPrecio);
      } catch (error) {
        console.error('Error fetching carrito:', error);
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión si hay un error de autenticación
      }
    };

    fetchCarrito();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.post('/api/remove-from-cart', { productId });
      if (response.status === 200) {
        setCarrito((prevCarrito) => prevCarrito.filter(item => item.idProducto !== productId));
        // Actualizar el subtotal, IVA y total después de eliminar un producto
        const updatedCarrito = carrito.filter(item => item.idProducto !== productId);
        const updatedSubtotal = updatedCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const updatedIva = updatedSubtotal * IVA_RATE;
        const updatedTotal = updatedSubtotal + updatedIva;

        setSubtotal(updatedSubtotal);
        setIva(updatedIva);
        setTotal(updatedTotal);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCheckout = () => {
    // Redirigir a la página de finalización de compra o realizar una acción específica
    window.location.href = '/checkout'; // Suponiendo que tienes una página de checkout
  };

  return (
  <div>
    <HeaderMain/>
    <CarritoContainer>
      <Title>Carrito de Compras</Title>
      <ContentContainer>
        <CartList>
          {carrito.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <ItemImage src={`/image/products/${item.imagen}`} alt={item.nombreProducto} />
                <ItemInfo>
                  <ItemName>{item.nombreProducto}</ItemName>
                  <RemoveButton onClick={() => handleRemoveFromCart(item.idProducto)}>Eliminar</RemoveButton>
                </ItemInfo>
              </ItemDetails>
              <ItemPrice>{`$${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}`}</ItemPrice>
            </CartItem>
          ))}
        </CartList>
        <SummaryContainer>
          <SummaryItem>
            <SummaryLabel>Subtotal:</SummaryLabel>
            <SummaryValue>{`$${subtotal.toFixed(2)}`}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>IVA (16%):</SummaryLabel>
            <SummaryValue>{`$${iva.toFixed(2)}`}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Total:</SummaryLabel>
            <SummaryValue>{`$${total.toFixed(2)}`}</SummaryValue>
          </SummaryItem>
          <CheckoutButton onClick={handleCheckout}>Finalizar Compra</CheckoutButton>
        </SummaryContainer>
      </ContentContainer>
    </CarritoContainer>
    </div>
  );
}

// Estilos con styled-components
const CarritoContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #0174BB;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

const CartList = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: auto;
`;

const ItemInfo = styled.div`
  margin-left: 20px;
  text-align: left;
`;

const ItemName = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 1em;
  color: #777;
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const SummaryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
`;

const SummaryLabel = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

const SummaryValue = styled.p`
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
  color: #007bff;
`;

const CheckoutButton = styled.button`
  width:65%;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0174BB;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #078DDF;
  }
`;
