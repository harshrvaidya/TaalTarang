// import React from "react";

// import MySlider from "../Components/MySlider";
// import NavForLanding from "../Components/NavForLanding";
// import Footer from "../Components/Footer";
// const LandingPage = () => {
//   return (
//     <div>
//       <NavForLanding />
//   <MySlider></MySlider>
//   <Footer/>
//     </div>
//   );
// };

// export default LandingPage;


import React from "react";
import MySlider from "../Components/MySlider";
import NavForLanding from "../Components/NavForLanding";
import Footer from "../Components/Footer";
import { motion } from "framer-motion"; // For scroll animations
import tablaImage from "../Pictures/logo.png"; // Replace with the actual path to your tabla image



const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <NavForLanding />
      <MySlider />

      {/* Why TaalTaraang Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between bg-orange-50 py-16 px-8 md:px-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={tablaImage}
            alt="Tabla"
            className="rounded-lg shadow-lg w-3/4 md:w-full"
          />
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12">
          <h2 className="text-4xl font-bold text-orange-700 mb-4">
            Why TaalTaraang?
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            TaalTaraang is your gateway to the mesmerizing world of Indian
            classical music. Whether you're a beginner or a seasoned artist, we
            provide the perfect platform to explore, learn, and master the art
            of rhythm. Our mission is to preserve and promote the rich heritage
            of Indian music through innovation and passion.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <a href="#learn" className="text-orange-600 hover:underline">
                Learn from the best maestros
              </a>
            </li>
            <li>
              <a href="#shop" className="text-orange-600 hover:underline">
                Shop premium-quality instruments
              </a>
            </li>
            <li>
              <a href="#community" className="text-orange-600 hover:underline">
                Join a vibrant community of music lovers
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LandingPage;