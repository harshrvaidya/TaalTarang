import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#FAD2A3] to-[#FDCB9E] shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-[#78350F]">
          TaalTaraang
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#78350F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <ul
          className={`lg:flex gap-6 text-[#8B4513] font-medium absolute lg:static top-16 left-0 w-full bg-[#FDCB9E] lg:bg-transparent lg:w-auto p-4 lg:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <li>
            <Link to="/shops" className="hover:text-[#5A2D0C]">Shops</Link>
          </li>
          <li>
            <Link to="/marketplace" className="hover:text-[#5A2D0C]">Marketplace</Link>
          </li>
          <li>
            <Link to="/ml-beat-classifier" className="hover:text-[#5A2D0C]">
              ML Beat Classifier
            </Link>
          </li>
          <li>
            <Link to="/landingpage" className="hover:text-[#5A2D0C]">Landing Page</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-[#5A2D0C]">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
