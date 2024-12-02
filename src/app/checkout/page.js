"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const IVA_RATE = 0.16;

export default function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState('');

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await axios.get('/api/carrito');
        setCarrito(response.data);

        const subtotalPrecio = response.data.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const ivaPrecio = subtotalPrecio * IVA_RATE;
        const totalPrecio = subtotalPrecio + ivaPrecio;

        setSubtotal(subtotalPrecio);
        setIva(ivaPrecio);
        setTotal(totalPrecio);
      } catch (error) {
        console.error('Error fetching carrito:', error);
        window.location.href = '/login';
      }
    };

    fetchCarrito();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleDeliveryInfoChange = (event) => {
    setDeliveryInfo(event.target.value);
  };

  const handleFinalizarCompra = async () => {
    try {
      const response = await axios.post('/api/finalizar-compra', {
        metodoPago: paymentMethod,
        entrega: deliveryInfo,
        productos: carrito,
        total
      });
      if (response.status === 200) {
        alert('Compra Finalizada!');
        // Redirigir a una página de confirmación o limpiar el estado del carrito
        setCarrito([]);
        setSubtotal(0);
        setIva(0);
        setTotal(0);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error finalizing purchase:', error);
    }
  };

  return (
    <CheckoutContainer>
      <Title>Finalizar Compra</Title>
      <ContentContainer>
        <PaymentAndDelivery>
          <SectionTitle>Métodos de Pago</SectionTitle>
          <PaymentOptions>
            <PaymentOption>
              <input 
                type="radio" 
                id="pagoMovil" 
                name="paymentMethod" 
                value="Pago Móvil" 
                onChange={() => handlePaymentMethodChange('Pago Móvil')}
              />
              <label htmlFor="pagoMovil">
                Pago Móvil
                <PaymentImage src="/path/to/pago-movil.png" alt="Pago Móvil" />
              </label>
            </PaymentOption>
            <PaymentOption>
              <input 
                type="radio" 
                id="efectivo" 
                name="paymentMethod" 
                value="Efectivo" 
                onChange={() => handlePaymentMethodChange('Efectivo')}
              />
              <label htmlFor="efectivo">
                Efectivo
                <PaymentImage src="/path/to/efectivo.png" alt="Efectivo" />
              </label>
            </PaymentOption>
          </PaymentOptions>
          <SectionTitle>Datos de Entrega</SectionTitle>
          <DeliveryInput 
            type="text" 
            placeholder="Introduce tu dirección" 
            value={deliveryInfo} 
            onChange={handleDeliveryInfoChange}
          />
          <SectionTitle>Contacto</SectionTitle>
          <ContactButton href="https://wa.me/tu-numero" target="_blank">
            <WhatsAppImage src="/path/to/whatsapp.png" alt="WhatsApp" />
            Contactar por WhatsApp
          </ContactButton>
          <FinalizarButton onClick={handleFinalizarCompra}>Finalizar Compra</FinalizarButton>
        </PaymentAndDelivery>
        <OrderSummary>
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
        </OrderSummary>
      </ContentContainer>
    </CheckoutContainer>
  );
}

// Estilos con styled-components
const CheckoutContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

const PaymentAndDelivery = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

const DeliveryInput = styled.input`
  padding: 10px;
  font-size: 1em;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #1ebe5b;
  }
`;

const WhatsAppImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const FinalizarButton = styled.button`
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

const OrderSummary = styled.div`
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
