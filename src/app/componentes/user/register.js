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
    <div style={{display:"flex", justifyContent:"center", margin:"20px 0 0 0"}}>
    <form onSubmit={handleSubmit} style={{ borderRadius:"10px", height:"580px", display:"grid", gridTemplateColumns:"1fr 1fr",width:"600px", padding:"20px", gap:"30px", border:"2px solid #0174BB"}}>
      <h1 style={{color:"#0174BB", gridColumn:"1/3"}}>Registro</h1>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
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
          style={{fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", border:"1px solid #0174BB", background:"#eee"}}
        />
      </div>
      <div></div>
      <button type="submit" 
      style={{gridColumn:"1/3", fontSize:"17px", padding:"10px 10px", outline:"none", borderRadius:"5px", border:"none", cursor:"pointer", background:"#0174BB", color:"#fff"}}
      >Registrar</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}

export default UserRegistrationForm;
