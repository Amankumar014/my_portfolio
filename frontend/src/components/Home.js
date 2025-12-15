import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiInstagram, FiGithub, FiMail, FiArrowDown } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="home section" id="home">
      <motion.div
        className="home__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="home__social" variants={itemVariants}>
          <a href="https://www.linkedin.com/in/amankumarsahai/" target="_blank" rel="noopener noreferrer" className="home__social-icon">
            <FiLinkedin />
          </a>
          <a href="https://www.instagram.com/code_sapiens_/" target="_blank" rel="noopener noreferrer" className="home__social-icon">
            <FiInstagram />
          </a>
          <a href="https://github.com/Amankumar014" target="_blank" rel="noopener noreferrer" className="home__social-icon">
            <FiGithub />
          </a>
        </motion.div>

        <motion.div className="home__img" variants={itemVariants}>
          <div className="home__blob">
            <svg viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Portrait">
              <defs>
                <clipPath id="blobClip">
                  <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                </clipPath>
              </defs>
              <path
                d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                fill="var(--primary-color)"
              />
              <image
                className="home__blob-img"
                x="-3"
                y="0"
                width="200"
                height="230"
                href="/files/img/prf1.png"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#blobClip)"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div className="home__data" variants={itemVariants}>
          <h1 className="home__title">
            Hi! I'm <span className="gradient-text">Aman Kumar Sah</span>
          </h1>
          <h3 className="home__subtitle">Gen AI / Agentic AI Developer</h3>
          <p className="home__description">
            GATE DA-Qualified and passionate about building Generative AI and Agentic AI systems with hands-on 
            experience in LLMs, RAG, multi-agent flows, and deep learning. Mentored 500+ students in Data Science, 
            Artificial Intelligence, and advanced Python.
            <br /><br />
            Ready for building future AI innovations.
          </p>
          <a href="#contact" className="button button--flex">
            Contact Me <FiMail />
          </a>
        </motion.div>

        <motion.a 
          href="#about" 
          className="home__scroll"
          variants={itemVariants}
          whileHover={{ y: 5 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
        >
          <span className="home__scroll-text">Scroll down</span>
          <FiArrowDown className="home__scroll-arrow" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Home;

