"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './componentes/producCard/ProductCard';
import HeaderMain from './componentes/header';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get('/api/init');
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <HomeContainer>
      <HeaderMain />
      <div style={{height:"300px", display:"flex", gap:"50px", margin:"20px 0"}}>
        
          <div style={{background:"#0174BB",display:"flex", borderRadius:"20px", boxShadow:"0 5px 15px 0 #aaa"}}>
           <Logo src="/image/main1.png" alt="Logo" />
           <div style={{display:"flex", flexDirection:"column", textAlign:"center", padding:"20px 20px", alignItems:"center", justifyContent:"space-between"}}>
              <h1 style={{ fontSize:"30px", color:"#fff", width:"90%"}}>Pegasus Sport vende ropa de
              mejor calidad en el mercado</h1>
              <span style={{ fontSize:"18px", color:"#fff"}}>Ofrecemos ropa deportiva de alta calidad, con materiales premium y tecnología innovadora. Comodidad, estilo y sostenibilidad en cada prenda. Viste Pegasus Sport y alcanza tus metas con confianza.</span>
              <button style={{width:"200px", fontSize:"18px",padding:"10px 20px", borderRadius:"10px", border:"none", background:"#fff", color:"#0174BB"}}>Ver productos</button>
            </div>
          </div>

          <div style={{height:"300px",display:"flex", gap:"20px", flexDirection:"column", justifyContent:"space-between", width:"100vw"}}>
            <div style={{background:"#0174BB", height:"130px", borderRadius:"20px", display:"flex", boxShadow:"0 5px 15px 0 #aaa"}}>
              <Logo src="/image/main2.png" alt="Logo" />
              <div style={{display:"flex",flexDirection:"column", justifyContent:"center", gap:"5px"}}>
              <h1 style={{ fontSize:"25px", color:"#fff", width:"90%"}}>Envios gratis a toda caracas</h1>
              <span style={{ fontSize:"18px", color:"#fff"}}>Por tiempo limitado estamos ofreciendo envió gratuito a toda caracas, no te pierdas de esta increíble promoción.</span>
              </div>
            </div>

            <div style={{background:"#0174BB", height:"130px", borderRadius:"20px", display:"flex", boxShadow:"0 5px 15px 0 #aaa"}}>
              <Logo src="/image/main3.png" alt="Logo" />
              <div style={{display:"flex",flexDirection:"column", justifyContent:"center", gap:"5px"}}>
              <h1 style={{ fontSize:"25px", color:"#fff", width:"90%"}}>Encontraras todo tipo de prendas</h1>
              <span style={{ fontSize:"18px", color:"#fff"}}>Desde ropa deportiva hasta atuendos casuales, todas nuestras piezas combinan estilo, comodidad y durabilidad, perfectas para cualquier ocasión.</span>
              </div>
            </div>

          </div>
      </div>
      <h1 style={{color:"#0174BB"}}>Nuestros productos disponibles</h1>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
      <h1 id="contact" style={{color:"#0174BB", margin:"40px 0 20px 0", textAlign:"center"}}>¿INTERESADO EN PERSONALIZAR TUS PRENDAS?</h1>
      <h1 style={{color:"#5E5E5E", margin:"20px 0", textAlign:"center"}}>Contáctanos aquí</h1>
      <div style={{height:"230px", display:"flex", justifyContent:"center", gap:"40px"}}>
          <a href="hhttps://www.facebook.com/profile.php?id=100067618893287" target="_blank" style={{border:"2px solid #0174BB",height:"200px", width:"200px", borderRadius:"20px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px"}}>
            <Contact src="/image/facebook.png" alt="Logo" />
            <span style={{color:"#0174BB", fontWeight:"600"}}>Facebook</span>
          </a>

          <a href="https://www.instagram.com/pegasosport/" target="_blank" style={{border:"2px solid #0174BB",height:"200px", width:"200px", borderRadius:"20px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px"}}>
            <Contact src="/image/instagram.png" alt="Logo" />
            <span style={{color:"#0174BB", fontWeight:"600"}}>instagram</span>
          </a>
          <a href="https://api.whatsapp.com/send?phone=584143247348&text=Hola%2Cquiero%20m%C3%A1s%20informaci%C3%B3n%20de%20los%20uniformes%20" target="_blank" style={{border:"2px solid #0174BB",height:"200px", width:"200px", borderRadius:"20px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px"}}>
            <Contact src="/image/whatsapp.png" alt="Logo" />
            <span style={{color:"#0174BB", fontWeight:"600"}}>WhatsApp</span>
          </a>
      </div>
    </HomeContainer>
  );
}

// Estilos con styled-components
const HomeContainer = styled.div`
  padding: 20px;
  font-family: inter;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 50px;
  margin-top: 20px;
`;

const Logo = styled.img`
  height: 100%;
`;

const Contact = styled.img`
  height: 30%;
  width: 60px
`;

