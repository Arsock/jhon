import { useState } from 'react';
import axios from 'axios';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ciudad: '',
    direccion: '',
    clave: '',
    rol: 'user'  // Rol predeterminado
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register-user', formData);
      setMessage('Usuario registrado correctamente.');
      console.log('Usuario registrado:', response.data);
      window.location.href = '/login'; // Redirigir a la página de inicio de sesión
    } catch (error) {
      setMessage('Error al registrar el usuario.');
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Clave:</label>
        <input
          type="password"
          name="clave"
          value={formData.clave}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar Usuario</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UserRegistrationForm;
