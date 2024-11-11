import React, { useState } from 'react';
import './LoginRegister.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data (frontend only):', formData);
  };

  return (
    <div className="login-register-page">
      <button className="close-button">×</button>
      <header className="login-register-header">
        <h2 className="login-register-title">Welcome back!</h2>
        <p className="login-register-subtitle">Login to your account.</p>
      </header>
      <form className="login-register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-register-button">Login</button>
      </form>

      <div className="forgot-password-link">
        <span style={{ color: 'blue', cursor: 'pointer' }}>Forgot password?</span>
      </div>

      <p className="alternate-link">
        Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }}>Register</span>
      </p>
    </div>
  );
}

export default Login;
