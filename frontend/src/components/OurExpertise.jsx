import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, BarChart } from 'lucide-react';

const OurExpertise = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black text-white overflow-hidden relative">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 sm:mb-12 text-center md:text-left">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Our Expertise</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-white">Everything you need to grow.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { icon: <Globe size={32} />, title: "Web Development", desc: "Lightning fast websites built with modern technologies like React and Next.js." },
            { icon: <Smartphone size={32} />, title: "App Design", desc: "Intuitive mobile experiences for iOS and Android that users fall in love with." },
            { icon: <BarChart size={32} />, title: "Digital Marketing", desc: "Data-driven strategies to increase your ROI and market presence." },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-6 sm:p-8 bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-gray-800 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl shadow-sm mb-4 sm:mb-6 text-orange-500 group-hover:text-orange-400 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;

