import React from "react";

const NavForLanding = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-orange-300 text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/33/33917.png"
          alt="Logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-2xl font-bold">TaalTaraang</span>
      </div>

      {/* Welcome Message */}
      <div className="text-lg font-semibold">
        <span>welcome Harsh!</span>
      </div>

      {/* Profile Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 shadow-md">
        <span className="text-xl font-bold">H</span>
      </div>
    </nav>
  );
};

export default NavForLanding;
