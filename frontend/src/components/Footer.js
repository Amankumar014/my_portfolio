import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/amankumarsahai/' },
    { icon: <FiGithub />, href: 'https://github.com/Amankumar014' },
    { icon: <FiTwitter />, href: 'https://www.instagram.com/code_sapiens_/' },
  ];

  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container">
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="footer__title">Code_Sapiens_</h1>
            <span className="footer__subtitle">Generative AI & Agentic AI Developer</span>
          </motion.div>

          <motion.ul
            className="footer__links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="footer__link"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="footer__socials"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>

        <p className="footer__copy">
          &copy; {currentYear} Code_Sapiens_. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

