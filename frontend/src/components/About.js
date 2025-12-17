import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiAward, FiBriefcase, FiUsers } from 'react-icons/fi';
import downloadCV from '../utils/downloadCV';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FiAward />, title: '04+', subtitle: 'Years Experience' },
    { icon: <FiBriefcase />, title: '10+', subtitle: 'Completed Projects' },
    { icon: <FiUsers />, title: '03+', subtitle: 'Companies Worked' },
  ];

  return (
    <section className="about section" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">About Me</h2>
        <span className="section__subtitle">My introduction</span>

        <div className="about__container">
          <motion.img
            src="/files/img/prf3.jpg"
            alt="Aman Kumar Sah"
            className="about__img"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.div
            className="about__data"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="about__description">
              Passionate in building Neural Networks and Machine Learning models. I keep a keen interest 
              and enjoy playing with Data. Not only do I clean my residence but I also enjoy Data Cleaning 
              as well. With extensive experience in AI/ML development, I bring innovative solutions to 
              complex problems.
            </p>

            <div className="about__info">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="about__info-box"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="about__info-icon">{stat.icon}</div>
                  <div>
                    <span className="about__info-title">{stat.title}</span>
                    <span className="about__info-subtitle">{stat.subtitle}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={downloadCV}
              className="button button--flex"
              type="button"
            >
              Download CV <FiDownload />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

