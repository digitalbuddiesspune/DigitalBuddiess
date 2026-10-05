import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, Users, CheckCircle, Lightbulb, Rocket, BarChart } from 'lucide-react';

function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: <Target size={32} />,
      title: 'Branding & Media',
      description: 'Building a brand that looks great, feels right, and connects with the people who matter.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Advertising',
      description: 'From social media ads to influencer campaigns — we design strategies that reach the right audience at the right time.'
    },
    {
      icon: <BarChart size={32} />,
      title: 'Digital Marketing',
      description: 'SEO, social media marketing, paid advertising, content strategy — everything your brand needs to stay visible and competitive.'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Web & App Development',
      description: 'User-friendly, fast, and purposeful websites & apps that actually help your business grow.'
    }
  ];

  const whyChooseUs = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Smart Working Process',
      description: 'We study your business deeply before crafting any strategy. Plan → Execute → Measure → Improve → Repeat. Simple, effective, proven.'
    },
    {
      icon: <Users size={24} />,
      title: 'Dedicated Growth Team',
      description: 'Your project gets its own team — focused on maximizing conversions, ROAS, and overall brand performance.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Always-On Support',
      description: 'Need help? Updates? Changes? We stay connected so your business never stops moving.'
    },
    {
      icon: <BarChart size={24} />,
      title: 'Transparent Reporting',
      description: 'Every result is clear, trackable, and measurable.'
    }
  ];

  const benefits = [
    {
      icon: <Lightbulb size={24} />,
      title: 'Clear Strategy, Zero Confusion',
      description: "We keep things simple — you always know what we're doing, why we're doing it, and how it impacts your business."
    },
    {
      icon: <Users size={24} />,
      title: 'Dedicated Team for Your Brand',
      description: 'A focused team works on your project, ensuring consistency, attention to detail, and faster execution.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Performance-Driven Approach',
      description: 'Every decision is backed by data and insights, helping you achieve better ROI and long-term digital growth.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Always Available Support',
      description: 'Quick responses, smooth communication, and proactive updates — we ensure your marketing never slows down.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden pt-24 pb-16">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 leading-[1.15] tracking-tight">
              ABOUT US – <span className="text-orange-500">Digital Buddiess</span>
            </h1>
            <p className="font-subheading font-semibold text-base sm:text-lg text-orange-500 mt-3 leading-[1.35]">
              We Build Digital Growth With Clarity & Creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-4 font-paragraph text-xs sm:text-sm text-gray-300 leading-[1.6]"
          >
            <p>
              At <span className="font-bold text-orange-600">Digital Buddiess</span>, we believe every brand has a story worth telling — it just needs the right digital push to be heard.
            </p>
            <p>
              We are a growing digital marketing agency based in <span className="font-semibold text-white">Pune and Nagpur</span>, helping businesses build their online presence with strategies that are practical, creative, and result-driven. Whether you're a startup finding your voice or an established brand looking to scale, we act as your extended digital team — your "Buddies" in the digital world.
            </p>
            <div className="bg-gray-900 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
              <p className="font-subheading font-semibold text-white mb-2">Our approach is simple:</p>
              <p className="font-paragraph text-gray-300">
                <span className="font-subheading font-bold text-orange-500">Understand</span> → <span className="font-subheading font-bold text-orange-500">Strategize</span> → <span className="font-subheading font-bold text-orange-500">Create</span> → <span className="font-subheading font-bold text-orange-500">Optimize</span> → <span className="font-subheading font-bold text-orange-500">Grow</span>
              </p>
              <p className="text-gray-400 mt-2 text-sm font-paragraph">
                No jargon. No over-promising. Just honest work, clear communication, and measurable results.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-white leading-[1.15] tracking-tight">What We Do</h2>
            <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-[1.6]">
              We help businesses grow with a mix of creative thinking and smart performance marketing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-orange-500 mb-4">{service.icon}</div>
                <h3 className="font-subheading font-semibold text-base sm:text-lg text-white mb-2 leading-[1.35]">{service.title}</h3>
                <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6]">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Ideas Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-orange-500 font-subheading font-bold uppercase tracking-widest text-xs mb-4 block">WHAT WE DO</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-white leading-[1.15] tracking-tight">
              FRESH IDEAS FOR EVERY BUSINESS
            </h2>
            <p className="font-subheading font-semibold text-base sm:text-lg text-orange-500 leading-[1.35]">
              Creative Solutions That Put Your Brand Ahead.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ideas That Stand Out',
                description: "We turn your brand's goals into fresh, meaningful digital concepts that grab attention and spark engagement."
              },
              {
                title: 'Growth With Intent',
                description: 'Every campaign we build has one aim — to move your business forward with strategies that make an immediate and long-term impact.'
              },
              {
                title: 'Smart Digital Upgrades',
                description: 'We refine your online presence piece by piece — visuals, messaging, ads, website — to help your brand perform better everywhere.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="font-subheading font-semibold text-base sm:text-lg mb-2 text-orange-500 leading-[1.35]">{item.title}</h3>
                <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Digital Buddiess Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-white leading-[1.15] tracking-tight">WHY CHOOSE DIGITAL BUDDIESS</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-2xl border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-orange-500 flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-subheading font-semibold text-base sm:text-lg text-white mb-1.5 leading-[1.35]">{item.title}</h3>
                    <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Second Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-white leading-[1.15] tracking-tight">WHY CHOOSE US</h2>
            <p className="font-subheading font-semibold text-base sm:text-lg text-orange-500 leading-[1.35]">
              Smart Execution. Creative Thinking. Reliable Growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-2xl border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-orange-500 flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-subheading font-semibold text-base sm:text-lg mb-1.5 text-white leading-[1.35]">{item.title}</h3>
                    <p className="font-paragraph font-normal text-xs sm:text-sm text-gray-300 leading-[1.6]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
