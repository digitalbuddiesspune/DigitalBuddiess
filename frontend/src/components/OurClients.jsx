import React from 'react';
import { motion } from 'framer-motion';

const OurClients = () => {
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
    <section className="py-12 sm:py-16 md:py-20 bg-black text-white overflow-hidden relative">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-orange-500">Clients</span>
          </h2>
        </motion.div>
      </div>

      {/* First Carousel - Left to Right */}
      <div className="overflow-hidden py-4 sm:py-6 md:py-8 relative z-10">
        <div className="flex animate-scroll-left">
          {[...firstRowImages, ...firstRowImages].map((img, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {img ? (
                  <img 
                    src={img} 
                    alt={`Client ${index + 1}`}
                    className="w-full h-full object-contain p-1 sm:p-2"
                  />
                ) : (
                  <div className="text-gray-400 text-xs sm:text-sm">Client Logo</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Carousel - Right to Left */}
      <div className="overflow-hidden py-4 sm:py-6 md:py-8 relative z-10">
        <div className="flex animate-scroll-right">
          {[...secondRowImages, ...secondRowImages].map((img, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {img ? (
                  <img 
                    src={img} 
                    alt={`Client ${index + 21}`}
                    className="w-full h-full object-contain p-1 sm:p-2"
                  />
                ) : (
                  <div className="text-gray-400 text-xs sm:text-sm">Client Logo</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;

