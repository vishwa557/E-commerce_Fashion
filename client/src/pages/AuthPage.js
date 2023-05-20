import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

function AuthPage() {
  const [firstname, setfName] = useState('');
  const [lastname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const validate = () => {
    const errors = {};

    if (!firstname.trim()) {
      errors.firstname = 'First name is required';
    }

    if (!lastname.trim()) {
      errors.lastname = 'Last name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setIsAccountCreated(true);
    setErrors({}); // clear errors when there are no errors

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstname,
        lastname,
        email,
        phone,
        password
      });
      console.log(response.data); // should receive a success message
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to create an account' });
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-left">
        <h1>Welcome to VogueVista</h1>
        <p>At VogueVista, we believe that fashion should be accessible to everyone. That's why we offer a wide range of styles and sizes to suit every taste and body type. Whether you're looking for classic pieces to build your wardrobe around or on-trend items to keep your look fresh, we've got you covered. Our goal is to help you feel confident and stylish every day, no matter where life takes you. So come explore our collection and see what speaks to you – we know you'll find something you love!</p>
      </div>
      <div className={`auth-right ${isAccountCreated ? 'auth-right-hidden' : ''}`}>
        {isAccountCreated ? (
          <>
            <h2>Account Created Successfully!</h2>
            <button onClick={() => window.location.href = '/login'}>Login</button>
          </>
        ) : (
          <>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="my-input" id="firstName" value={firstname} onChange={(e) => setfName(e.target.value)} />
                {errors.firstname && <div className="error">{errors.firstname}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" className="my-input" id="lastName" value={lastname} onChange={(e) => setlName(e.target.value)} />
                {errors.lastname && <div className="error">{errors.lastname}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="my-input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" className="my-input" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="my-input" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              {errors.submit && <div className="error">{errors.submit}</div>}
              <button type="submit" className="btn btn-primary">Create Account</button>
              <p>If you already have an account, <a href="/login">Login here</a></p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
















