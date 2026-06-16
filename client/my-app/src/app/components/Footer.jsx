import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Refurnished
          </h2>
          <p className="text-sm leading-6">
            Buy premium refurbished laptops and computers with warranty,
            quality assurance, and affordable pricing.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Categories
          </h3>

          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white">Refurbished Laptops</a></li>
            <li><a href="#" className="hover:text-white">Desktop PCs</a></li>
            <li><a href="#" className="hover:text-white">Gaming Laptops</a></li>
            <li><a href="#" className="hover:text-white">Accessories</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Support
          </h3>

          <ul className="space-y-3">
            <li>Email: support@refurnished.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mon - Sat : 9 AM - 7 PM</li>
            <li>
              <button className="mt-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white">
                Get Support
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-400">
            © 2026 Refurnished. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}