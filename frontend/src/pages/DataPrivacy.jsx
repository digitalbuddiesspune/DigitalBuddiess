import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

function DataPrivacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const privacyPoints = [
    {
      icon: <Shield size={24} />,
      title: 'Data Collection',
      description: 'We collect only the necessary information required to provide our digital marketing services, including contact details, business information, and project requirements.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Data Security',
      description: 'All data is stored securely using industry-standard encryption and security measures. We never share your information with third parties without your explicit consent.'
    },
    {
      icon: <Eye size={24} />,
      title: 'Data Usage',
      description: 'Your data is used solely for the purpose of delivering our services, communicating with you about your projects, and improving our service quality.'
    },
    {
      icon: <FileCheck size={24} />,
      title: 'Your Rights',
      description: 'You have the right to access, update, or delete your personal information at any time. Contact us to exercise these rights.'
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
              DATA <span className="text-orange-500">PRIVACY</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-orange-500 mt-6">
              Your Privacy Matters to Us
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
              <h2 className="text-3xl font-bold mb-4 text-white">Introduction</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                At <span className="font-bold text-orange-500">Digital Buddies</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Data Privacy Policy explains how we collect, use, store, and protect your data when you interact with our services.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Key Privacy Principles</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {privacyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-orange-500 transition-all duration-300"
                  >
                    <div className="text-orange-500 mb-4">{point.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Information We Collect</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and mailing address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Business Information:</strong> Company name, industry, and business requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Project Details:</strong> Information related to your digital marketing projects and campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Website Usage Data:</strong> Cookies, IP address, browser type, and pages visited (for analytics purposes)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">How We Use Your Information</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>To provide and improve our digital marketing services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>To communicate with you about your projects and inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>To send you marketing communications (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>To analyze website usage and improve user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>To comply with legal obligations and protect our rights</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Data Security</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Encryption of sensitive data in transit and at rest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Regular security assessments and updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Limited access to personal information on a need-to-know basis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Secure data storage and backup systems</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Your Rights</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Deletion:</strong> Request deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Objection:</strong> Object to processing of your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Withdrawal:</strong> Withdraw consent for data processing at any time</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Data Privacy Policy or our data practices, please contact us:
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

export default DataPrivacy;

