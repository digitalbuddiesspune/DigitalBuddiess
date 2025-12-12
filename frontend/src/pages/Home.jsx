import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WhatWeOffer from "../components/WhatWeOffer";
import ContactUsSection from "../components/ContactUsSection";
import OurExpertise from "../components/OurExpertise";
import OurClients from "../components/OurClients";
import WhyChooseUs from "../components/WhyChooseUs";

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
          ease: "easeInOut",
        },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-light tracking-wider"
      >
        Welcome to{" "}
        <span className="font-bold text-orange-500">digital buddies</span>
      </motion.h1>

      {/* Loading Bar */}
      <motion.div className="mt-8 h-1 bg-gray-800 rounded-full w-48 overflow-hidden">
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
  const videoUrl =
    "https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765265102/Digital_Buddies_Ad_Video_2_3_hlw0gd.mp4";
  const videoUrl2 =
    "https://res.cloudinary.com/dvkxgrcbv/video/upload/v1765558319/DB_Video_1_yajawf.mp4";

  return (
    <>
     <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src={videoUrl2} type="video/mp4" />
        </video>
      </div>
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden z-0">
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
     
    </>
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

export default function LandingPage() {
  // Only show preloader on the very first visit, not when navigating from navbar
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("preloaderShown")
  );

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  // Mark preloader as shown in sessionStorage when it completes
  useEffect(() => {
    if (!loading) {
      sessionStorage.setItem("preloaderShown", "true");
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
          <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
            {/* Video Background */}
            <VideoBackground />

            {/* Button - Centered at Bottom */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center px-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 sm:gap-4 bg-white text-black pl-4 sm:pl-8 pr-2 py-2 sm:py-2.5 rounded-full text-sm sm:text-base md:text-lg shadow-xl group justify-center"
              >
                <span className="text-xs sm:text-base md:text-lg">
                  Get Started Now
                </span>
                <div className="bg-black text-white rounded-full p-1.5 sm:p-2 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </div>
              </motion.button>
            </div>
          </section>

          {/* --- SERVICES ACCORDION SECTION (What We Offer) --- */}
          <WhatWeOffer />

          {/* --- CONTACT US SECTION --- */}
          <ContactUsSection />

          {/* --- NEW SECTION: OUR EXPERTISE --- */}
          <OurExpertise />

          {/* --- OUR CLIENTS SECTION --- */}
          <OurClients />

          {/* --- NEW SECTION: WHY CHOOSE US --- */}
          <WhyChooseUs />
        </motion.main>
      )}
    </div>
  );
}
