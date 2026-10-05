import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  PhoneCall, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Flame,
  CheckCircle2
} from 'lucide-react';

// Social Media Icons
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Interactive floating social pills with subtle hover physics
  const FloatingSocialPill = ({ icon: Icon, label, handle, href, colorClass, borderClass, bgClass, positionClass, delay }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const pillRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!pillRef.current) return;
      const rect = pillRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 120) {
        const angle = Math.atan2(deltaY, deltaX);
        const force = 18;
        setOffset({
          x: -Math.cos(angle) * force,
          y: -Math.sin(angle) * force
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    const PillContent = (
      <div
        ref={pillRef}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gray-950/80 backdrop-blur-md border ${borderClass} shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer`}
      >
        <div className={`w-7 h-7 rounded-full ${bgClass} flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        </div>
        <div className="text-left pr-1">
          <div className="text-[10px] font-paragraph text-gray-400 uppercase tracking-wider">{label}</div>
          <div className="text-xs font-subheading font-bold text-white leading-tight">{handle}</div>
        </div>
      </div>
    );

    return (
      <motion.div
        className={`absolute ${positionClass} hidden lg:flex items-center z-20`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {PillContent}
          </a>
        ) : (
          PillContent
        )}
      </motion.div>
    );
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-black text-white overflow-hidden">
      {/* Background Atmosphere Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 pointer-events-none" />

      {/* Floating Interactive Social Pills (Desktop) */}
      <FloatingSocialPill
        icon={InstagramIcon}
        label="Instagram"
        handle="@digitalbuddiess_pune"
        href="https://www.instagram.com/digitalbuddiess_pune?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
        colorClass="text-pink-500"
        borderClass="border-pink-500/30 hover:border-pink-500"
        bgClass="bg-pink-500/10"
        positionClass="left-6 xl:left-14 top-24"
        delay={0.2}
      />
      <FloatingSocialPill
        icon={FacebookIcon}
        label="Meta Ads"
        handle="High ROAS Scaling"
        colorClass="text-blue-500"
                href="https://www.instagram.com/digitalbuddiess_pune?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
        borderClass="border-blue-500/30 hover:border-blue-500"
        bgClass="bg-blue-500/10"
        positionClass="right-6 xl:right-14 top-28"
        delay={0.3}
      />
      <FloatingSocialPill
        icon={YoutubeIcon}
        label="YouTube"
        handle="10M+ Video Views"
        colorClass="text-red-500"
        borderClass="border-red-500/30 hover:border-red-500"
        bgClass="bg-red-500/10"
        positionClass="left-8 xl:left-20 bottom-24"
        delay={0.4}
      />
      <FloatingSocialPill
        icon={WhatsAppIcon}
        label="Instant Chat"
        handle="+91 94040 85316"
        href="https://wa.me/919404085316"
        colorClass="text-green-500"
        borderClass="border-green-500/30 hover:border-green-500"
        bgClass="bg-green-500/10"
        positionClass="right-8 xl:right-20 bottom-28"
        delay={0.5}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mb-8 sm:mb-12"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4 leading-[1.15] tracking-tight">
              Hire The Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Iconic Social Brands</span>
            </h2>
            <p className="font-paragraph text-xs sm:text-sm text-gray-300 leading-[1.6] max-w-xl mx-auto">
              From scroll-stopping reels and viral campaigns to hyper-targeted performance advertising, we engineer digital growth that delivers measurable ROI.
            </p>
          </motion.div>

          {/* Central Circular / Organic Glowing Video Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative mb-10 sm:mb-14"
          >
            {/* Pulsing Animated Glow Ring */}
            <div className="absolute -inset-2.5 sm:-inset-4 rounded-full bg-gradient-to-tr from-orange-500/40 via-amber-500/20 to-orange-600/40 blur-xl opacity-75 animate-pulse" />

            {/* Rotating Subtle Gradient Border Container */}
            <div className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] rounded-full p-1 sm:p-1.5 bg-gradient-to-b from-orange-500/60 via-gray-800 to-orange-500/30 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-black border border-white/10">
                
                {/* Embedded Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-105"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>

                {/* Aesthetic Dark Vignette Overlay with Message */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 flex flex-col items-center justify-between p-6 sm:p-8 text-center pointer-events-none">
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-subheading font-medium text-orange-400">
                      <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                      Social First Agency
                    </span>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 pb-2">
                    <p className="text-white text-[11px] sm:text-xs md:text-sm font-subheading font-bold uppercase tracking-wider text-gray-200">
                      Crafting Content For
                    </p>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-heading font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide">
                      Modern Brands
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto mb-10"
          >
            <button
              onClick={handleContactClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-subheading font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Strategy Session</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <a
              href="https://wa.me/919637319746"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900/90 hover:bg-gray-800 text-gray-200 hover:text-white font-subheading font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full border border-gray-700/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-green-400" />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>

          {/* Value Proposition Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-800/80 w-full max-w-4xl"
          >
            <div className="flex items-center justify-center gap-2.5 text-gray-300">
              <Clock className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-subheading text-xs sm:text-sm font-medium">
                24-Hour Fast Turnaround
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-gray-300">
              <TrendingUp className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-subheading text-xs sm:text-sm font-medium">
                Data & ROAS Focused
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-subheading text-xs sm:text-sm font-medium">
                100% Customized Solutions
              </span>
            </div>
          </motion.div>

          {/* Mobile Social Bar */}
          <motion.div
            className="lg:hidden mt-8 flex justify-center items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="https://www.instagram.com/digitalbuddiess_pune?stkn=MXZhc3VtajU1Y2F2YQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-pink-500 hover:bg-gray-800 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-800 transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-red-500 hover:bg-gray-800 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919404085316"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-green-500 hover:bg-gray-800 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;

