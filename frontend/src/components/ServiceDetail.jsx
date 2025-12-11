import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ServiceDetail = ({ serviceTitle, description, subServices }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Placeholder images - replace with actual images
  const images = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <motion.div 
      className="mt-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Sub-services as pills */}
        <div className="space-y-3">
          {subServices.map((subService, index) => (
            <motion.button
              key={index}
              className="w-full px-4 py-2.5 bg-gray-800 text-gray-200 rounded-full text-sm font-medium text-left border border-gray-700 hover:border-orange-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "#1f2937",
                borderColor: "#f97316",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {subService.title}
            </motion.button>
          ))}
        </div>

        {/* Middle Column - Description */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-gray-300 text-base leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Right Column - Image Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[4/3] border border-gray-700">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${serviceTitle} illustration ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <motion.button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              aria-label="Previous image"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              aria-label="Next image"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ServiceDetail

