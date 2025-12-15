import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Aman Kumar',
      role: 'Client',
      image: '/files/img/testimonial1.jpg',
      comment: 'Outstanding work on our AI project! The neural network implementation exceeded our expectations and delivered exceptional results. Highly professional and knowledgeable.',
    },
    {
      id: 2,
      name: 'David Harrison',
      role: 'Client',
      image: '/files/img/testimonial2.jpg',
      comment: 'Excellent data science expertise. The insights provided through comprehensive analysis helped our business make data-driven decisions. Great communication throughout the project.',
    },
    {
      id: 3,
      name: 'Kowsalya Ranaya',
      role: 'Client',
      image: '/files/img/testimonial3.jpg',
      comment: 'Impressive machine learning solutions! The predictive models built were accurate and scalable. A true expert in the field with exceptional problem-solving skills.',
    },
  ];

  return (
    <section className="testimonials section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Testimonials</h2>
        <span className="section__subtitle">What clients say</span>

        <div className="testimonials__container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials__swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className="testimonial__card"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="testimonial__header">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial__img"
                    />
                    <div className="testimonial__info">
                      <h3 className="testimonial__name">{testimonial.name}</h3>
                      <span className="testimonial__role">{testimonial.role}</span>
                    </div>
                  </div>
                  <div className="testimonial__stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="testimonial__star" />
                    ))}
                  </div>
                  <p className="testimonial__comment">{testimonial.comment}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;

