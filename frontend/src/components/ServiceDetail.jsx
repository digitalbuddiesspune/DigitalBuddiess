import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

const ServiceDetail = ({ 
  serviceTitle, 
  description, 
  subServices = [], 
  whyChooseUs, 
  closingTagline 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);

  // Placeholder images
  const images = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const activeSub = subServices[selectedSubIndex] || subServices[0];

  return (
    <motion.div 
      className="mt-4 py-4 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Sub-Services Selection List */}
        <div className="lg:col-span-4 space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="text-xs font-subheading font-bold uppercase tracking-wider text-orange-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Capabilities ({subServices.length})
          </div>
          {subServices.map((subService, index) => {
            const isSelected = selectedSubIndex === index;
            return (
              <motion.button
                key={index}
                onClick={() => setSelectedSubIndex(index)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-subheading font-medium text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-orange-500/15 border-orange-500 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.15)] font-semibold' 
                    : 'bg-gray-800/80 text-gray-300 border-gray-700/80 hover:border-gray-600 hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="truncate pr-2">
                  <span className="text-gray-500 mr-2 font-mono text-xs">{index + 1}.</span>
                  {subService.title}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-orange-400 translate-x-0.5' : 'text-gray-500'}`} />
              </motion.button>
            );
          })}
        </div>

        {/* Middle Column: Selected Sub-Service Description & Overview */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-gray-950/60 p-5 sm:p-6 rounded-2xl border border-gray-800/80 shadow-lg">
            {activeSub && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSubIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-subheading font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    Feature {selectedSubIndex + 1} of {subServices.length}
                  </div>
                  <h4 className="text-lg sm:text-xl font-subheading font-bold text-white tracking-tight leading-[1.4]">
                    {activeSub.title}
                  </h4>
                  <p className="font-paragraph text-gray-300 text-sm sm:text-base leading-relaxed">
                    {activeSub.description || description}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Main Service Overview Snippet */}
          <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/60">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-subheading font-semibold block mb-1">
              Service Overview
            </span>
            <p className="font-paragraph text-gray-400 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right Column: Visual Preview Carousel */}
        <div className="lg:col-span-3">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] border border-gray-700/80 shadow-xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${serviceTitle} preview ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white hover:text-black p-1.5 sm:p-2 rounded-full backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              aria-label="Previous image"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-500 text-white hover:text-black p-1.5 sm:p-2 rounded-full backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              aria-label="Next image"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section (if provided) */}
      {whyChooseUs && whyChooseUs.length > 0 && (
        <div className="pt-6 border-t border-gray-800/80">
          <div className="mb-4">
            <h5 className="text-base sm:text-lg font-subheading font-bold text-white flex items-center gap-2">
              <span className="text-orange-500">Why Choose Us</span> for {serviceTitle}?
            </h5>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {whyChooseUs.map((point, i) => (
              <div 
                key={i} 
                className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-900/60 border border-gray-800/70 hover:border-orange-500/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="font-paragraph text-xs sm:text-sm text-gray-300 font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Tagline Banner (if provided) */}
      {closingTagline && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/25 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="font-subheading text-sm sm:text-base font-semibold text-white">
            {closingTagline}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceDetail;
