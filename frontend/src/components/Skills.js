import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiServer, FiLayers, FiChevronDown } from 'react-icons/fi';
import './Skills.css';

const Skills = () => {
  const [openSections, setOpenSections] = useState(['programming']);

  const toggleSection = (section) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const skillsData = [
    {
      id: 'programming',
      title: 'Programming & Libraries',
      subtitle: 'Core stack',
      icon: <FiCode />,
      skills: [
        { name: 'Python', percentage: 92 },
        { name: 'MySQL', percentage: 82 },
        { name: 'HTML', percentage: 85 },
        { name: 'CSS', percentage: 82 },
        { name: 'PyTorch', percentage: 90 },
        { name: 'TensorFlow', percentage: 86 },
        { name: 'OpenCV', percentage: 88 },
        { name: 'MediaPipe', percentage: 80 },
      ],
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Platforms',
      subtitle: 'APIs, DevOps, CV',
      icon: <FiServer />,
      skills: [
        { name: 'FastAPI', percentage: 84 },
        { name: 'Flask', percentage: 82 },
        { name: 'Django', percentage: 80 },
        { name: 'Docker', percentage: 78 },
        { name: 'Azure', percentage: 75 },
        { name: 'Ultralytics', percentage: 82 },
        { name: 'Transformers', percentage: 86 },
        { name: 'Computer Vision (OpenCV/Vision libs)', percentage: 88 },
      ],
    },
    {
      id: 'genai',
      title: 'Generative AI',
      subtitle: 'LLMs, Agents, RAG',
      icon: <FiLayers />,
      skills: [
        { name: 'BERT', percentage: 80 },
        { name: 'LangChain', percentage: 88 },
        { name: 'LangGraph', percentage: 86 },
        { name: 'CrewAI', percentage: 82 },
        { name: 'LLM Apps', percentage: 90 },
        { name: 'RAG', percentage: 88 },
        { name: 'Vector DBs', percentage: 84 },
        { name: 'LoRA / QLoRA', percentage: 82 },
        { name: 'MCP', percentage: 78 },
      ],
    },
  ];

  return (
    <section className="skills section" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My technical level</span>

        <div className="skills__container">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.id}
              className="skills__content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="skills__header"
                onClick={() => toggleSection(category.id)}
              >
                <div className="skills__icon">{category.icon}</div>
                <div className="skills__title-wrapper">
                  <h3 className="skills__title">{category.title}</h3>
                  <span className="skills__subtitle">{category.subtitle}</span>
                </div>
                <motion.div
                  className="skills__arrow"
                  animate={{ rotate: openSections.includes(category.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {openSections.includes(category.id) && (
                  <motion.div
                    className="skills__list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="skills__data">
                        <div className="skills__titles">
                          <h3 className="skills__name">{skill.name}</h3>
                          <span className="skills__number">{skill.percentage}%</span>
                        </div>
                        <div className="skills__bar">
                          <motion.span
                            className="skills__percentage"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;

