import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  FiCpu,
  FiDatabase,
  FiActivity,
  FiGitBranch,
  FiLayers,
  FiZap,
  FiCloud,
  FiEye,
  FiX,
  FiCheck,
} from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Services.css';

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 1,
      icon: <FiCpu />,
      title: 'Building AI/ML Models',
      details: [
        'Object Detection and Image Preprocessing',
        'Web Scraping using Python',
        'Building AI Chatbots and make them learn',
        'AI for Computer Vision',
        'Generative AI Solutions',
      ],
    },
    {
      id: 2,
      icon: <FiDatabase />,
      title: 'Data Science',
      details: [
        'Data Cleaning for datasets',
        'Preprocessing and Scraping the Data',
        'Fixing errors in Datasets and Data Extraction',
        'Implementation using Pandas DataFrame',
        'Statistical Analysis and Visualization',
      ],
    },
    {
      id: 3,
      icon: <FiActivity />,
      title: 'Neural Networks Builder',
      details: [
        'Building Machine Learning Models',
        'Reinforcement learning for building models',
        'Supervised and Unsupervised ML Algorithms',
        'Solving Real World Problems by deploying ML models',
        'Deep Learning Architecture Design',
      ],
    },
    {
      id: 4,
      icon: <FiGitBranch />,
      title: 'Agentic AI Developer',
      details: [
        'Designing LangGraph / CrewAI multi-agent flows',
        'Tool use, grounding, guardrails, and evals',
        'RAG + agents for workflows and automation',
        'Observability and tracing for AI pipelines',
        'Latency + cost optimization for agents',
      ],
    },
    {
      id: 5,
      icon: <FiLayers />,
      title: 'RAG & Retrieval Systems',
      details: [
        'Document ingestion, chunking, hybrid search',
        'FAISS/Chroma vector stores with metadata filters',
        'Reranking and query rewriting for precision',
        'Hallucination reduction and grounding',
        'PDF, CSV, and web-source pipelines',
      ],
    },
    {
      id: 6,
      icon: <FiZap />,
      title: 'Fine-tuning & PEFT',
      details: [
        'LoRA/QLoRA on domain datasets',
        'Prompt, instruction, and preference tuning',
        'Eval harnesses and regression suites',
        'Token-level safety filters and RLHF-lite',
        'Deployment playbooks for tuned models',
      ],
    },
    {
      id: 7,
      icon: <FiCloud />,
      title: 'Generative AI Solutions',
      details: [
        'Prompt engineering and system design',
        'Content generation with guardrails',
        'Vision-language (VLM) experiences',
        'API integration and orchestration',
        'Caching and cost controls in production',
      ],
    },
    {
      id: 8,
      icon: <FiEye />,
      title: 'Computer Vision Pipelines',
      details: [
        'YOLO/ViT detection and segmentation',
        'Preprocessing, augmentation, and QC',
        'Real-time inference optimization',
        'Metrics, drift monitoring, and retraining',
        'Edge deployment considerations',
      ],
    },
  ];

  return (
    <section className="services section" id="services">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Services</h2>
        <span className="section__subtitle">What I offer</span>

        <div className="services__container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="services__swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <motion.div
                  className="services__content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="services__icon">{service.icon}</div>
                  <h3 className="services__title">{service.title}</h3>
                  <button
                    className="services__button"
                    onClick={() => setActiveModal(service.id)}
                  >
                    View more
                    <svg className="button__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <AnimatePresence>
          {activeModal && (
            <motion.div
              className="services__modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                className="services__modal-content"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="services__modal-close"
                  onClick={() => setActiveModal(null)}
                >
                  <FiX />
                </button>
                <h4 className="services__modal-title">
                  {services.find(s => s.id === activeModal)?.title}
                </h4>
                <ul className="services__modal-services">
                  {services.find(s => s.id === activeModal)?.details.map((detail, idx) => (
                    <li key={idx} className="services__modal-service">
                      <FiCheck className="services__modal-icon" />
                      <p>{detail}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Services;

