import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WhatWeOffer = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  const services = [
    {
      title: "Digital Marketing Services",
      description: "Elevate your online presence with tailored digital marketing strategies",
      videoUrl : 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765175513/IMG_0208_gmy2hv.mov'
    },
    
    {
      title: "Web & App Development",
      description: "Building responsive websites and apps that drive engagement and growth.",
      videoUrl : 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765173793/Blue_Dynamic_Stream_Starting_Soon_Video_1_rbn5ak.mp4'
    },
    {
      title: "Advertising Services",
      description: "Maximize your reach with data-driven advertising campaigns",
      videoUrl : 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765176181/Untitled_1584_x_600_px_1584_x_396_px_1_1_s9v50h.mp4'
    },
    {
      title: "Branding Services",
      description: "Crafting unique brand identities that stand out in the market.",
     videoUrl : 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765173790/IMG_0205_ntbvad.mov'
    },
    {
      title: "Ecommerce Marketing",
      description: "Boost your online store's sales with proven ecommerce marketing tactics.",
      videoUrl : 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765174569/Neutral_Modern_Fashion_Collection_Video_2048_x_594_px_1_flu8wd.mp4'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].currentTime = 0;
      videoRefs.current[index].play().catch(err => console.log('Video play error:', err));
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-1 bg-black text-white overflow-hidden relative">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">What We </span>
            <span className="text-orange-500">Offer</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-1">
        {services.map((service, index) => (
          <div key={index} className="w-full">
            <div
              className="relative w-full overflow-hidden shadow-lg"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Video Background */}
              <div className="absolute inset-0 w-full h-full z-0" style={{ aspectRatio: '32/9' }}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0"></div>
              </div>
              
              <button
                className={`w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 relative flex items-center justify-between transition-colors relative z-10 hover:bg-black/10 ${
                  service.title === "Web & App Development" || 
                  service.title === "Branding Services"
                    ? "text-right justify-end"
                    : "text-left"
                }`}
              >
                <div className={`flex-1 ${
                  service.title === "Web & App Development" || 
                  service.title === "Branding Services"
                    ? "text-right"
                    : ""
                }`}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/90">
                    {service.description}
                  </p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Button */}
      <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8 px-4">
        <motion.button
          onClick={() => {
            navigate('/service');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg shadow-2xl transition-all duration-300 w-full sm:w-auto"
          style={{ boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)' }}
        >
          View All Services
        </motion.button>
      </div>
    </section>
  );
};

export default WhatWeOffer;

