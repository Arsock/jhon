"use client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HeaderMain from '../componentes/header';

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get('/api/ordenes');
        setOrdenes(response.data);
      } catch (error) {
        console.error('Error fetching ordenes:', error);
      }
    };

    fetchOrdenes();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post('/api/update-status', { orderId, newStatus });
      if (response.status === 200) {
        setOrdenes((prevOrdenes) =>
          prevOrdenes.map((orden) =>
            orden.id === orderId ? { ...orden, estado: newStatus } : orden
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (<div>
    <HeaderMain/>
    <OrdenesContainer>
      <Title>Órdenes</Title>
      <OrdenesList>
        {ordenes.map((orden) => (
          <OrdenItem key={orden.id}>
            <OrderHeader>
              <OrderUser>{orden.nombre} {orden.apellido}</OrderUser>
              <OrderPhone>Teléfono: {orden.telefono}</OrderPhone>
              <OrderStatus>
                <StatusSelect
                  value={orden.estado}
                  onChange={(e) => handleStatusChange(orden.id, e.target.value)}
                >
                  <option value="en espera">En Espera</option>
                  <option value="en proceso">En Proceso</option>
                  <option value="finalizada">Finalizada</option>
                </StatusSelect>
              </OrderStatus>
            </OrderHeader>
            <OrderDetails>
              <OrderAddress>Dirección: {orden.direccion}</OrderAddress>
              <OrderDate>Fecha: {new Date(orden.fecha).toLocaleDateString()}</OrderDate>
              <OrderProducts>
                <ProductsList>
                  {JSON.parse(orden.productos).map((producto) => (
                    <ProductItem key={producto.id}>
                      <ProductName>{producto.nombreProducto}</ProductName>
                      <ProductQuantity>Cantidad: {producto.cantidad}</ProductQuantity>
                      <ProductSize>Talla: {producto.talla}</ProductSize>
                    </ProductItem>
                  ))}
                </ProductsList>
              </OrderProducts>
              <OrderTotal>Total: ${orden.total}</OrderTotal>
            </OrderDetails>
          </OrdenItem>
        ))}
      </OrdenesList>
    </OrdenesContainer>
    </div>
  );
}

// Estilos con styled-components
const OrdenesContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const OrdenesList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const OrdenItem = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 5px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderUser = styled.p`
  font-size: 1.2em;
  font-weight: bold;
`;

const OrderPhone = styled.p`
  font-size: 1em;
  margin: 0 10px;
`;

const OrderStatus = styled.div``;

const StatusSelect = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const OrderDetails = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const OrderAddress = styled.p`
  font-size: 1em;
  margin: 5px 0;
`;

const OrderDate = styled.p`
  font-size: 1em;
  margin: 5px 0;
`;

const OrderProducts = styled.div`
  margin-top: 10px;
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  margin-bottom: 5px;
`;

const ProductName = styled.p`
  font-size: 1em;
  margin: 0;
`;

const ProductQuantity = styled.p`
  font-size: 0.9em;
  margin: 0;
  color: #555;
`;

const ProductSize = styled.p`
  font-size: 0.9em;
  margin: 0;
  color: #555;
`;

const OrderTotal = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
`;
