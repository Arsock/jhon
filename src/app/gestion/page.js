"use client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HeaderMain from '../componentes/header';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setName(user.nombre);
    setLastName(user.apellido);
    setEmail(user.email);
    setPhone(user.telefono);
    setAddress(user.direccion);
    setRole(user.rol);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('/api/update-user', {
        id: selectedUser.id,
        nombre: name,
        apellido: lastName,
        email,
        telefono: phone,
        direccion: address,
        rol: role
      });
      if (response.status === 200) {
        alert('Cambios guardados correctamente');
        setUsuarios(usuarios.map((user) => (user.id === selectedUser.id ? response.data : user)));
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
  <div>
    <HeaderMain/>
    <GestionUsuariosContainer>
      <Title>Gestión de Usuarios</Title>
      <UsuariosList>
        {usuarios.map((usuario) => (
          <UsuarioItem key={usuario.id} onClick={() => handleUserSelect(usuario)}>
            {usuario.nombre} {usuario.apellido} ({usuario.email})
          </UsuarioItem>
        ))}
      </UsuariosList>
      {selectedUser && (
        <UserDetails>
          <h2>Detalles del Usuario</h2>
          <Label>Nombre:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Label>Apellido:</Label>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>Teléfono:</Label>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Label>Dirección:</Label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Label>Rol:</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </Select>
          <SaveButton onClick={handleSaveChanges}>Guardar Cambios</SaveButton>
        </UserDetails>
      )}
    </GestionUsuariosContainer>
    </div>
  );
}

// Estilos con styled-components
const GestionUsuariosContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const UsuariosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const UsuarioItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #218838;
  }
`;
