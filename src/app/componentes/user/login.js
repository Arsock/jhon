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
    <div style={{display:"flex", justifyContent:"center", margin:"20px 0 0 0"}}>
    <form onSubmit={handleSubmit} style={{ borderRadius:"10px", height:"400px", display:"flex", flexDirection:"column", width:"500px", padding:"20px", gap:"30px", border:"2px solid #0174BB"}}>
      <h1 style={{color:"#0174BB"}}>Inicio de sesión</h1>
      <div style={{display:"flex", flexDirection:"column"}}>
        <label style={{fontSize:"18px"}}>Correo electrónico*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
        />
      </div>
      <div style={{display:"flex", flexDirection:"column"}}>
        <label style={{fontSize:"18px"}}>Contraseña</label>
        <input
          type="password"
          name="clave"
          value={formData.clave}
          onChange={handleChange}
          required
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
        />
        </div>
      <button type="submit"
      style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", cursor:"pointer", background:"#0174BB", color:"#fff"}}
      >Iniciar Sesión</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}

export default LoginForm;
