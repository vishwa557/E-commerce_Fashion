import React from 'react';
import '../styles/Contact.css';
import { FaPhone, FaEnvelope, FaMapMarker, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-container">
        <div className='brand-container'>
        <img src={require('./apple-touch-icon.png')} alt="Brand Logo" className="brand-logo" />
            </div>
      <div className="contact-header">
       
        <h2>Contact Us</h2>
      </div>
      <div className="contact-details">
        <div className="contact-info">
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <p>Phone: <a href="tel:+1234567890">+91 9886460801</a></p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <p>Email: <a href="mailto:info@example.com">vishwachandra557@gmail.com</a></p>
          </div>
          <div className="contact-item">
            <FaMapMarker className="contact-icon" />
            <p>Address: 123, MG road, Bangalore, India</p>
          </div>
        </div>
        <div className="brand-about">
          <h3>About Our Brand</h3>
          <p>At VogueVista, we believe that fashion should be accessible to everyone. That's why we offer a wide range of styles and sizes to suit every taste and body type. Whether you're looking for classic pieces to build your wardrobe around or on-trend items to keep your look fresh, we've got you covered. Our goal is to help you feel confident and stylish every day, no matter where life takes you. So come explore our collection and see what speaks to you – we know you'll find something you love!</p>
        </div>
      </div>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/vishwachandra-l-b3a70317a" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon" /></a>
        <a href="https://instagram.com/vis_hwa_1718?igshid=MzNlNGNkZWQ4Mg==" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
      </div>
    </div>
  );
};

export default Contact;
