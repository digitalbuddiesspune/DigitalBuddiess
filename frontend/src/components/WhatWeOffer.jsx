import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Zap,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

const WhatWeOffer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 0,
      title: "Digital Marketing Services",
      subtitle: "Grow your brand & generate measurable ROI.",
      categoryLabel: "01 / PERFORMANCE",
      description: "End-to-end digital marketing solutions combining targeted Meta & Google ads, data-driven SEO, creative campaigns, and lead-gen funnels.",
      badge: "High ROI",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&auto=format&fit=crop&q=80",
    
      highlights: [
        "Social Media & Performance Marketing",
        "Meta & Google Ads Campaign Management",
        "Search Engine Optimization (SEO)",
        "Lead Gen & Conversion Rate Optimization"
      ],
      metrics: "Avg 3.8x ROAS"
    },
    {
      id: 1,
      title: "Web & App Development",
      subtitle: "Build digital experiences that work.",
      categoryLabel: "02 / TECH & ENGINEERING",
      description: "Engineering ultra-fast, responsive web applications and mobile apps crafted for engagement, speed, and business growth.",
      badge: "Ultra-Fast",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      highlights: [
        "Custom Web & SaaS Apps",
        "Cross-Platform Mobile Apps",
        "Modern React & Next.js Stacks",
        "Secure API Architectures"
      ],
      metrics: "99.9% Performance Score"
    },
    {
      id: 2,
      title: "Advertising & Performance Marketing",
      subtitle: "Turn Clicks Into Customers",
      categoryLabel: "03 / PAID MEDIA",
      description: "Boost ROI with AI-driven performance marketing, high-impact multi-channel campaigns, precision retargeting, and conversion optimization.",
      badge: "AI Powered",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&auto=format&fit=crop&q=80",
      highlights: [
        "AI-Driven Campaign Optimization",
        "Google & Meta Paid Advertising",
        "Precision Retargeting & Lookalikes",
        "High-Converting Ad Creatives"
      ],
      metrics: "AI Performance Optimized"
    },
    {
      id: 3,
      title: "Branding Services",
      subtitle: "Crafting iconic brand identities.",
      categoryLabel: "04 / VISUAL IDENTITY",
      description: "Develop memorable logos, refined brand guidelines, and unique visual systems that position your business above competitors.",
      badge: "Creative",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&auto=format&fit=crop&q=80",
      highlights: [
        "Logo & Complete Visual Identity",
        "Brand Strategy & Positioning",
        "Typography & Design Guidelines",
        "Marketing Collateral & Assets"
      ],
      metrics: "Award-Winning Craft"
    },
    {
      id: 4,
      title: "Ecommerce Marketing",
      subtitle: "Boost your online store sales.",
      categoryLabel: "05 / E-COMMERCE",
      description: "Supercharge your online store revenues with conversion optimization, automated cart recovery, and high-converting catalog ads.",
      badge: "Revenue Growth",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
      highlights: [
        "Shopify & WooCommerce Growth",
        "Conversion Rate Optimization (CRO)",
        "Automated Email & SMS Funnels",
        "Product Catalog & Shopping Ads"
      ],
      metrics: "+180% Avg Sales Boost"
    },
    {
      id: 5,
      title: "Support & Maintenance",
      subtitle: "Reliable, secure & always online.",
      categoryLabel: "06 / CLOUD & OPS",
      description: "Keep your digital infrastructure bulletproof with 24/7 uptime monitoring, security audits, cloud scaling, and ongoing updates.",
      badge: "24/7 Live",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
      highlights: [
        "24/7 Uptime & Performance Monitoring",
        "Security Audits & Patching",
        "Cloud Infrastructure Scaling",
        "Rapid Bug Fixes & Tech Support"
      ],
      metrics: "24/7 Guaranteed Uptime"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex, services.length]);

  const handleCardClick = (serviceId) => {
    navigate('/service', { state: { selectedService: serviceId } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Calculate circular relative offset (-1 = left, 0 = center, 1 = right)
  const getDiff = (index) => {
    const total = services.length;
    let diff = (index - currentIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  // Calculate exact positioning for 3-card viewport coverflow
  // Middle card upfront (0%), side cards shifted 104% (50% of card width in viewport, 70% opacity)
  const getCardAnimation = (diff) => {
    if (diff === 0) {
      // Middle card upfront
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto',
      };
    }
    if (diff === -1) {
      // Left card: exactly 50% width visible in viewport, 70% opacity
      return {
        x: '-104%',
        scale: 0.9,
        opacity: 0.7,
        zIndex: 10,
        pointerEvents: 'auto',
      };
    }
    if (diff === 1) {
      // Right card: exactly 50% width visible in viewport, 70% opacity
      return {
        x: '104%',
        scale: 0.9,
        opacity: 0.7,
        zIndex: 10,
        pointerEvents: 'auto',
      };
    }
    if (diff < -1) {
      // Off-screen left
      return {
        x: '-210%',
        scale: 0.75,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
    // Off-screen right
    return {
      x: '210%',
      scale: 0.75,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
    };
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#121212] text-white overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Radiant ambient glow blobs behind cards */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-32 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Decorative subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-4 sm:px-0">
         

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] mb-3"
          >
            <span className="text-white">Boost ROI with </span>
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
              AI-Driven Performance Marketing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6] max-w-xl mx-auto"
          >
            Digital Infusive proudly stands as one of the most trusted partners by companies across the globe to grow their digital presence.
          </motion.p>
        </div>

        {/* 3-Cards Viewport Stage: Same coverflow design on mobile and desktop */}
        <div
          className="relative w-full py-2 sm:py-6 overflow-hidden flex flex-col items-center justify-center select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Sliding Track */}
          <div className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            {services.map((service, index) => {
              const diff = getDiff(index);
              const anim = getCardAnimation(diff);
              const isCenter = diff === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={false}
                  animate={anim}
                  transition={{
                    duration: 0.65,
                    ease: [0.25, 1, 0.5, 1], // Apple-style smooth cubic-bezier
                  }}
                  onClick={() => {
                    if (diff === -1) handlePrev();
                    else if (diff === 1) handleNext();
                    else handleCardClick(service.id);
                  }}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[55vw] sm:w-[50vw] md:w-[500px] lg:w-[600px] xl:w-[660px] rounded-[22px] sm:rounded-[30px] md:rounded-[32px] overflow-hidden border transition-shadow duration-500 select-none cursor-pointer flex flex-col justify-between ${isCenter
                      ? 'border-orange-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(249,115,22,0.18)] bg-gradient-to-b from-[#1e1e22] via-[#161618] to-[#0f0f11]'
                      : 'border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] bg-gradient-to-b from-[#18181a] via-[#141416] to-[#0c0c0e] hover:border-white/25'
                    }`}
                  style={{
                    height: '100%',
                  }}
                >
                  {/* Subtle Accent Glow Inside Card */}
                  <div className={`absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${isCenter ? 'bg-orange-500/15 opacity-100' : 'bg-orange-500/5 opacity-40'
                    }`}></div>

                  <div>
                    {/* Top Bar: Category, Brand, & Badge */}
                    <div className="px-3 sm:px-5 md:px-7 py-2 sm:py-3.5 border-b border-white/10 flex items-center justify-between font-subheading text-[10px] sm:text-xs">
                      <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-orange-400">
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isCenter ? 'bg-orange-500 animate-pulse' : 'bg-gray-500'}`}></span>
                        <span className="truncate hidden sm:block">{service.categoryLabel}</span>
                      </div>
                      <div className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        Digital Buddiess
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider border ${isCenter
                          ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                          : 'bg-white/5 border-white/10 text-gray-400'
                        }`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Card Hero Visual (Artwork / Mockup) */}
                    <div className="px-3 sm:px-5 md:px-7 pt-2.5 sm:pt-4 md:pt-5">
                      <div className="relative aspect-[16/9] sm:aspect-[16/8] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-2.5 sm:p-4 md:p-5">
                          <h3 className="font-subheading font-bold text-xs sm:text-sm md:text-base lg:text-lg text-white leading-tight drop-shadow-md line-clamp-1">
                            {service.title}
                          </h3>
                          <p className="font-paragraph font-medium text-[9px] sm:text-xs md:text-sm text-orange-300 mt-0.5 sm:mt-1 line-clamp-1">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service Capabilities List */}
                    <div className="px-3 sm:px-5 md:px-7 py-2 sm:py-3.5">
                      <p className="font-paragraph font-normal text-[10px] sm:text-xs md:text-sm text-gray-300 line-clamp-2 leading-snug sm:leading-relaxed mb-2 sm:mb-3">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 font-paragraph">
                        {service.highlights.slice(0, 4).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[9px] sm:text-xs text-gray-300 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="px-3 sm:px-5 md:px-7 py-2 sm:py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between font-subheading text-[10px] sm:text-xs">
                    <span className="text-[9px] sm:text-xs font-semibold text-gray-400 truncate max-w-[50%]">
                      {service.metrics}
                    </span>
                    <div className={`flex items-center gap-1.5 font-semibold transition-colors ${isCenter ? 'text-orange-400 hover:text-orange-300' : 'text-gray-400'
                      }`}>
                      <span>Explore</span>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all ${isCenter ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.5)]' : 'bg-white/10 text-white'
                        }`}>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Left / Right Chevron Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-orange-500 border border-white/20 hover:border-orange-500 text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer group"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-orange-500 border border-white/20 hover:border-orange-500 text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer group"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Carousel Pagination & 3-Second Cycle Progress Bar */}
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-6 z-30">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {services.map((service, index) => {
                const isActive = currentIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                        ? 'w-7 sm:w-10 bg-orange-500/30'
                        : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {isActive && (
                      <motion.div
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: isPaused ? 0 : 3,
                          ease: "linear"
                        }}
                        className="h-full bg-orange-500 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Subtle Carousel Status Label */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-subheading font-medium text-gray-400">
              <span>0{currentIndex + 1} / 0{services.length}</span>
             
              {/* <span className="flex items-center gap-1 text-gray-400">
                {isPaused ? (
                  <>
                    <Pause className="w-2.5 h-2.5 text-orange-400" />
                    Paused
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 text-orange-400" />
                    Auto (3s)
                  </>
                )}
              </span> */}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 sm:mt-20 mx-4 sm:mx-0 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-950 border border-gray-800/80 relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl"
        >
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            <div className="font-subheading inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
              Custom Tailored Strategy
            </div>
            <h3 className="font-subheading font-semibold text-base sm:text-lg text-white mb-1.5 leading-[1.35]">
              Need a bespoke digital package?
            </h3>
            <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6]">
              We engineer custom roadmaps tailored to your company's unique growth targets, timeline, and tech stack.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto shrink-0 font-subheading">
            <button
              onClick={() => {
                navigate('/service');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base shadow-[0_10px_30px_rgba(234,88,12,0.35)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                navigate('/contact-us');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-gray-800/90 hover:bg-gray-800 text-white font-semibold text-sm sm:text-base border border-gray-700/80 hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" />
              <span>Let's Talk</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
