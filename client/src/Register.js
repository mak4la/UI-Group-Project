import React, { useState } from 'react';
import './LoginRegister.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatch, setPasswordMatch] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMatch(
        formData.password === value && formData.password !== '' ? true : false
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMatch) {
      console.log('Form data (frontend only):', formData);
      alert('Form submitted! (frontend only)');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="register-page">
      {/* Close button */}
      <button className="close-button">×</button>

      <header className="register-header">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Join PageNest and start your reading journey today!</p>
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="name-fields">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordMatch === false && (
            <p className="error-text">Passwords do not match</p>
          )}
          {passwordMatch === true && (
            <p className="success-text">Passwords match</p>
          )}
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }}>Log in</span>
      </p>
    </div>
  );
}

export default Register;
