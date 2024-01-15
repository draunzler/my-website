import React from 'react';
import './contact.css'
import background from '../../assets/contact-bg.mp4';

const Contact = () => {
  return (
    <div className="contact">
        <video autoPlay loop muted>
          <source src={ background } type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='contact-form'>
            <h1>Contact Me</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />

            <button type="submit">Get in Touch</button>
        </div>
    </div>
  );
};

export default Contact;
