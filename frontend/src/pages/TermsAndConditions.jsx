import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const termsSections = [
    {
      icon: <FileText size={24} />,
      title: 'Service Agreement',
      description: 'By using our services, you agree to these terms and conditions. We provide digital marketing services as outlined in your project agreement.'
    },
    {
      icon: <Scale size={24} />,
      title: 'Payment Terms',
      description: 'Payment terms are specified in your service agreement. All fees are due as per the agreed schedule. Late payments may result in service suspension.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Intellectual Property',
      description: 'All content, designs, and materials created by Digital Buddies remain our property until full payment is received, after which ownership transfers as specified in your agreement.'
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Limitation of Liability',
      description: 'We strive to deliver excellent results, but we cannot guarantee specific outcomes. Our liability is limited to the amount paid for services.'
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
              TERMS & <span className="text-orange-500">CONDITIONS</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-orange-500 mt-6">
              Legal Agreement for Our Services
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
              <h2 className="text-3xl font-bold mb-4 text-white">Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                By accessing or using the services provided by <span className="font-bold text-orange-500">Digital Buddies</span> ("we," "our," or "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Key Terms</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {termsSections.map((section, index) => (
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
              <h2 className="text-3xl font-bold text-white mb-6">Services Description</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Digital Buddies provides digital marketing services including but not limited to:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Search Engine Optimization (SEO) and Search Engine Marketing (SEM)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Social Media Marketing and Management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Content Creation and Marketing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Web Design and Development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Branding and Graphic Design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Digital Advertising and Campaign Management</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Payment Terms</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Payment Schedule:</strong> Payment terms will be specified in your service agreement or proposal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Late Payments:</strong> Late payments may result in service suspension or termination. A late fee may apply as specified in your agreement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Refunds:</strong> Refund policies are outlined in your specific service agreement. Generally, work completed is non-refundable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Price Changes:</strong> We reserve the right to modify our pricing. Existing agreements will be honored at the agreed-upon rate</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Client Responsibilities</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  To ensure successful project delivery, clients agree to:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Provide accurate and complete information necessary for project execution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Respond to requests for feedback, approvals, or information in a timely manner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Make payments according to the agreed schedule</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                    <span>Comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <span>Not use our services for any illegal or unauthorized purpose</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Intellectual Property Rights</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Ownership:</strong> All work created by Digital Buddies remains our property until full payment is received</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Transfer:</strong> Upon full payment, ownership of final deliverables transfers to the client as specified in the service agreement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Portfolio Use:</strong> We retain the right to use completed work in our portfolio and marketing materials unless otherwise agreed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span><strong className="text-white">Third-Party Content:</strong> Clients are responsible for ensuring they have rights to any content, images, or materials they provide</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Limitation of Liability</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Digital Buddies shall not be liable for any indirect, incidental, special, or consequential damages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Our total liability shall not exceed the amount paid by the client for the specific service in question</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>We do not guarantee specific results or outcomes from our marketing services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Clients are responsible for the accuracy of information provided to us</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Termination</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Either party may terminate services:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>With written notice as specified in your service agreement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Immediately in case of breach of these terms or non-payment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Upon termination, all outstanding payments become immediately due</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Governing Law</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Changes to Terms</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsAndConditions;

