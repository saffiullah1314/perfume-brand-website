import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FiInstagram,
  FiMessageCircle,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    instagram: "https://www.instagram.com/roohrafragrances",
    whatsapp: "https://wa.me/923301818591",
    tiktok: "https://www.tiktok.com/@roohrafragrances",
  };

  return (
    <footer className="bg-grey text-white pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-white/5 font-body">
      <div className="container-custom max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Section 1: Brand & Tagline */}
          <div className="space-y-6">
            <img
              src={logo}
              alt="Roohra Logo"
              className="h-12 w-auto brightness-110"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs italic">
              "Crafting fragrances that speak to the soul. Experience the
              essence of timeless elegance in every drop."
            </p>
            <div className="flex gap-4">
              <SocialIcon href={socialLinks.instagram} icon={<FiInstagram />} />
              <SocialIcon
                href={socialLinks.whatsapp}
                icon={<FiMessageCircle />}
              />
              <SocialIcon href={socialLinks.tiktok} icon={<FaTiktok />} />
            </div>
          </div>

          {/* Section 2: Quick Navigation */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-6 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <FooterLink to="/">Home</FooterLink>
              </li>

              {/* UPDATED LINK: Point to the ID we created in Step 1 */}
              <li>
                <a
                  href="#about-section"
                  className="hover:text-gold transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  About Us
                </a>
              </li>

              <li>
                <FooterLink to="/shop">Shop Collection</FooterLink>
              </li>
              <li>
                <FooterLink to="/custom-perfume">Custom Perfume</FooterLink>
              </li>
            </ul>
          </div>

          {/* Section 3: Customer Care */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-6 uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <FooterLink to="/faq">FAQs</FooterLink>
              </li>
              <li>
                <FooterLink to="/delivery">Delivery Info</FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms & Conditions</FooterLink>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h4 className="font-serif text-gold text-lg mb-6 uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold mt-1 shrink-0" />
                <span>Taxila, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-gold shrink-0" />
                <span>+92 330 1818591</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-gold shrink-0" />
                <span>roohrafragrance@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Dynamic Date */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
          <p>© {currentYear} ROOHRA FRAGRANCES. ALL RIGHTS RESERVED.</p>
          <p>Created on: {new Date().toLocaleDateString("en-GB")}</p>
        </div>
      </div>
    </footer>
  );
}

// Reusable Footer Link Component
function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="hover:text-gold transition-colors duration-300 flex items-center gap-2"
    >
      {children}
    </Link>
  );
}

// Reusable Social Icon Component
function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
    >
      {icon}
    </a>
  );
}

export default Footer;
