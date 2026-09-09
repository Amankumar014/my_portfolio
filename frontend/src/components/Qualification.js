import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiCalendar } from 'react-icons/fi';
import './Qualification.css';

const Qualification = () => {
  const [activeTab, setActiveTab] = useState('education');

  const education = [
    {
      title: 'M.Tech CSE(AI & DS)',
      subtitle: 'Data Science & Artificial Intelligence',
      date: '2026 - 2028',
    },
    {
      title: 'B.Tech CSE ( AI & ML )',
      subtitle: 'Techno Main Salt Lake, Kolkata',
      date: '2025 PASSOUT',
    },
    {
      title: 'Skill Development (STEM)',
      subtitle: 'Allen Career Institute ( KOTA )',
      date: '2019 - 2020',
    },
    {
      title: 'Pre-University',
      subtitle: 'Sunshine School',
      date: '2004 - 2019',
    },
  ];

  const work = [
    {
      title: 'AI Trainee Consultant',
      subtitle: 'Kaara Info Systems',
      date: '2025',
    },
    {
      title: 'AI Intern (RAG & Vector DB)',
      subtitle: 'Nexus Info',
      date: '2024',
    },
    {
      title: 'Computer Vision Intern',
      subtitle: 'Arkham Archives Pvt. Ltd',
      date: '2023 - 2024',
    },
  ];

  const data = activeTab === 'education' ? education : work;

  return (
    <section className="qualification section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Qualification</h2>
        <span className="section__subtitle">My personal journey</span>

        <div className="qualification__container">
          <div className="qualification__tabs">
            <button
              className={`qualification__button ${activeTab === 'education' ? 'qualification__button--active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <FiAward className="qualification__icon" />
              Education
            </button>
            <button
              className={`qualification__button ${activeTab === 'work' ? 'qualification__button--active' : ''}`}
              onClick={() => setActiveTab('work')}
            >
              <FiBriefcase className="qualification__icon" />
              Work
            </button>
          </div>

          <motion.div
            className="qualification__sections"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {data.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`qualification__data ${isLeft ? 'qualification__data--left' : 'qualification__data--right'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="qualification__rounder-wrapper">
                    <span className="qualification__rounder"></span>
                    {index < data.length - 1 && <span className="qualification__line"></span>}
                  </div>

                  <div className="qualification__content">
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.subtitle}</span>
                    <div className="qualification__calendar">
                      <FiCalendar /> {item.date}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Qualification;

