import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'

function Service() {
  const location = useLocation()
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (location.state?.selectedService !== undefined && location.state?.selectedService !== null) {
      const idx = location.state.selectedService
      setOpenIndex(idx)
      setTimeout(() => {
        const el = document.getElementById(`service-item-${idx}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 200)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [location.state])

  const services = [
    {
      title: 'Digital Marketing Services',
      subtitle: 'Grow your brand, reach the right audience, and generate measurable business results.',
      description: 'Grow your brand, reach the right audience, and generate measurable business results with our end-to-end digital marketing solutions. We combine strategy, creative content, performance marketing, and data-driven optimization to build a strong online presence and maximize your ROI.',
      whyChooseUs: [
        'Data-driven marketing strategies',
        'Targeted audience campaigns',
        'Creative and performance-focused approach',
        'Lead generation and conversion optimization',
        'Transparent campaign reporting',
        'Continuous optimization for better ROI',
        'Customized strategies for every business'
      ],
      closingTagline: 'Turn digital traffic into real business growth with a marketing strategy built around your goals.',
      subServices: [
        {
          title: 'Social Media Marketing',
          description: 'Build your brand presence across Instagram, Facebook, LinkedIn, and other social platforms with engaging content, campaigns, and audience strategies.'
        },
        {
          title: 'Performance Marketing',
          description: 'Run highly targeted advertising campaigns designed to generate leads, sales, app installs, and conversions while optimizing your advertising budget.'
        },
        {
          title: 'Meta & Google Ads',
          description: 'Create, manage, and optimize Facebook, Instagram, and Google advertising campaigns with continuous performance monitoring and audience optimization.'
        },
        {
          title: 'Search Engine Optimization (SEO)',
          description: "Improve your website's visibility on search engines through keyword research, on-page optimization, technical SEO, content strategy, and authority building."
        },
        {
          title: 'Content Marketing',
          description: 'Develop valuable and engaging content that attracts your target audience, builds trust, and supports long-term organic growth.'
        },
        {
          title: 'Creative & Ad Design',
          description: 'Design high-quality social media posts, banners, promotional creatives, ad visuals, reels, and campaign assets that communicate your brand effectively.'
        },
        {
          title: 'Lead Generation',
          description: 'Build targeted lead-generation campaigns to attract potential customers and connect leads directly with your sales or CRM system.'
        },
        {
          title: 'Website & Landing Page Optimization',
          description: 'Create conversion-focused landing pages and optimize existing websites to improve user experience, engagement, and conversion rates.'
        },
        {
          title: 'Influencer & Campaign Marketing',
          description: 'Collaborate with relevant influencers and creators to increase brand awareness, engagement, and product visibility.'
        },
        {
          title: 'Analytics & Reporting',
          description: 'Track campaign performance, leads, conversions, engagement, and ROI through detailed analytics and actionable performance reports.'
        }
      ]
    },
    {
      title: 'Web & App Development',
      subtitle: 'Build digital experiences that work.',
      description: 'From sleek websites to powerful mobile apps, we craft digital solutions that your users will love. We combine cutting-edge technology with intuitive design to create experiences that drive engagement and deliver results.',
      subServices: [
        {
          title: 'Custom Web Development',
          description: 'Build scalable web applications tailored to your business needs'
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile apps for iOS and Android'
        },
        {
          title: 'E-commerce Solutions',
          description: 'Complete online store solutions with payment integration'
        },
        {
          title: 'Progressive Web Apps',
          description: 'Fast, reliable web apps that work like native applications'
        },
        {
          title: 'API Development',
          description: 'Robust APIs for seamless system integration'
        },
        {
          title: 'Maintenance & Support',
          description: 'Ongoing updates, security patches, and technical support'
        }
      ]
    },
    {
      title: 'Advertising Services',
      subtitle: 'Turn clicks into customers.',
      description: 'Strategic advertising that reaches the right people at the right time. We manage campaigns across platforms, optimize for performance, and ensure every ad dollar works harder for your business.',
      subServices: [
        {
          title: 'Google Ads Management',
          description: 'Strategic Google Ads campaigns to maximize your ad spend'
        },
        {
          title: 'Facebook & Instagram Ads',
          description: 'Targeted social media advertising campaigns'
        },
        {
          title: 'Display Advertising',
          description: 'Banner and display ads across premium publisher networks'
        },
        {
          title: 'Video Advertising',
          description: 'Engaging video ads for YouTube and other platforms'
        },
        {
          title: 'Retargeting Campaigns',
          description: 'Re-engage visitors who didn\'t convert initially'
        },
        {
          title: 'Ad Creative Design',
          description: 'Eye-catching ad designs that drive clicks and conversions'
        }
      ]
    },
    {
      title: 'Branding Services',
      subtitle: 'Make your mark memorable.',
      description: 'Your brand is more than a logo—it\'s the story you tell and the connection you build. We help you craft a brand identity that resonates, stands out, and creates lasting impressions.',
      subServices: [
        {
          title: 'Logo Design',
          description: 'Memorable logos that represent your brand identity'
        },
        {
          title: 'Brand Identity',
          description: 'Complete brand guidelines and visual identity systems'
        },
        {
          title: 'Brand Strategy',
          description: 'Develop a cohesive brand strategy that resonates with your audience'
        },
        {
          title: 'Packaging Design',
          description: 'Attractive packaging that stands out on shelves'
        },
        {
          title: 'Brand Guidelines',
          description: 'Comprehensive brand style guides for consistent application'
        },
        {
          title: 'Rebranding',
          description: 'Transform your brand image with strategic rebranding'
        }
      ]
    },
    {
      title: 'Ecommerce Marketing',
      subtitle: 'Sell more, sell smarter.',
      description: 'Transform your online store into a sales powerhouse. We optimize every touchpoint—from product listings to checkout—to turn browsers into buyers and maximize your revenue.',
      subServices: [
        {
          title: 'Product Listing Optimization',
          description: 'Optimize product pages for better visibility and conversions'
        },
        {
          title: 'Shopping Ads',
          description: 'Google Shopping campaigns to showcase your products'
        },
        {
          title: 'Marketplace Management',
          description: 'Manage your presence on Amazon, eBay, and other marketplaces'
        },
        {
          title: 'Conversion Rate Optimization',
          description: 'Improve your checkout process and reduce cart abandonment'
        },
        {
          title: 'Inventory Marketing',
          description: 'Promote slow-moving inventory with targeted campaigns'
        },
        {
          title: 'Customer Retention',
          description: 'Build loyalty programs and repeat purchase strategies'
        }
      ]
    },
    {
      title: 'Lead Generation',
      subtitle: 'Fill your pipeline with quality leads.',
      description: 'Stop chasing leads and start attracting them. We create systems that capture, nurture, and convert prospects into customers, building a steady stream of qualified opportunities for your business.',
      subServices: [
        {
          title: 'Lead Magnets',
          description: 'Create valuable content offers to capture leads'
        },
        {
          title: 'Landing Page Optimization',
          description: 'High-converting landing pages that turn visitors into leads'
        },
        {
          title: 'Form Optimization',
          description: 'Streamline forms to maximize lead capture'
        },
        {
          title: 'Lead Nurturing',
          description: 'Automated email sequences to nurture leads'
        },
        {
          title: 'Lead Qualification',
          description: 'Identify and prioritize high-quality leads'
        },
        {
          title: 'CRM Integration',
          description: 'Seamlessly integrate leads into your CRM system'
        }
      ]
    },
    {
      title: 'Creative Services',
      subtitle: 'Words, visuals, and videos that speak human.',
      description: 'Great design tells a story. Whether it\'s a stunning visual, compelling copy, or engaging video, we create content that captures attention, communicates clearly, and drives action.',
      subServices: [
        {
          title: 'Graphic Design',
          description: 'Professional designs for print and digital media'
        },
        {
          title: 'UI/UX Design',
          description: 'Intuitive user interfaces that enhance user experience'
        },
        {
          title: 'Video Production',
          description: 'Professional video content for marketing and branding'
        },
        {
          title: 'Photography',
          description: 'High-quality product and lifestyle photography'
        },
        {
          title: 'Animation & Motion Graphics',
          description: 'Engaging animations that bring your brand to life'
        },
        {
          title: 'Illustration',
          description: 'Custom illustrations that tell your brand story'
        }
      ]
    },
    {
      title: 'Additional Services',
      subtitle: 'Everything else you need to succeed.',
      description: 'Beyond the basics, we offer comprehensive support services—from cloud infrastructure to cybersecurity—ensuring your digital foundation is solid, secure, and scalable.',
      subServices: [
        {
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and migration services'
        },
        {
          title: 'IT Consulting',
          description: 'Expert advice for digital transformation initiatives'
        },
        {
          title: 'Data Analytics',
          description: 'Transform data into actionable business insights'
        },
        {
          title: 'Cybersecurity',
          description: 'Protect your digital assets with comprehensive security solutions'
        },
        {
          title: 'Training & Workshops',
          description: 'Empower your team with digital skills training'
        },
        {
          title: 'Project Management',
          description: 'Ensure timely delivery with professional project management'
        }
      ]
    }
  ]

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white py-12 sm:py-16 relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 px-4 leading-[1.15] tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-white">Our</span> <span className="text-orange-500">Services</span>
            </motion.h1>
            <motion.p 
              className="font-paragraph text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto px-4 leading-[1.6]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We offer a comprehensive range of digital services to help your business succeed
            </motion.p>
          </motion.div>

        {/* Accordion */}
        <div className="space-y-4 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              id={`service-item-${index}`}
              className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-orange-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                whileHover={{ backgroundColor: "rgba(17, 24, 39, 1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-1 pr-2 sm:pr-4">
                  <motion.h3 
                    className="font-subheading font-semibold text-base sm:text-lg text-white mb-1 leading-[1.35]"
                    initial={false}
                    animate={{ color: openIndex === index ? "#f97316" : "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="font-paragraph text-xs sm:text-sm text-gray-400">{service.subtitle}</p>
                </div>
                <motion.div 
                  className="shrink-0"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {openIndex === index ? (
                    <motion.svg
                      className="w-8 h-8 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={false}
                      animate={{ rotate: 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={false}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </motion.svg>
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-4 border-t border-gray-800">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <ServiceDetail 
                          serviceTitle={service.title} 
                          description={service.description}
                          subServices={service.subServices}
                          whyChooseUs={service.whyChooseUs}
                          closingTagline={service.closingTagline}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 bg-gray-900 rounded-lg p-12 text-center border border-gray-800 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-3 px-4 leading-[1.15] tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="font-paragraph text-xs sm:text-sm text-gray-300 mb-5 sm:mb-6 px-4 leading-[1.6]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Let's discuss how we can help transform your business
          </motion.p>
          <motion.button 
            onClick={() => {
              navigate('/contact-us')
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-subheading font-bold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Contact Us Today
          </motion.button>
        </motion.div>
        </div>
      </div>
    </>
  )
}

export default Service