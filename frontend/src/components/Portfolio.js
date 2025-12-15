import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiArrowRight, FiX } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Portfolio.css';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Vehicle Damage Detection & Claims Management',
      company: 'Kaara Info Systems • 2025',
      description:
        'End-to-end vehicle claims workflow with YOLO-based damage detection, chatbot support, and Azure deployment.',
      details: [
        'Developed data collection, annotation, and model development plus a cost-analysis chatbot; deployed on Azure.',
        'Fine-tuned pretrained vehicle classifiers with thousands of damage samples; YOLO detection with real-time location tracking to validate claims.',
      ],
      image: '/files/img/vehicle_damage.jpeg',
      demo: '#',
    },
    {
      id: 2,
      title: 'Agentic AI Healthcare Insurance Claims',
      company: 'Kaara Info Systems • 2025',
      description:
        'FastAPI claim workflow with OCR, Azure OpenAI RAG chatbot, and LangGraph fraud detection tied to PM-JAY data.',
      details: [
        'Claim submission with OCR extraction and adjudicator workflow; Azure OpenAI chatbot for Hospital/Patient/TPA/Admin communication.',
        'Multi-agent fraud detection in LangGraph comparing PM-JAY procedure costs vs claimed amounts; automatic invoice generation; Azure deployment.',
      ],
      image: '/files/img/healthcare.jpg',
      demo: '#',
    },
    {
      id: 3,
      title: 'AI Freight Quotation from RFQs',
      company: 'Kaara Info Systems • 2025',
      description:
        'Automated freight quotation engine parsing RFQ emails with LLM validation and rule engines for real-time pricing.',
      details: [
        'Captures shipment details (weight, dimensions, origin/destination, mode) and generates accurate quotes using DB lookups and LLM-assisted validation.',
        'Surcharge & rule engine applies BAF, CAF, THC, and other dynamic charges; FastAPI workflow for auto-quotation, PDF export, and email delivery.',
      ],
      image: '/files/img/freight.jpg',
      demo: '#',
    },
    {
      id: 4,
      title: 'Document Intelligence System',
      company: 'Kaara Info Systems • 2025',
      description:
        'Azure GPT-4o Vision + OpenCV pipeline for multi-doc extraction and precise PDF autofill (~95% accuracy).',
      details: [
        'AI-powered extraction mapped to structured templates with Azure GPT-4o Vision.',
        'Dynamic form autofill using OpenCV + LLMs + PyMuPDF/PdfMiner; multilingual, multi-doc, real-time validation for banking/insurance/KYC.',
      ],
      image: '/files/img/document_intelligence.jpg',
      demo: '#',
    },
    {
      id: 5,
      title: 'Agentic RAG Chatbot with Vector DB',
      company: 'Nexus Info • 2024',
      description:
        'Domain RAG chatbot using LangChain/LangGraph, vector DBs, FastAPI, and HuggingFace/Gemini models.',
      details: [
        'End-to-end RAG: chunking, vector embeddings, semantic retrieval, and LLM responses; migrated from HuggingFace LLM to Gemini Pro.',
        'CSV uploads with charts/histograms for analytics; answers domain-specific and general queries.',
      ],
      image: '/files/img/chatbot.png',
      demo: '#',
    },
    {
      id: 6,
      title: '3D Image Generation & Computer Vision',
      company: 'Arkham Archives Pvt. Ltd • 2023',
      description:
        '3D image generation and CV workflows for game development pipelines.',
      details: [
        'Collaborated on 3D image generation using computer vision for game development.',
        'Data preprocessing plus geometry/texture workflows; integrated CV components into pipelines.',
      ],
      image: '/files/img/3d_image.jpg',
      demo: '#',
    },
    {
      id: 7,
      title: 'AI Baby Monitoring System',
      company: 'Personal / Applied Research • 2023',
      description:
        'Real-time multi-modal monitoring with CV and audio analytics for baby safety and distress detection.',
      details: [
        'MediaPipe Pose, Face Mesh, and Iris tracking to detect posture, eye closure, and unsafe sleep positions',
        'Intelligent alerts that flag unusual movements and crying patterns with SMS/email notifications',
        'ML-driven audio classification with Librosa to distinguish crying and abnormal events via sound features and energy patterns',
      ],
      image: '/files/img/baby_monitor.png',
      demo: '#',
    },
  ];

  return (
    <section className="portfolio section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Projects</h2>
        <span className="section__subtitle">Featured builds</span>

        <div className="portfolio__container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="portfolio__swiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  className="portfolio__content"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio__img"
                  />
                  <div className="portfolio__data">
                    <h3 className="portfolio__title">{project.title}</h3>
                    {project.company && (
                      <p className="portfolio__company">{project.company}</p>
                    )}
                    <p className="portfolio__description">{project.description}</p>
                    <button
                      className="portfolio__button"
                      onClick={() => setActiveProject(project)}
                    >
                      View Demo <FiArrowRight />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {activeProject && (
          <div className="portfolio__modal" onClick={() => setActiveProject(null)}>
            <motion.div
              className="portfolio__modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="portfolio__modal-close"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
              >
                <FiX />
              </button>
              <h3 className="portfolio__modal-title">{activeProject.title}</h3>
              {activeProject.company && (
                <p className="portfolio__modal-company">{activeProject.company}</p>
              )}
              <p className="portfolio__modal-description">{activeProject.description}</p>
              {activeProject.details && (
                <ul className="portfolio__modal-list">
                  {activeProject.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Portfolio;

