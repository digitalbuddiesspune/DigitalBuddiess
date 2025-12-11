import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Social Media Icons as SVG Components
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ContactUsSection = () => {
  const navigate = useNavigate();
  const videoUrl = 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765003085/AD_Video_Digital_Buddiess_1_b4jlye.mp4';

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  const FloatingIcon = ({ iconId, icon: Icon, iconColor, className, animationClass }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const iconRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!iconRef.current) return;
      const rect = iconRef.current.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - iconCenterX;
      const deltaY = e.clientY - iconCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 100) {
        // Move away from cursor
        const angle = Math.atan2(deltaY, deltaX);
        const moveDistance = 30;
        setOffset({
          x: -Math.cos(angle) * moveDistance,
          y: -Math.sin(angle) * moveDistance
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    return (
      <div 
        className={`absolute ${className} hidden md:block z-20 ${animationClass}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={iconRef}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <Icon className={`w-10 h-10 ${iconColor}`} />
        </div>
      </div>
    );
  };

  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 overflow-hidden radial-rings-bg">

      {/* Floating Social Icons */}
      <FloatingIcon
        iconId="instagram"
        icon={InstagramIcon}
        iconColor="text-pink-600"
        className="left-10 top-1/4"
        animationClass="animate-float"
      />

      <FloatingIcon
        iconId="facebook"
        icon={FacebookIcon}
        iconColor="text-blue-600"
        className="right-20 top-1/3"
        animationClass="animate-float-delay-1"
      />

      <FloatingIcon
        iconId="youtube"
        icon={YoutubeIcon}
        iconColor="text-red-600"
        className="left-1/4 bottom-1/4"
        animationClass="animate-float-delay-2"
      />

      <FloatingIcon
        iconId="whatsapp"
        icon={WhatsAppIcon}
        iconColor="text-green-600"
        className="right-1/4 top-1/2"
        animationClass="animate-float-delay-3"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">

          {/* DIGITAL */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-orange-500 tracking-tight px-4">
              DIGITAL
            </h2>
          </motion.div>

          {/* BUDDIES */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-cursive1 text-white tracking-wider px-4">
              BUDDIES
            </p>
          </motion.div>

          {/* Circular Video */}
          <motion.div 
            className="relative mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-2xl mx-auto">

              <div className="absolute inset-0 rounded-full overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>

              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10 bg-black/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="space-y-1 sm:space-y-2">
                  <motion.p 
                    className="text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    HIRE THE TEAM
                  </motion.p>
                  <motion.p 
                    className="text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    THAT BUILT SOME OF
                  </motion.p>
                  <motion.p 
                    className="text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    THE MOST ICONIC BRANDS ON
                  </motion.p>
                  <motion.p 
                    className="text-yellow-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide mt-1 sm:mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    SOCIAL MEDIA
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Button */}
          <motion.button
            onClick={handleContactClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg shadow-2xl transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
            style={{ boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)' }}
          >
            Contact Us
          </motion.button>

          {/* Mobile Social Media Icons */}
          <motion.div
            className="md:hidden mt-8 flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <InstagramIcon className="w-6 h-6 text-pink-600" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <FacebookIcon className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <YoutubeIcon className="w-6 h-6 text-red-600" />
            </a>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <WhatsAppIcon className="w-6 h-6 text-green-600" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;

