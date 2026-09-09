import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiDownload, FiSend } from 'react-icons/fi';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import downloadCV from '../utils/downloadCV';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', project: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FiPhone />, title: 'Call me', subtitle: '******9794' },
    { icon: <FiMail />, title: 'Email', subtitle: 'amankumar.ai@zohomail.in' },
    { icon: <FiMapPin />, title: 'Location', subtitle: 'Siliguri , India - West Bengal' },
  ];

  return (
    <section className="contact section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Contact Me</h2>
        <span className="section__subtitle">Get in touch</span>

        <div className="contact__container">
          <motion.div
            className="contact__info-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="contact__information">
                <div className="contact__icon">{info.icon}</div>
                <div>
                  <h3 className="contact__title">{info.title}</h3>
                  <span className="contact__subtitle">{info.subtitle}</span>
                </div>
              </div>
            ))}
            <button 
              onClick={downloadCV}
              className="button button--flex"
              type="button"
            >
              Download CV <FiDownload />
            </button>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="contact__inputs">
              <div className="contact__content">
                <label className="contact__label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact__input"
                  required
                />
              </div>
              <div className="contact__content">
                <label className="contact__label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact__input"
                  required
                />
              </div>
            </div>
            <div className="contact__content">
              <label className="contact__label">Project</label>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="contact__input"
                required
              />
            </div>
            <div className="contact__content">
              <label className="contact__label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="contact__input"
                required
              />
            </div>
            {status.message && (
              <div className={`contact__status contact__status--${status.type}`}>
                {status.message}
              </div>
            )}
            <button type="submit" className="button button--flex" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'} <FiSend />
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

