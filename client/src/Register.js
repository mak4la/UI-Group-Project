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

    // Check if passwords match
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMatch(
        name === 'confirmPassword'
          ? formData.password === value
          : value === formData.confirmPassword
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordMatch) {
      try {
        const response = await fetch('http://localhost:5001/back/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to register');
                }

        const data = await response.json();
        console.log('User registered successfully:', data);
        alert('Registration successful!');

        // Clear the form after successful registration
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to register user. Please try again.');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="register-page">
      <button className="close-button">×</button>

      <header className="register-header">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">
          Join PageNest and start your reading journey today!
        </p>
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

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <p className="login-link">
        Already have an account?{' '}
        <span style={{ color: '#574C3F', cursor: 'pointer' }}>Log in</span>
      </p>
    </div>
  );
}

export default Register;
