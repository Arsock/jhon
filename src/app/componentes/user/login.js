import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    clave: ''
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
      const response = await axios.post('/api/login-user', formData);
      setMessage('Inicio de sesión exitoso.');
      console.log('Usuario logueado:', response.data);
      window.location.href = '/'; // Redirigir a la página de inicio
    } catch (error) {
      setMessage('Error al iniciar sesión. Verifique sus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Clave:</label>
        <input
          type="password"
          name="clave"
          value={formData.clave}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
