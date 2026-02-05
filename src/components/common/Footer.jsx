const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            ♻ WasteManage
          </h2>
          <p className="text-sm">
            Smart waste management system for clean and sustainable cities.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Dashboard</li>
            <li>Add Waste</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Contact
          </h3>
          <p className="text-sm">Email: support@waste.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 border-t border-gray-700 py-4">
        © 2026 Waste Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
