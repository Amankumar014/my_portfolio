import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiFileText, FiImage, FiMail, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = ({ darkMode, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <FiHome />, href: '#home' },
    { name: 'About', icon: <FiUser />, href: '#about' },
    { name: 'Skills', icon: <FiFileText />, href: '#skills' },
    { name: 'Services', icon: <FiBriefcase />, href: '#services' },
    { name: 'Projects', icon: <FiImage />, href: '#projects' },
    { name: 'Contact', icon: <FiMail />, href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav container">
        <a href="#home" className="nav__logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
          <b>Code_Sapiens_</b>
        </a>

        <div className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.name} className="nav__item">
                <a
                  href={item.href}
                  className={`nav__link ${activeSection === item.href.slice(1) ? 'nav__link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  <span className="nav__icon">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav__close" onClick={() => setMenuOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="nav__actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button className="nav__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <FiMenu />
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;

