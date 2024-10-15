// src/pages/Home.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import { fetchProducts } from "../services/products";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Lista de Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="contact-section">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
