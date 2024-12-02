import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = '123'; // Asegúrate de usar una clave secreta fuerte

export const verifyToken = (handler) => {
  return async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticación requerida' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
};
