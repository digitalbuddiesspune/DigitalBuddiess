import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
          {/* About */}
          <div className="">
            <img
              src="https://res.cloudinary.com/dfhjtmvrz/image/upload/v1764914021/digital_buddiess_logo2_pfpmnw.png"
              alt="Digital Buddies Digital Marketing Agency Logo"
              className="h-16 w-auto mb-6"
            />

            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2">
              About Our Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500" />
            </h3>

            <p className="text-gray-300 leading-relaxed text-sm">
              Our sole purpose as a digital marketing agency is to elevate your
              brand beyond the reach of your competitors. You bring the
              vision—Digital Buddies turns it into a powerful and outstanding
              market presence.
            </p>
          </div>

          {/* Explore */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2 inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500" />
            </h3>

            <ul className="space-y-3 mt-6">
              {[
                { name: "Home", path: "/" },
                { name: "Service", path: "/service" },
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `text-sm transition-colors ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-300 hover:text-orange-500"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2 inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500" />
            </h3>

            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1" size={18} />
                <p className="text-gray-300 text-sm">
                  618, Gera's Imperum Rise, Wipro Circle, Hinjewadi, Pune – 411057
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-orange-500 mt-1" size={18} />
                <a
                  href="mailto:info@digitalbuddiess.in"
                  className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                >
                  info@digitalbuddiess.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <p className="text-sm">
              <span className="text-orange-500 font-semibold">
                Have Any Project?
              </span>{" "}
              Let’s Talk & Grow your Business
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                "+919637319746",
                "+919766670916",
              ].map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <Phone className="text-orange-500" size={18} />
                  <a
                    href={`tel:${phone}`}
                    aria-label={`Call Digital Buddies at ${phone}`}
                    className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                  >
                    {phone.replace("+91", "+91 ")}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Legal + Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-8 gap-4">
            <ul className="flex flex-wrap gap-4">
              {[
                { name: "Data Privacy", path: "/data-privacy" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
              ].map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Digital Buddies All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
