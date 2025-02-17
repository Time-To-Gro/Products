import React, { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      navigate("/home"); // Redirect to Home if already logged in
    }
  }, []);
  const ownerEmail = "owner@gmail.com"; // Change this to your owner email
  const ownerPassword = "owner123"; // Set owner password

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === ownerEmail && password === ownerPassword) {
      localStorage.setItem("authenticated", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials! Only the owner can access.");
    }
  };

  return (
    <div className="login-container">
      <h2>Owner Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
