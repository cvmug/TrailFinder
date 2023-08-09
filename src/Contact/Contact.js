import React from 'react';
import './Contact.css';
import Header from '../Home/Nav/Header';
import Footer from '../Footer/Footer';

const Contact = () => {

  return (
    <div className="contact-page-container">
      <Header />
      <div className="contact-container">
        <h1 className='contact-contact'>Contact Us</h1>
        <p className='questions'>If you have any questions, please feel free to contact us by filling out the form below:</p>
        <form action="https://formspree.io/f/xjvqyywe" method="POST">
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="name">Name:</label>
            <input className="contact-text" type="text" id="name" name="name" required />
          </div>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="email">Email:</label>
            <input className="contact-label" type="email" id="email" name="email" required />
          </div>
          <div className="contact-form-group">
            <label className="contact-label" htmlFor="question">Question:</label>
            <textarea id="question" name="question" rows="4" required />
          </div>
          <input type="submit" value="Submit" className="contact-submit-button" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
