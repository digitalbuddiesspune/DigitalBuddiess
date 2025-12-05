import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, BarChart, Smartphone, Zap, Globe, MessageCircle } from 'lucide-react';

/* --- COMPONENTS --- */

// 1. Loading Screen
const Preloader = ({ setLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: -50, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
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

// 2. 3D Floating Shape (Abstract representation of your image's shapes)
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

const Navbar = () => (
  <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto w-full">
    <div className="font-bold text-2xl tracking-tighter">digital<span className="text-orange-500">buddies</span>.</div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
      <a href="#" className="hover:text-black transition">Work</a>
      <a href="#" className="hover:text-black transition">Services</a>
      <a href="#" className="hover:text-black transition">About</a>
    </div>
    <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-orange-500 transition-colors">
      Contact Us
    </button>
  </nav>
);

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
    <div className="min-h-screen bg-[#F9F9F9] text-gray-900 font-sans selection:bg-orange-200">
      <AnimatePresence>
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />

          {/* --- HERO SECTION (Based on your Image) --- */}
          <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-5xl mx-auto">
            {/* Abstract Floating Shapes imitating the image */}
            <FloatingShape delay={0} className="top-20 left-10 scale-125" />
            <FloatingShape delay={1.5} className="bottom-20 right-20 scale-75" />
            <FloatingShape delay={0.5} className="top-40 right-10 scale-90" />
            <FloatingShape delay={2} className="bottom-40 left-20 scale-110" />

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-semibold leading-tight mb-6 z-10"
            >
              We offer the best digital solutions<br />
              for <span className="font-serif italic font-light">your business.</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-2xl text-lg md:text-xl leading-relaxed mb-10 z-10"
            >
              Whether you're a startup or an established business, we help you connect with your audience, boost engagement, and grow online—smarter and faster.
            </motion.p>

            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 bg-black text-white pl-8 pr-2 py-2 rounded-full text-lg shadow-xl z-10 group"
            >
              Get Started Now
              <div className="bg-white text-black rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </section>

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

          {/* --- NEW SECTION: WHY CHOOSE US --- */}
          <section className="py-20 bg-black text-white overflow-hidden relative">
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
                      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-32"></div>
                      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                         <div className="font-bold text-2xl">98%</div>
                         <div className="text-sm text-gray-500">Client Satisfaction</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="py-12 px-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold">digital<span className="text-orange-500">buddies</span>.</h2>
                <p className="text-sm text-gray-500 mt-1">© 2024 All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-gray-600">
                 <a href="#" className="hover:text-orange-500 transition">Privacy</a>
                 <a href="#" className="hover:text-orange-500 transition">Terms</a>
                 <a href="#" className="hover:text-orange-500 transition">Twitter</a>
                 <a href="#" className="hover:text-orange-500 transition">LinkedIn</a>
              </div>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}