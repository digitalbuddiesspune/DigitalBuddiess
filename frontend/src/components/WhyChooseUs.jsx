import React from 'react';
import { motion } from 'framer-motion';
import { Code, MessageCircle, Zap } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 bg-black text-white overflow-hidden relative">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Smarter solutions for <br className="hidden sm:block" /><span className="text-orange-500">modern problems.</span></h2>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">
            We don't just build software; we build partnerships. Our agile approach ensures that we adapt to your needs instantly.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            {[
              "24/7 Dedicated Support",
              "Scalable Cloud Architecture",
              "User-Centric Design Philosophy"
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className="bg-orange-500 rounded-full p-1"><Zap size={12} className="sm:w-3.5 sm:h-3.5 text-black" /></div>
                <span className="font-medium text-sm sm:text-base">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 md:mt-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4 translate-y-4 sm:translate-y-6 md:translate-y-8">
              <div className="bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800">
                <Code className="text-orange-500 mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                <div className="font-bold text-xl sm:text-2xl">150+</div>
                <div className="text-xs sm:text-sm text-gray-500">Projects Done</div>
              </div>
              <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-700">
                <MessageCircle className="text-blue-400 mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                <div className="font-bold text-base sm:text-lg">Instant Comms</div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-700 h-24 sm:h-28 md:h-32 flex items-center justify-center overflow-hidden">
                <svg 
                  viewBox="0 0 240 120" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Background gradient */}
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#f97316", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#ea580c", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:"#f97316", stopOpacity:0.8}} />
                      <stop offset="100%" style={{stopColor:"#f97316", stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines - subtle */}
                  <line x1="25" y1="95" x2="215" y2="95" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
                  <line x1="25" y1="75" x2="215" y2="75" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
                  <line x1="25" y1="55" x2="215" y2="55" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
                  <line x1="25" y1="35" x2="215" y2="35" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
                  <line x1="25" y1="15" x2="215" y2="15" stroke="#4b5563" strokeWidth="0.5" opacity="0.5" />
                  
                  {/* Growing bars with gradient - progressive growth */}
                  <rect x="30" y="80" width="24" height="15" fill="url(#barGradient)" rx="3" />
                  <rect x="65" y="70" width="24" height="25" fill="url(#barGradient)" rx="3" />
                  <rect x="100" y="55" width="24" height="40" fill="url(#barGradient)" rx="3" />
                  <rect x="135" y="40" width="24" height="55" fill="url(#barGradient)" rx="3" />
                  <rect x="170" y="20" width="24" height="75" fill="url(#barGradient)" rx="3" />
                  
                  {/* Growth trend line - smooth curve */}
                  <path 
                    d="M 42 87 Q 52 82, 77 77 Q 102 72, 112 67 Q 122 62, 147 52 Q 172 42, 182 37" 
                    fill="none" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Upward arrow at the end - pointing to growth */}
                  <path 
                    d="M 177 37 L 182 30 L 187 37 L 182 35 Z" 
                    fill="#f97316"
                  />
                  <circle cx="182" cy="30" r="2" fill="#f97316" />
                  
                  {/* Business Growth label - styled */}
                  <text 
                    x="120" 
                    y="110" 
                    fontSize="9" 
                    fill="#d1d5db" 
                    textAnchor="middle" 
                    fontFamily="system-ui, -apple-system, sans-serif" 
                    fontWeight="700"
                    letterSpacing="2"
                  >
                    BUSINESS GROWTH
                  </text>
                </svg>
              </div>
              <div className="bg-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800">
                <div className="font-bold text-xl sm:text-2xl">98%</div>
                <div className="text-xs sm:text-sm text-gray-500">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

