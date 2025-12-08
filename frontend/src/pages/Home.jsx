import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, BarChart, Smartphone, Zap, Globe, MessageCircle, Plus, Minus } from 'lucide-react';

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

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

/* --- COMPONENTS --- */

// 1. Loading Screen
const Preloader = ({ setLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        scale: 1.5,
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-light tracking-wider"
      >
        Welcome to <span className="font-bold text-orange-500">digital buddies</span>
      </motion.h1>

      {/* Loading Bar */}
      <motion.div
        className="mt-8 h-1 bg-gray-800 rounded-full w-48 overflow-hidden"
      >
        <motion.div
          className="h-full bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => setLoading(false)}
        />
      </motion.div>
    </motion.div>
  );
};

// 2. Video Background Component
const VideoBackground = () => {
  const videoUrl = 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1764925425/Digital_Agency_Showreel_2021_digitalmarketingagency_airpopmedia_socialmediamarketing_vthfhy.mp4';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// 3. 3D Floating Shape (Abstract representation of your image's shapes)
const FloatingShape = ({ delay, className }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className={`absolute hidden md:block opacity-90 ${className}`}
  >
    {/* Using a gradient div to mimic the 3D orange blobs */}
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 shadow-lg blur-sm" />
  </motion.div>
);

// 3. Accordion Section for Services
const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
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

  return (
    <section className="pt-20 pb-1   bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
        </motion.div>
      </div>

      <div className="space-y-1">
        {services.map((service, index) => (
          <div key={index} className="w-full">
            <div
              className="relative w-full overflow-hidden shadow-lg"
              
            >
              {/* Video Background */}
              <div className="absolute inset-0 w-full h-full z-0" style={{ aspectRatio: '32/9' }}>
                <video
                  autoPlay
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
                className={`w-full px-8 py-20 relative flex items-center justify-between transition-colors relative z-10 hover:bg-black/10 ${
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
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-xl font-normal text-white/90">
                    {service.description}
                  </p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Button */}
      <div className="flex justify-center mt-8 mb-8">
        <motion.button
          onClick={() => navigate('/service')}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl transition-all duration-300"
          style={{ boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)' }}
        >
          View All Services
        </motion.button>
      </div>
    </section>
  );
};

// 4. Our Clients Section with Dual Carousels
const OurClientsSection = () => {
  // First 20 images - will carousel LEFT TO RIGHT
  const firstRowImages = [
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176756/20_z14lgy.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176763/19_qahk5j.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176769/17_xdg2iz.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176777/18_gflqhw.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176785/14_srdccr.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176792/16_thzul5.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176801/31_ckweii.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176807/28_ba1s6v.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176819/30_savmvg.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176828/15_i7flbn.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176835/6_xiolmq.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176843/13_ebrnxd.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176850/4_aazi2q.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176857/12_zlwteu.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176866/11_zgrs1u.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176873/41_nsmx3d.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176882/29_dpaojh.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176883/10_ycbds1.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176897/37_m85zbz.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176907/22_g4xqpj.png'
  ];

  // Next 20 images - will carousel RIGHT TO LEFT
  const secondRowImages = [
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176917/9_zws0i9.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176921/8_fcdxvm.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177056/7_rtgter.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177070/2_t0ht4j.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177072/25_qvayi1.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177075/24_ncbhmj.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177078/40_zrxseg.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177081/39_fwsbly.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177084/38_nhcnqh.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177088/23_ujmmyj.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177092/32_szuhr5.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177095/36_iq9xlt.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177098/21_o6wzmt.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177102/35_s38v2p.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177105/34_wql8ke.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177108/33_gfjimj.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177072/25_qvayi1.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177075/24_ncbhmj.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765177078/40_zrxseg.png',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765176801/31_ckweii.png'
  ];

  return (
    <section className="py-20 bg-black text-white overflow-hidden relative">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Clients</h2>
        </motion.div>
      </div>

      {/* First Carousel - Left to Right */}
      <div className="overflow-hidden py-8 relative z-10">
        <div className="flex animate-scroll-left">
          {[...firstRowImages, ...firstRowImages].map((img, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 mx-4">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {img ? (
                  <img 
                    src={img} 
                    alt={`Client ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Client Logo</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Carousel - Right to Left */}
      <div className="overflow-hidden py-8 relative z-10">
        <div className="flex animate-scroll-right">
          {[...secondRowImages, ...secondRowImages].map((img, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 mx-4">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {img ? (
                  <img 
                    src={img} 
                    alt={`Client ${index + 21}`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Client Logo</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Contact Us Section with Circular Video Frame
const ContactUsSection = () => {
  const navigate = useNavigate();
  const videoUrl = 'https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765003085/AD_Video_Digital_Buddiess_1_b4jlye.mp4';

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  return (
    <section className="relative pt-40 pb-32 overflow-hidden radial-rings-bg">

      {/* Floating Social Icons */}
      <div className="absolute left-10 top-1/4 hidden md:block z-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <InstagramIcon className="w-10 h-10 text-pink-600" />
        </div>
      </div>

      <div className="absolute right-20 top-1/3 hidden md:block z-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <FacebookIcon className="w-10 h-10 text-blue-600" />
        </div>
      </div>

      <div className="absolute left-1/4 bottom-1/4 hidden md:block z-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <YoutubeIcon className="w-10 h-10 text-red-600" />
        </div>
      </div>

      <div className="absolute right-1/4 top-1/2 hidden md:block z-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <WhatsAppIcon className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <div className="absolute left-1/3 top-1/3 hidden md:block z-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <TwitterIcon className="w-10 h-10 text-blue-400" />
        </div>
      </div>

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
            <h2 className="text-5xl md:text-8xl font-bold text-orange-500 tracking-tight">
              DIGITAL
            </h2>
          </motion.div>

          {/* BUDDIES */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl font-bold font-cursive1 text-white tracking-wider">
              BUDDIES
            </p>
          </motion.div>

          {/* Circular Video */}
          <motion.div 
            className="relative mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">

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
                <div className="space-y-2">
                  <motion.p 
                    className="text-white text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    HIRE THE TEAM
                  </motion.p>
                  <motion.p 
                    className="text-white text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    THAT BUILT SOME OF
                  </motion.p>
                  <motion.p 
                    className="text-white text-sm md:text-base font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    THE MOST ICONIC BRANDS ON
                  </motion.p>
                  <motion.p 
                    className="text-yellow-400 text-2xl md:text-3xl font-bold uppercase tracking-wide mt-2"
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
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl transition-all duration-300"
            style={{ boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)' }}
          >
            Contact Us
          </motion.button>
        </div>
      </div>
    </section>
  );
};


export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans selection:bg-orange-200">
      <AnimatePresence>
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* --- HERO SECTION (Based on your Image) --- */}
          <section className="relative flex items-center justify-start px-4 sm:px-6 lg:px-8 py-20 md:py-32 min-h-screen overflow-hidden">
            {/* Video Background */}
            <VideoBackground />

            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content */}
                <div className="flex flex-col items-start justify-center space-y-6 z-10 relative">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-semibold leading-tight text-left text-white"
                  >
                    We offer the best digital solutions<br />
                    <span className="block">for <span className="font-serif italic font-light">your business.</span></span>
                  </motion.h1>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 bg-white text-black pl-8 pr-2 py-2 rounded-full text-lg shadow-xl group mt-4"
                  >
                    Get Started Now
                    <div className="bg-black text-white rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </div>

                {/* Right Side - Visual Elements (can be used for images/videos later) */}
                <div className="hidden lg:block relative z-10">
                  {/* Space for visual elements */}
                </div>
              </div>
            </div>
          </section>

          {/* --- OUR CLIENTS SECTION --- */}
          <OurClientsSection />

          {/* --- CONTACT US SECTION --- */}
          <ContactUsSection />

          {/* --- NEW SECTION: SERVICES --- */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12 text-center md:text-left">
                <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Our Expertise</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Everything you need to grow.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Globe size={32} />, title: "Web Development", desc: "Lightning fast websites built with modern technologies like React and Next.js." },
                  { icon: <Smartphone size={32} />, title: "App Design", desc: "Intuitive mobile experiences for iOS and Android that users fall in love with." },
                  { icon: <BarChart size={32} />, title: "Digital Marketing", desc: "Data-driven strategies to increase your ROI and market presence." },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-gray-50 rounded-3xl hover:bg-orange-50 transition-colors cursor-pointer group"
                  >
                    <div className="bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm mb-6 text-gray-800 group-hover:text-orange-500 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- SERVICES ACCORDION SECTION --- */}
          <ServicesAccordion />

          {/* --- NEW SECTION: WHY CHOOSE US --- */}
          <section className="pt-30 pb-20 bg-black text-white overflow-hidden relative">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Smarter solutions for <br /><span className="text-orange-500">modern problems.</span></h2>
                <p className="text-gray-400 text-lg mb-8">
                  We don't just build software; we build partnerships. Our agile approach ensures that we adapt to your needs instantly.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "24/7 Dedicated Support",
                    "Scalable Cloud Architecture",
                    "User-Centric Design Philosophy"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-orange-500 rounded-full p-1"><Zap size={14} className="text-black" /></div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                      <Code className="text-orange-500 mb-2" />
                      <div className="font-bold text-2xl">150+</div>
                      <div className="text-sm text-gray-500">Projects Done</div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                      <MessageCircle className="text-blue-400 mb-2" />
                      <div className="font-bold text-lg">Instant Comms</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-32 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765178698/3bff078c-6b38-423a-8608-f8c5fc2d30ec_wjxvgj.jpg" 
                        alt="Business Growth Chart"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                      <div className="font-bold text-2xl">98%</div>
                      <div className="text-sm text-gray-500">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </div>
  );
}