import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authenticated"); // Remove authentication
    navigate("/"); // Redirect to Login Page
  };

  return (
    <div className="container">
      <div className="header">
      <h2 style={{ textAlign: "center", color: "white" }}>Food Products</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description.substring(0, 50)}...</p>
            <p><strong>Price:</strong> (${product.price}) <del>{product.price*2}</del></p>
            <Link to={`/product/${product._id}`} className="product-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
