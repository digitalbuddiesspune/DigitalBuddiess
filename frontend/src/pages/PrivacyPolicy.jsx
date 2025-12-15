import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck, Users, Globe } from 'lucide-react';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const policySections = [
    {
      icon: <Shield size={24} />,
      title: 'Information Collection',
      description: 'We collect information that you provide directly to us, including when you contact us, request services, or interact with our website.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Information Protection',
      description: 'We use industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse.'
    },
    {
      icon: <Users size={24} />,
      title: 'Information Sharing',
      description: 'We do not sell, trade, or rent your personal information to third parties. We may share information only with your consent or as required by law.'
    },
    {
      icon: <Globe size={24} />,
      title: 'Cookies & Tracking',
      description: 'We use cookies and similar technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden pt-24 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              PRIVACY <span className="text-orange-500">POLICY</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-orange-500 mt-6">
              Protecting Your Personal Information
            </p>
            <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="bg-gray-900 border-l-4 border-orange-500 p-8 rounded-r-lg">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Commitment to Privacy</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                <span className="font-bold text-orange-500">Digital Buddies</span> ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Privacy Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {policySections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all duration-300"
                  >
                    <div className="text-orange-500 mb-4">{section.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{section.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Types of Information We Collect</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Name, email address, phone number, and postal address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Company name, job title, and business information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Payment information (processed securely through third-party payment processors)</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-4 mt-6">Automatically Collected Information</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>IP address, browser type, and device information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Pages visited, time spent on pages, and click patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Referring website addresses and search terms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">How We Use Your Information</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Providing, maintaining, and improving our digital marketing services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Processing transactions and sending related information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Sending administrative information, updates, and marketing communications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Responding to your comments, questions, and requests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Monitoring and analyzing trends, usage, and activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Detecting, preventing, and addressing technical issues and security threats</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Information Sharing and Disclosure</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Service Providers:</strong> With trusted third-party service providers who assist us in operating our business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">With Your Consent:</strong> For any other purpose disclosed to you with your consent</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Cookies and Tracking Technologies</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use cookies, web beacons, and similar tracking technologies to collect and store information about your preferences and browsing activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Data Retention</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Changes to This Privacy Policy</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">Email:</strong> info@digitalbuddiess.in</p>
                  <p><strong className="text-white">Phone:</strong> +919637319746, +919766670916</p>
                  <p><strong className="text-white">Address:</strong> 618, Gera's Imperum Rise, Wipro Circle, Hinjewadi, Pune – 411057</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;

