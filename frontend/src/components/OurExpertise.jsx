import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Target,
  Video,
  Users,
  Search,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Pause,
  Play
} from 'lucide-react';

const OurExpertise = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const navigate = useNavigate();

  const expertiseList = [
    {
      id: 1,
      categoryTag: '01 // SOCIAL GROWTH',
      title: 'Social Media Management & Growth',
      desc: 'Complete organic management across Instagram, Facebook, LinkedIn, and YouTube. We craft engaging content calendars, community interactions, and brand-first aesthetic feeds that turn casual scrollers into loyal brand advocates.',
      icon: Share2,
      metric: '+340% Engagement',
      deliverables: [
        'Curated Monthly Content Calendars & Grid Curation',
        'Daily Story Strategies, Polls & Active DM Engagement',
        'Viral Reel Hooks & Real-Time Trend Capitalization'
      ],
      technologies: ['Instagram', 'LinkedIn', 'Facebook', 'YouTube Shorts', 'TikTok'],
      accentColor: 'from-orange-500/20 via-orange-500/5 to-transparent'
    },
    {
      id: 2,
      categoryTag: '02 // PERFORMANCE ADS',
      title: 'Meta & Google Performance Ads',
      desc: 'Hyper-targeted advertising campaigns across Meta (Instagram & Facebook) and Google Ads (Search, YouTube & Shopping). We leverage AI lookalikes, behavioural retargeting, and rigorous creative testing to maximize every marketing dollar.',
      icon: Target,
      metric: 'Avg 4.8x ROAS',
      deliverables: [
        'High-Converting Ad Creatives & Copywriting Angles',
        'Full-Funnel Retargeting & Cart Recovery Campaigns',
        'Conversions API (CAPI), Pixel Setup & GA4 Attribution'
      ],
      technologies: ['Meta Ads Manager', 'Google Ads', 'YouTube Ads', 'Lookalike Audiences', 'CAPI Tracking'],
      accentColor: 'from-amber-500/20 via-amber-500/5 to-transparent'
    },
    {
      id: 3,
      categoryTag: '03 // VIDEO & CREATIVE',
      title: 'Viral Short-Form Video & Reels',
      desc: 'High-energy Reels, TikToks, and YouTube Shorts engineered with psychology-backed 3-second hooks, dynamic pacing, custom sound design, and sharp storytelling that captivate audiences and ignite viral reach.',
      icon: Video,
      metric: '10M+ Video Views',
      deliverables: [
        'Scroll-Stopping 3-Second Hooks & Dynamic Scriptwriting',
        'Professional On-Site Video Shoots & Motion Graphics',
        'Multi-Platform Aspect Ratio Formatting & Subtitling'
      ],
      technologies: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'Motion Design', 'Video Editing'],
      accentColor: 'from-orange-500/20 via-orange-500/5 to-transparent'
    },
    {
      id: 4,
      categoryTag: '04 // INFLUENCER & UGC',
      title: 'Influencer Collaborations & UGC',
      desc: 'Connect your brand with high-affinity creators and micro-influencers. We source, negotiate, and manage high-performing User-Generated Content (UGC) campaigns that build genuine social proof and supercharge your ad conversion rates.',
      icon: Users,
      metric: '8.5x Brand Trust',
      deliverables: [
        'Creator Sourcing, Vetting & Briefing Management',
        'Authentic UGC Video Assets Optimized for Paid Ads',
        'Product Seeding, Ambassador Programs & Whitelisting'
      ],
      technologies: ['Micro-Influencers', 'UGC Creators', 'Creator Whitelisting', 'Product Seeding', 'Affiliates'],
      accentColor: 'from-amber-500/20 via-amber-500/5 to-transparent'
    },
    {
      id: 5,
      categoryTag: '05 // SEARCH DOMINANCE',
      title: 'SEO & Organic Search Visibility',
      desc: 'Capture ready-to-buy customers at the exact moment they search. Through deep commercial keyword research, on-page content architecture, high-authority backlink building, and technical SEO, we position you at the top of Google.',
      icon: Search,
      metric: '#1 Page Rankings',
      deliverables: [
        'Commercial Intent Keyword Research & Content Clusters',
        'Technical On-Page Audits & Core Web Vitals Optimization',
        'Google Business Profile (GMB) & Local Map Pack Ranking'
      ],
      technologies: ['Google Search Console', 'Semrush', 'Ahrefs', 'Local SEO', 'Schema Markup'],
      accentColor: 'from-orange-500/20 via-orange-500/5 to-transparent'
    },
    {
      id: 6,
      categoryTag: '06 // RETENTION & FUNNELS',
      title: 'Email, WhatsApp & Retention Funnels',
      desc: 'Turn one-time visitors into repeat purchasers. We architect automated email nurture sequences, high-converting WhatsApp broadcasts, and behavioral SMS funnels that skyrocket your customer lifetime value (LTV).',
      icon: MessageCircle,
      metric: '42%+ Open Rates',
      deliverables: [
        'Automated Welcome & Abandoned Checkout Sequences',
        'Targeted WhatsApp Broadcasts & Chatbot Automations',
        'VIP Customer Loyalty Funnels & Win-Back Triggers'
      ],
      technologies: ['Klaviyo', 'WhatsApp Business API', 'Brevo', 'SMS Marketing', 'Automated Funnels'],
      accentColor: 'from-amber-500/20 via-amber-500/5 to-transparent'
    }
  ];

  // Update cardsPerView according to viewport width: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = expertiseList.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  // Keep currentIndex within bounds if cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-scroll every 3.5 seconds with pause capability
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const stats = [
    { value: '50M+', label: 'Organic Impressions', sub: 'Client social accounts' },
    { value: '4.8x', label: 'Average Client ROAS', sub: 'Measured ad returns' },
    { value: '350+', label: 'Campaigns Run', sub: 'Across multiple verticals' },
    { value: '+340%', label: 'Engagement Surge', sub: 'Within the first 90 days' }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black text-white overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Background Decorative Ambient Glows */}
      <div 
        className="absolute top-0 right-0 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/4"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            {/* Pill Badge */}
           

            {/* Smaller, Refined Heading */}
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl capitalize text-white leading-[1.15] tracking-tight">
              Turn attention into revenue with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300">
                high-impact marketing.
              </span>
            </h2>

            {/* Smaller, Refined Paragraph */}
            <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6] mt-2.5 max-w-xl">
              From viral short-form video production and high-converting Meta & Google ad campaigns to influencer partnerships and search dominance, we help brands capture attention and multiply ROI.
            </p>
          </div>

          {/* Carousel Desktop Navigation Controls */}
          <div className="flex items-center gap-2.5">
            {/* Slide Index Badge */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-subheading font-medium text-neutral-400">
              <span className="text-orange-400">0{currentIndex + 1}</span>
              <span>/</span>
              <span>0{maxIndex + 1}</span>
            </div>

            {/* Pause/Play Toggle Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 text-neutral-400 hover:text-white transition-all cursor-pointer"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play size={13} className="text-orange-400" /> : <Pause size={13} />}
            </button>

            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-white hover:text-orange-400 transition-all duration-200 cursor-pointer shadow-md shadow-black/40 hover:scale-105 active:scale-95"
              aria-label="Previous services slide"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-white hover:text-orange-400 transition-all duration-200 cursor-pointer shadow-md shadow-black/40 hover:scale-105 active:scale-95"
              aria-label="Next services slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="relative overflow-hidden py-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {expertiseList.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-full min-w-full sm:w-1/2 sm:min-w-[50%] lg:w-1/3 lg:min-w-[33.333333%] px-2 sm:px-2.5 flex-shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950/90 border border-neutral-800/80 hover:border-orange-500/50 transition-all duration-300 shadow-lg shadow-black/40 overflow-hidden cursor-pointer"
                    onClick={() => navigate('/contact-us')}
                  >
                    {/* Subtle Ambient Gradient Wash on Hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-b ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-0`}
                    />

                    {/* Top Row: Icon + Metric Tag */}
                    <div className="relative z-10 flex items-start justify-between mb-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-neutral-800/90 border border-neutral-700/60 flex items-center justify-center text-orange-500 group-hover:text-orange-400 group-hover:border-orange-500/40 group-hover:scale-105 transition-all duration-300 shadow-inner">
                        <IconComponent className="w-5 h-5 stroke-[1.8]" />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-subheading font-medium text-neutral-400 uppercase tracking-wider">
                          {item.categoryTag}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-500/10 border border-orange-500/25 text-orange-400">
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    {/* Card Main Info */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Smaller Card Title */}
                        <h3 className="font-subheading font-semibold text-base sm:text-lg text-white group-hover:text-orange-400 transition-colors duration-200 leading-[1.3] mb-2">
                          {item.title}
                        </h3>

                        {/* Smaller Card Description */}
                        <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6] mb-4 line-clamp-3">
                          {item.desc}
                        </p>

                        {/* Smaller Key Deliverables Bullet List */}
                        <div className="space-y-1.5 mb-4 pt-3 border-t border-neutral-800/80">
                          {item.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                              <span className="font-paragraph truncate">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Marketing Channels & Interactive Action */}
                      <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-3">
                        {/* Smaller Platform Tags */}
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-neutral-800/60 border border-neutral-700/50 text-neutral-300 group-hover:border-neutral-600 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Link */}
                        <div className="flex items-center justify-between text-xs font-subheading font-medium text-orange-400 group-hover:text-orange-300 transition-colors pt-0.5">
                          <span>Scale with this Service</span>
                          <div className="w-5 h-5 rounded-full bg-neutral-800 group-hover:bg-orange-500 group-hover:text-black text-orange-400 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6 sm:mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm shadow-orange-500/50'
                  : 'w-2 bg-neutral-800 hover:bg-neutral-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Smaller Stats & Trust Impact Strip */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 md:divide-x divide-neutral-800/80">
            {stats.map((stat, sIdx) => (
              <div 
                key={sIdx} 
                className={`flex flex-col items-center text-center ${sIdx !== 0 ? 'pt-4 sm:pt-0 md:pl-4' : ''}`}
              >
                <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 leading-tight mb-0.5">
                  {stat.value}
                </div>
                <div className="font-subheading font-medium text-xs sm:text-sm text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="font-paragraph text-[11px] sm:text-xs text-neutral-400">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smaller Bottom Fast Action Banner */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-950/30 via-neutral-900/80 to-neutral-900/80 border border-orange-500/25">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 items-center justify-center text-orange-400 shrink-0">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-subheading font-semibold text-sm sm:text-base text-white">
                Ready to scale your social presence and maximize ad ROI?
              </h4>
              <p className="font-paragraph text-xs text-neutral-400 mt-0.5">
                Our growth strategists will audit your current social channels, ad accounts, and conversion funnels at zero cost.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/contact-us')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-subheading font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            <span>Claim Free Marketing Audit</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default OurExpertise;
